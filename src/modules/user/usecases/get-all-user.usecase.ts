import { Usecase } from '@/interfaces/base-usecase';
import { UserRepository } from '../repositories/UserRepository';
import { ParsedQueryParams } from '@/interfaces/request.interface';
import { User } from '../interfaces/UserInterface';

export class GetAllUserUsecase implements Usecase<ParsedQueryParams, User[]> {
  constructor(private readonly repository: UserRepository) {}

  async execute(params?: ParsedQueryParams) {
    return await this.repository.findAllUser(params);
  }
}
