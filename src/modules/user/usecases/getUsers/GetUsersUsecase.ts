import { Usecase } from '@/core/domain/Usecase';
import { GenericAppError } from '@/core/logic/AppError';
import { Either, Result, left, right } from '@/core/logic/Result';
import { QueryParams } from '@/interfaces/request.interface';

import { UserDTO } from '../../dto/UserDTO';
import UserMap from '../../mappers/UserMap';
import { UserRepository } from '../../repositories/UserRepository';

type GetUsersUsecaseResponse = Either<GenericAppError.UnexpectedError, Result<UserDTO[]>>;
export class GetUsersUsecase implements Usecase<QueryParams, GetUsersUsecaseResponse> {
  constructor(private readonly repository: UserRepository) {}

  async execute(): Promise<GetUsersUsecaseResponse> {
    try {
      const results = await this.repository.findAllUser();

      return right(Result.ok<UserDTO[]>(results.map(user => UserMap.toDTO(user))));
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error));
    }
  }
}
