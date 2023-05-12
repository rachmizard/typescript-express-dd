import { Usecase } from '@/interfaces/base-usecase';
import { CreateUserDto } from '../dto/UserDTO';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../interfaces/UserInterface';

export class CreateUserUsecase implements Usecase<CreateUserDto, Promise<User>> {
  constructor(private readonly repository: UserRepository) {}

  async execute(data: CreateUserDto) {
    return await this.repository.createUser(data);
  }
}
