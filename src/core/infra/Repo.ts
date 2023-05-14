import { PaginationMeta } from './PaginationMeta';

export interface Repo<T> {
  exists(t: T): Promise<boolean>;
  save(t: T): Promise<T>;
  paginationMeta(limit: number, page: number): Promise<PaginationMeta>;
}
