import { PaginationMeta } from '@/core/infra/PaginationMeta';
import { UserDTO } from '../../dto/UserDTO';

export type GetUsersResponseDTO = {
  data: UserDTO[];
  meta: PaginationMeta;
};
