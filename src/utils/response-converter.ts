import { ParsedQueryParams, QueryParams } from '@/interfaces/request.interface';
import { ResponseWithMetadata } from '@/interfaces/response.interface';

interface ConvertResponseWithMetadataProps<T> {
  data: T;
  count: number;
  queryParams?: QueryParams;
}

export const convertResponseWithMetadata = <T>(props: ConvertResponseWithMetadataProps<T>): ResponseWithMetadata<T> => {
  const { count, data, queryParams } = props;

  return {
    data,
    meta: {
      limit: Number(queryParams?.limit || 10),
      count,
      currentPage: Number(queryParams?.page || 1),
      totalPage: Math.ceil(count / (queryParams?.limit || 10)),
    },
  };
};

export const convertToParsedQueryParams = (params?: QueryParams): ParsedQueryParams => {
  const { page, limit, sort } = params || { page: 1, limit: 10 };

  const parsedQueryParams: ParsedQueryParams = {
    take: Number(limit),
    skip: Number((page - 1) * limit),
    order: sort,
  };

  return parsedQueryParams;
};
