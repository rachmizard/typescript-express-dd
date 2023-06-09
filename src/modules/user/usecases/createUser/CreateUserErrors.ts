import { Result } from '@/core/logic/Result';
import { UseCaseError } from '@/core/logic/UseCaseError';

export namespace CreateUserErrors {
  export class EmailAlreadyExistsError extends Result<UseCaseError> {
    constructor(email: string) {
      super(false, {
        message: `The email ${email} associated for this account already exists`,
        code: 409,
      } as UseCaseError);
    }
  }

  export class UsernameTakenError extends Result<UseCaseError> {
    constructor(username: string) {
      super(false, {
        message: `The username ${username} was already taken`,
        code: 409,
      } as UseCaseError);
    }
  }
}
