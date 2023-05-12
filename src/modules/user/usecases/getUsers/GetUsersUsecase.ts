import { Usecase } from '@/core/domain/Usecase';
import { GenericAppError } from '@/core/logic/AppError';
import { Either, Result, left, right } from '@/core/logic/Result';
import { QueryParams } from '@/interfaces/request.interface';

import { UserDTO } from '../../dto/UserDTO';
import { UserMap } from '../../mappers/UserMap';
import { UserRepository } from '../../repositories/UserRepository';

type Response = Either<GenericAppError.UnexpectedError, Result<UserDTO[]>>;
export class GetUsersUsecase implements Usecase<QueryParams, Response> {
  constructor(private readonly repository: UserRepository) {}

  async execute(): Promise<Response> {
    try {
      const results = await this.repository.findAllUser();
      const data = Result.ok<UserDTO[]>(results.map(user => UserMap.toDTO(user)));

      return right(data);
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error));
    }
  }
}
