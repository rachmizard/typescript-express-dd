import { ParsedQueryParams, QueryParams } from '@/interfaces/request.interface';
import { Result } from './Result';
import { Guard } from './Guard';

export class QueryMapper {
  public static parseQueryParams(params: QueryParams) {
    const { limit = 10, page = 1, sort, order } = params || {};

    const pageOrError = Guard.againstMinNumber(1, page, `Page must be greater than ${1}`);
    const limitOrError = Guard.againstMinNumber(10, limit, `Limit must be greater than ${10}`);

    const dtoResult = Guard.combine([pageOrError, limitOrError]);

    if (dtoResult.isFailure) {
      return Result.fail<string>(dtoResult.errorValue());
    }

    const skip = Number(limit) * (Number(page) - 1);
    const take = Number(limit);
    const orderBy: Record<any, 'DESC' | 'ASC'> = {};

    if (sort && order) orderBy[sort] = order;
    else orderBy['createdAt'] = 'DESC';

    return Result.ok<ParsedQueryParams>({ skip, take, order: orderBy });
  }
}
