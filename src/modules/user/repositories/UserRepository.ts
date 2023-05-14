import { ParsedQueryParams } from '@/interfaces/request.interface';
import { User } from '../domain/User';

export abstract class UserRepository {
  public abstract findAllUser(params?: ParsedQueryParams): Promise<User[]>;
  public abstract findUserById(id: string): Promise<User>;
  public abstract findUserByEmail(email: string): Promise<User>;
  public abstract createUser(data: User): Promise<User>;
  public abstract updateUser(id: string, data: User): Promise<User>;
  public abstract deleteUser(id: string): Promise<User>;
  public abstract countUser(): Promise<number>;
}
