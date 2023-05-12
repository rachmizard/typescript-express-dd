import { Usecase } from '@/core/domain/Usecase';
import { GenericAppError } from '@/core/logic/AppError';
import { Result, left, right } from '@/core/logic/Result';

import { CreateUserDto } from '../../dto/UserDTO';
import { UserRepository } from '../../repositories/UserRepository';
import { CreateUserErrors } from './CreateUserErrors';
import { CreateUserResponse } from './CreateUserResponse';

export class CreateUserUsecase implements Usecase<CreateUserDto, CreateUserResponse> {
  constructor(private readonly repository: UserRepository) {}

  async execute(data: CreateUserDto): Promise<CreateUserResponse> {
    try {
      const isExists = await this.repository.findUserByEmail(data.email);

      if (isExists) {
        return left(new CreateUserErrors.EmailAlreadyExistsError(data.email));
      }

      await this.repository.createUser(data);

      return right(Result.ok<void>());
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error));
    }
  }
}
