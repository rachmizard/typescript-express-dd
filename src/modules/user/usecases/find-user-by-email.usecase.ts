import { Usecase } from '@/interfaces/base-usecase';

import { UserRepository } from '../repositories/UserRepository';
import { User } from '../interfaces/UserInterface';

export class FindUserByEmailUsecase implements Usecase<string, User> {
  constructor(private readonly repository: UserRepository) {}

  async execute(email: string) {
    return await this.repository.findUserByEmail(email);
  }
}
