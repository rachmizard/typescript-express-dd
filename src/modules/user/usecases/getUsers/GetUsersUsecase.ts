import { Usecase } from '@/core/domain/Usecase';
import { QueryParams } from '@/interfaces/request.interface';
import { User } from '@/modules/user/interfaces/UserInterface';
import { UserRepository } from '@/modules/user/repositories/UserRepository';

export class GetUsersUsecase implements Usecase<QueryParams, User[]> {
  constructor(private readonly repository: UserRepository) {}

  async execute(params: QueryParams) {
    return await this.repository.findAllUser();
  }
}
