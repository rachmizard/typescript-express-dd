export interface ResponseWithMetadata<T> {
  data: T;
  meta: {
    currentPage: number;
    count: number;
    limit: number;
    totalPage: number;
  };
}
