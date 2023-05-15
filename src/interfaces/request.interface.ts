import { FindOperatorType } from 'typeorm';

export interface QueryParams {
  limit: number;
  page: number;
  sort: string;
  order: 'ASC' | 'DESC';
  filter: string;
  [key: string]: any;
}

export interface ParsedQueryParams {
  take: number;
  skip: number;
  order: Record<any, 'ASC' | 'DESC'>;
}

export interface FilterRecord {
  [key: string]: FindOperatorType;
}
