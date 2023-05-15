import { Usecase } from '@/core/domain/Usecase';
import { GenericAppError } from '@/core/logic/AppError';
import { Result, left, right } from '@/core/logic/Result';

import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { UserPassword } from '../../domain/UserPassword';
import { UserDTO } from '../../dto/UserDTO';
import UserMap from '../../mappers/UserMap';
import { UserRepository } from '../../repositories/UserRepository';
import { CreateUserDto } from './CreateUserDTO';
import { CreateUserErrors } from './CreateUserErrors';
import { CreateUserResponse } from './CreateUserResponse';
import { UserUsername } from '../../domain/UserUsername';

export class CreateUserUsecase implements Usecase<CreateUserDto, CreateUserResponse> {
  constructor(private readonly repository: UserRepository) {}

  async execute(payload: CreateUserDto): Promise<CreateUserResponse> {
    try {
      const emailExists = await this.repository.findUserByEmail(payload.email);
      const usernameExists = await this.repository.findUserByUsername(payload.username);

      if (usernameExists) {
        return left(new CreateUserErrors.UsernameTakenError(payload.username));
      }

      if (emailExists) {
        return left(new CreateUserErrors.EmailAlreadyExistsError(payload.email));
      }

      const emailOrError = UserEmail.create(payload.email);
      const passwordOrError = UserPassword.create({
        value: payload.password,
      });
      const usernameOrError = UserUsername.create(payload.username);

      const validate = Result.combine([emailOrError, passwordOrError, usernameOrError]);
      if (validate.isFailure) {
        return left(Result.fail<void>(validate.errorValue())) as CreateUserResponse;
      }

      const userOrError = User.create({
        email: emailOrError.getValue(),
        password: passwordOrError.getValue(),
        username: usernameOrError.getValue(),
      });

      if (userOrError.isFailure) {
        return left(Result.fail<void>(userOrError.errorValue())) as CreateUserResponse;
      }

      const user = userOrError.getValue();
      const result = await this.repository.save(user);

      const userDTO = UserMap.toDTO(result);
      return right(Result.ok<UserDTO>(userDTO));
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error));
    }
  }
}
