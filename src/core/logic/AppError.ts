import { Result } from './Result';
import { UseCaseError } from './UseCaseError';

export namespace GenericAppError {
  export class UnexpectedError extends Result<UseCaseError> {
    public constructor(err: any, message = 'An unexpected error occurred.', code = 500) {
      super(false, {
        message: err?.message || message,
        error: err,
        code,
      } as UseCaseError);
      console.log(`[AppError]: An unexpected error occurred`);
      console.error(err);
    }

    public static create(err: any, message = 'An unexpected error occurred.', code = 500): UnexpectedError {
      return new UnexpectedError(err, message, code);
    }
  }
}
