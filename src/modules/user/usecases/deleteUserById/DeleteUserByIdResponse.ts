import { GenericAppError } from '@/core/logic/AppError';
import { Either, Result } from '@/core/logic/Result';
import { DeleteUserByIdErrors } from './DeleteUserByIdErrors';

export type DeleteUserByIdResponse = Either<GenericAppError.UnexpectedError | DeleteUserByIdErrors.UserNotFoundError, Result<void>>;
