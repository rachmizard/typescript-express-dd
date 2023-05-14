import { ParsedQueryParams } from '@/interfaces/request.interface';
import { Repository } from 'typeorm';
import { User } from '../domain/User';
import { UserEntity } from '../infra/typeorm/UserEntity';
import UserMap from '../mappers/UserMap';
import { UserRepository } from './UserRepository';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly entityRepo: Repository<UserEntity>) {}

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

  public async findUserById(id: number): Promise<User> {
    const result = await this.entityRepo.findOne({
      where: { id },
    });

    return UserMap.toDomain(result);
  }

  public async createUser(data: User): Promise<User> {
    const result = await this.entityRepo.create(UserMap.toPersistence(data)).save();

    return UserMap.toDomain(result);
  }

  public async updateUser(id: number, data: User): Promise<User> {
    return await this.entityRepo.update(id, UserMap.toPersistence(data)).then(() => this.findUserById(id));
  }

  public async deleteUser(id: number): Promise<User> {
    return await this.entityRepo.delete(id).then(() => this.findUserById(id));
  }
}