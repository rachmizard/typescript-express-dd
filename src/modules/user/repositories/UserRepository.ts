import { Repo } from '@/core/infra/Repo';
import { ParsedQueryParams } from '@/interfaces/request.interface';
import { User } from '../domain/User';
import { PaginationMeta } from '@/core/infra/PaginationMeta';

export abstract class UserRepository implements Repo<User> {
  public abstract exists(t: User): Promise<boolean>;
  public abstract save(t: User): Promise<User>;
  public abstract paginationMeta(limit: number, page: number): Promise<PaginationMeta>;
  public abstract findAllUser(params?: Partial<ParsedQueryParams>): Promise<User[]>;
  public abstract findUserById(id: string): Promise<User>;
  public abstract findUserByEmail(email: string): Promise<User>;
  public abstract findUserByUsername(username: string): Promise<User>;
  public abstract createUser(data: User): Promise<User>;
  public abstract updateUser(id: string, data: User): Promise<User>;
  public abstract deleteUser(id: string): Promise<void>;
  public abstract countUser(): Promise<number>;
}
