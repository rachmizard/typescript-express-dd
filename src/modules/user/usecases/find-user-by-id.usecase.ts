import { Usecase } from '@/interfaces/base-usecase';

import { UserRepository } from '../repositories/UserRepository';
import { User } from '../interfaces/UserInterface';

export class FindUserByIdUsecase implements Usecase<number, User> {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: number) {
    return await this.repository.findUserById(id);
  }
}
