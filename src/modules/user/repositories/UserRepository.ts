import { ParsedQueryParams } from '@/interfaces/request.interface';
import { User } from '../interfaces/UserInterface';
import { UserEntity } from '../infra/typeorm/UserEntity';
import { CreateUserDto, UpdateUserDto } from '../dto/UserDTO';

export abstract class UserRepository {
  public abstract findAllUser(params?: ParsedQueryParams): Promise<User[]>;
  public abstract findUserById(id: number): Promise<User>;
  public abstract findUserByEmail(email: string): Promise<User>;
  public abstract createUser(data: CreateUserDto): Promise<User>;
  public abstract updateUser(id: number, data: UpdateUserDto): Promise<User>;
  public abstract deleteUser(id: number): Promise<User>;
  public abstract countUser(): Promise<number>;
}

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly entity: typeof UserEntity) {}

  public countUser(): Promise<number> {
    return this.entity.count();
  }

  public findUserByEmail(email: string): Promise<User> {
    return this.entity.findOne({
      where: { email },
    });
  }

  public async findAllUser(params?: ParsedQueryParams): Promise<User[]> {
    return await this.entity.find(params);
  }

  public async findUserById(id: number): Promise<User> {
    return await this.entity.findOne({
      where: { id },
    });
  }

  public async createUser(data: CreateUserDto): Promise<User> {
    return await this.entity
      .create({
        ...data,
      })
      .save();
  }

  public async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    return await this.entity.update(id, data).then(() => this.findUserById(id));
  }

  public async deleteUser(id: number): Promise<User> {
    return await this.entity.delete(id).then(() => this.findUserById(id));
  }
}
