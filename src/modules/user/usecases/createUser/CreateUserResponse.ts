import { GenericAppError } from '@/core/logic/AppError';
import { Either, Result } from '@/core/logic/Result';
import { CreateUserErrors } from './CreateUserErrors';

export type CreateUserResponse = Either<
  CreateUserErrors.EmailAlreadyExistsError | CreateUserErrors.UsernameTakenError | GenericAppError.UnexpectedError | Result<any>,
  Result<void>
>;
