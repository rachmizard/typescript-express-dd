import { Usecase } from '@/core/domain/Usecase';
import { GenericAppError } from '@/core/logic/AppError';
import { Either, Result, left, right } from '@/core/logic/Result';

import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { UserUsername } from '../../domain/UserUsername';
import { UserDTO } from '../../dto/UserDTO';
import UserMap from '../../mappers/UserMap';
import { UserRepository } from '../../repositories/UserRepository';
import { UpdateUserErrors } from './UpdateUserErrors';
import { UpdateUserRequestDTO } from './UpdateUserRequestDTO';

type UpdateUserUsecaseResponse = Either<
  | GenericAppError.UnexpectedError
  | GenericAppError.InvalidRequestError
  | GenericAppError.ConflictError
  | UpdateUserErrors.UserNotFoundError
  | UpdateUserErrors.UsernameTakenError
  | UpdateUserErrors.IdNotProvidedError,
  Result<UserDTO>
>;

export class UpdateUserUsecase implements Usecase<any, UpdateUserUsecaseResponse> {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: string, body?: UpdateUserRequestDTO): Promise<UpdateUserUsecaseResponse> {
    try {
      if (!id) {
        return left(new UpdateUserErrors.IdNotProvidedError());
      }

      const emailOrError = UserEmail.create(body.email);
      const usernameOrError = UserUsername.create(body.username);

      const validate = Result.combine([emailOrError, usernameOrError]);
      if (validate.isFailure) {
        return left(new GenericAppError.InvalidRequestError(validate.errorValue()));
      }

      const user = await this.repository.findUserById(id);
      if (!user) {
        return left(new UpdateUserErrors.UserNotFoundError());
      }

      const userPrevOrError = User.create(
        {
          email: user.email,
          username: user.username,
        },
        user.id,
      );

      if (userPrevOrError.isFailure) {
        return left(Result.fail<void>(userPrevOrError.errorValue())) as UpdateUserUsecaseResponse;
      }

      const updatedUserValues = userPrevOrError.getValue();
      updatedUserValues.updateEmailIfNotEquals(emailOrError.getValue());
      updatedUserValues.updateUsernameIfNotEquals(usernameOrError.getValue());

      const updatedUser = await this.repository.updateUser(id, updatedUserValues);

      return right(Result.ok<UserDTO>(UserMap.toDTO(updatedUser)));
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error, error?.message, 500));
    }
  }
}
