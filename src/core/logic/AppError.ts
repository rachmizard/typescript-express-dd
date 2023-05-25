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

  export class InvalidRequestError<T = any> extends Result<UseCaseError> {
    public constructor(message: T) {
      super(false, {
        message,
        code: 400,
      } as UseCaseError);
      console.log(`[AppError]: Invalid request.`);
    }
  }

  export class UnauthorizedError extends Result<UseCaseError> {
    public constructor(message = 'Unauthorized') {
      super(false, {
        message,
        code: 401,
      } as UseCaseError);
      console.log(`[AppError]: Unauthorized.`);
    }
  }

  export class ForbiddenError extends Result<UseCaseError> {
    public constructor(message = 'Forbidden') {
      super(false, {
        message,
        code: 403,
      } as UseCaseError);
      console.log(`[AppError]: Forbidden.`);
    }
  }

  export class NotFoundError extends Result<UseCaseError> {
    public constructor(message = 'Not found') {
      super(false, {
        message,
        code: 404,
      } as UseCaseError);
      console.log(`[AppError]: Not found.`);
    }
  }

  export class ConflictError extends Result<UseCaseError> {
    public constructor(message = 'Conflict') {
      super(false, {
        message,
        code: 409,
      } as UseCaseError);
      console.log(`[AppError]: Conflict.`);
    }
  }
}
