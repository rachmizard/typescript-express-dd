import { ParsedQueryParams } from '@/interfaces/request.interface';
import { User } from '../domain/User';
import { UserEntity } from '../infra/typeorm/UserEntity';
import { UserMap } from '../mappers/UserMap';

export abstract class UserRepository {
  public abstract findAllUser(params?: ParsedQueryParams): Promise<User[]>;
  public abstract findUserById(id: number): Promise<User>;
  public abstract findUserByEmail(email: string): Promise<User>;
  public abstract createUser(data: User): Promise<User>;
  public abstract updateUser(id: number, data: User): Promise<User>;
  public abstract deleteUser(id: number): Promise<User>;
  public abstract countUser(): Promise<number>;
}

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly entity: typeof UserEntity) {}

  public countUser(): Promise<number> {
    return this.entity.count();
  }

  public async findUserByEmail(email: string): Promise<User> {
    const result = await this.entity.findOne({
      where: { email },
    });

    return UserMap.toDomain(result);
  }

  public async findAllUser(params?: ParsedQueryParams): Promise<User[]> {
    const results = await this.entity.find(params);

    return results.map(result => UserMap.toDomain(result));
  }

  public async findUserById(id: number): Promise<User> {
    const result = await this.entity.findOne({
      where: { id },
    });

    return UserMap.toDomain(result);
  }

  public async createUser(data: User): Promise<User> {
    const result = await this.entity
      .create({
        ...UserMap.toPersistence(data),
      })
      .save();

    return UserMap.toDomain(result);
  }

  public async updateUser(id: number, data: User): Promise<User> {
    return await this.entity.update(id, UserMap.toPersistence(data)).then(() => this.findUserById(id));
  }

  public async deleteUser(id: number): Promise<User> {
    return await this.entity.delete(id).then(() => this.findUserById(id));
  }
}
