import { Usecase } from '@/core/domain/Usecase';
import { GenericAppError } from '@/core/logic/AppError';
import { Either, Result, left, right } from '@/core/logic/Result';

import { UserDTO } from '../../dto/UserDTO';
import UserMap from '../../mappers/UserMap';
import { UserRepository } from '../../repositories/UserRepository';
import { GetUserByIdErrors } from './GetUserByIdErrors';

type GetUserByIdUsecaseResponse = Either<GenericAppError.UnexpectedError | GetUserByIdErrors.UserNotFoundError, Result<UserDTO>>;

export class GetUserByIdUsecase implements Usecase<string, GetUserByIdUsecaseResponse> {
  constructor(private readonly repository: UserRepository) {}

  async execute(id?: string): Promise<GetUserByIdUsecaseResponse> {
    try {
      const user = await this.repository.findUserById(id);

      if (!user) {
        return left(new GetUserByIdErrors.UserNotFoundError(id));
      }

      return right(Result.ok<UserDTO>(UserMap.toDTO(user)));
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error, error.message, 500));
    }
  }
}
