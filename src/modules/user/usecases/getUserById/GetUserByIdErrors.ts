import { Result } from '@/core/logic/Result';
import { UseCaseError } from '@/core/logic/UseCaseError';

export namespace GetUserByIdErrors {
  export class UserNotFoundError extends Result<UseCaseError> {
    constructor(id: string) {
      super(false, {
        code: 404,
        message: `User with ${id} not found`,
      } as UseCaseError);
    }
  }
}
