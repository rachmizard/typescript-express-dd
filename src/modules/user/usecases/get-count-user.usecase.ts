import { Usecase } from '@/interfaces/base-usecase';

import { UserRepository } from '../repositories/UserRepository';

export class GetCountUserUsecase implements Usecase<any, number> {
  constructor(private readonly repository: UserRepository) {}

  async execute() {
    return await this.repository.countUser();
  }
}
