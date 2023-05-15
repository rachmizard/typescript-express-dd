import { Repository } from 'typeorm';
import { PaginationMeta } from '@/core/infra/PaginationMeta';
import { ParsedQueryParams } from '@/interfaces/request.interface';

import { User } from '../../domain/User';
import { UserEntity } from '../../infra/typeorm/UserEntity';
import UserMap from '../../mappers/UserMap';
import { UserRepository } from '../UserRepository';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly entityRepo: Repository<UserEntity>) {}

  public async findUserByUsername(username: string): Promise<User> {
    const result = await this.entityRepo.findOne({
      where: { username },
    });
    return UserMap.toDomain(result);
  }

  public async exists(t: User): Promise<boolean> {
    return this.entityRepo
      .findOne({
        where: { id: t.id.toValue().toString() },
      })
      .then(result => !!result);
  }
  public async save(t: User): Promise<User> {
    const persistenceValues = await UserMap.toPersistence(t);
    return this.entityRepo.save(persistenceValues).then(result => UserMap.toDomain(result));
  }

  public async paginationMeta(limit: number, page: number): Promise<PaginationMeta> {
    const total = await this.countUser();
    return UserMap.toPaginatedDTO(total, page, limit);
  }

  public countUser(): Promise<number> {
    return this.entityRepo.count();
  }

  public async findUserByEmail(email: string): Promise<User> {
    const result = await this.entityRepo.findOne({
      where: { email },
    });

    return UserMap.toDomain(result);
  }

  public async findAllUser(params?: ParsedQueryParams): Promise<User[]> {
    const results = await this.entityRepo.find(params);

    return results.map(result => UserMap.toDomain(result));
  }

  public async findUserById(id: string): Promise<User> {
    const result = await this.entityRepo.findOne({
      where: { id },
    });

    return UserMap.toDomain(result);
  }

  public async createUser(data: User): Promise<User> {
    const persistenceValues = await UserMap.toPersistence(data);
    const result = await this.entityRepo.create(persistenceValues).save();

    return UserMap.toDomain(result);
  }

  public async updateUser(id: string, data: User): Promise<User> {
    const persistenceValues = await UserMap.toPersistence(data);
    await this.entityRepo.update(id, persistenceValues);
    return await this.findUserById(id);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.entityRepo.delete(id);
  }
}
