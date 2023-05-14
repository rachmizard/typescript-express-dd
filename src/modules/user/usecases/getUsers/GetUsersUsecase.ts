import { Usecase } from '@/core/domain/Usecase';
import { GenericAppError } from '@/core/logic/AppError';
import { Either, Result, left, right } from '@/core/logic/Result';
import { QueryParams } from '@/interfaces/request.interface';

import UserMap from '../../mappers/UserMap';
import { UserRepository } from '../../repositories/UserRepository';
import { GetUsersResponseDTO } from './GetUsersResponseDTO';

type GetUsersUsecaseResponse = Either<GenericAppError.UnexpectedError, Result<GetUsersResponseDTO>>;
export class GetUsersUsecase implements Usecase<QueryParams, GetUsersUsecaseResponse> {
  constructor(private readonly repository: UserRepository) {}

  async execute(params: QueryParams): Promise<GetUsersUsecaseResponse> {
    try {
      const { limit = 10, page = 1 } = params || {};

      const skip = Number(limit) * (Number(page) - 1);
      const take = Number(limit);

      const results = await this.repository.findAllUser({
        skip,
        take,
      });

      const paginationMeta = await this.repository.paginationMeta(take, page);

      const responseDTO: GetUsersResponseDTO = {
        data: results.map(user => UserMap.toDTO(user)),
        meta: paginationMeta,
      };

      return right(Result.ok<GetUsersResponseDTO>(responseDTO));
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error));
    }
  }
}
