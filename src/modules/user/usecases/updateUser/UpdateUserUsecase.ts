import { Usecase } from '@/core/domain/Usecase';
import { GenericAppError } from '@/core/logic/AppError';
import { Either, Result, left, right } from '@/core/logic/Result';

import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { UserPassword } from '../../domain/UserPassword';
import { UserDTO } from '../../dto/UserDTO';
import UserMap from '../../mappers/UserMap';
import { UserRepository } from '../../repositories/UserRepository';
import { UpdateUserErrors } from './UpdateUserErrors';
import { UpdateUserRequestDTO } from './UpdateUserRequestDTO';

type UpdateUserUsecaseResponse = Either<
  GenericAppError.UnexpectedError | GenericAppError.InvalidRequestError | UpdateUserErrors.UserNotFoundError,
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
      const passwordOrError = UserPassword.create({
        value: body.password,
        hashed: false,
      });

      const dtoResult = Result.combine([emailOrError, passwordOrError]);
      if (dtoResult.isFailure) {
        return left(new GenericAppError.InvalidRequestError(dtoResult.errorValue()));
      }

      const user = await this.repository.findUserById(id);
      if (!user) {
        return left(new UpdateUserErrors.UserNotFoundError());
      }

      const userPrevPassword = UserPassword.create({
        value: user.password.value,
        hashed: true,
      });

      const userPrevOrError = User.create(
        {
          email: user.email,
          password: userPrevPassword.getValue(),
        },
        user.id,
      );

      if (userPrevOrError.isFailure) {
        return left(Result.fail<void>(userPrevOrError.errorValue())) as UpdateUserUsecaseResponse;
      }

      const updatedUserValues = userPrevOrError.getValue();
      updatedUserValues.updateEmail(emailOrError.getValue());
      updatedUserValues.updatePassword(passwordOrError.getValue());

      const updatedUser = await this.repository.updateUser(id, updatedUserValues);

      return right(Result.ok<UserDTO>(UserMap.toDTO(updatedUser)));
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error, error?.message, 500));
    }
  }
}
