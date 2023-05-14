import { GenericAppError } from '@/core/logic/AppError';
import { Either, Result } from '@/core/logic/Result';
import { CreateUserErrors } from './CreateUserErrors';
import { UserDTO } from '../../dto/UserDTO';

export type CreateUserResponse = Either<
  CreateUserErrors.EmailAlreadyExistsError | CreateUserErrors.UsernameTakenError | GenericAppError.UnexpectedError,
  Result<UserDTO>
>;
