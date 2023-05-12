import { Usecase } from '@/interfaces/base-usecase';
import { User } from '../../interfaces/UserInterface';
import { UserRepository } from '../../repositories/UserRepository';

export class DeleteUserByIdUsecase implements Usecase<number, User> {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: number) {
    return await this.repository.deleteUser(id);
  }
}
