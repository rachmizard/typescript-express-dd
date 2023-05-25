import { Result } from '@/core/logic/Result';
import { UseCaseError } from '@/core/logic/UseCaseError';

export namespace UpdateUserErrors {
  export class UserNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `User not found`,
        code: 404,
      });
    }
  }
  export class UsernameTakenError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Username already taken`,
        code: 409,
      });
    }
  }

  export class IdNotProvidedError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Id property not provided`,
        code: 400,
      });
    }
  }
}
