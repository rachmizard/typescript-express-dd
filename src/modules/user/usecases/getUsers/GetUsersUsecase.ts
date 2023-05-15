import { Usecase } from '@/core/domain/Usecase';
import { GenericAppError } from '@/core/logic/AppError';
import { QueryMapper } from '@/core/logic/QueryMapper';
import { Either, Result, left, right } from '@/core/logic/Result';
import { ParsedQueryParams, QueryParams } from '@/interfaces/request.interface';

import UserMap from '../../mappers/UserMap';
import { UserRepository } from '../../repositories/UserRepository';
import { GetUsersResponseDTO } from './GetUsersResponseDTO';

type GetUsersUsecaseResponse = Either<GenericAppError.UnexpectedError | GenericAppError.InvalidRequestError, Result<GetUsersResponseDTO>>;
export class GetUsersUsecase implements Usecase<QueryParams, GetUsersUsecaseResponse> {
  constructor(private readonly repository: UserRepository) {}

  async execute(params: QueryParams): Promise<GetUsersUsecaseResponse> {
    try {
      const parsedQuery = QueryMapper.parseQueryParams(params);

      if (parsedQuery.isFailure) {
        return left(new GenericAppError.InvalidRequestError(parsedQuery.errorValue()));
      }

      const parsedQueryResult = parsedQuery.getValue() as ParsedQueryParams;
      const results = await this.repository.findAllUser(parsedQueryResult);
      const paginationMeta = await this.repository.paginationMeta(parsedQueryResult.take, params.page);

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
