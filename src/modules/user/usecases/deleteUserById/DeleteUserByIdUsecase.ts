import { Usecase } from '@/interfaces/base-usecase';
import { UserRepository } from '../../repositories/UserRepository';
import { User } from '../../domain/User';

export class DeleteUserByIdUsecase implements Usecase<number, User> {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: number): Promise<User> {
    return await this.repository.deleteUser(id);
  }
}
