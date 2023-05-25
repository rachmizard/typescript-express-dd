import { BaseController } from '@/core/infra/BaseController';

import { UserDTO } from '../../dto/UserDTO';
import { UpdateUserErrors } from './UpdateUserErrors';
import { UpdateUserRequestDTO } from './UpdateUserRequestDTO';
import { UpdateUserUsecase } from './UpdateUserUsecase';
import { GenericAppError } from '@/core/logic/AppError';

export class UpdateUserController extends BaseController {
  constructor(private readonly usecase: UpdateUserUsecase) {
    super();
  }

  protected async executeImpl() {
    try {
      const pathId = this.req.params.id;
      const body = this.req.body as UpdateUserRequestDTO;
      const result = await this.usecase.execute(pathId, body);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case UpdateUserErrors.UserNotFoundError:
            return this.notFound(error.errorValue().message);
          case UpdateUserErrors.IdNotProvidedError:
            return this.clientError(error.errorValue().message);
          case UpdateUserErrors.UsernameTakenError:
            return this.conflict(error.errorValue().message);
          case GenericAppError.ConflictError:
            return this.conflict(error.errorValue().message);
          default:
            return this.fail(error.errorValue().message, error.errorValue().code);
        }
      }

      return this.created<UserDTO>(this.res, 'User updated successfully', result.value.getValue());
    } catch (error) {}
  }
}
