import { GenericAppError } from '@/core/logic/AppError';
import { Result, left, right } from '@/core/logic/Result';
import { Usecase } from '@/core/domain/Usecase';

import { UserRepository } from '../../repositories/UserRepository';
import { DeleteUserByIdErrors } from './DeleteUserByIdErrors';
import { DeleteUserByIdResponse } from './DeleteUserByIdResponse';

export class DeleteUserByIdUsecase implements Usecase<string, DeleteUserByIdResponse> {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: string): Promise<DeleteUserByIdResponse> {
    try {
      const isExists = await this.repository.findUserById(id);

      if (!isExists) {
        return left(new DeleteUserByIdErrors.UserNotFoundError(id));
      }

      await this.repository.deleteUser(id);
      return right(Result.ok<void>());
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error));
    }
  }
}
