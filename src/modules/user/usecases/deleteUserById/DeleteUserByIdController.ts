import { BaseController } from '@/core/infra/BaseController';
import { DeleteUserByIdUsecase } from './DeleteUserByIdUsecase';

export class DeleteUserByIdController extends BaseController {
  constructor(private readonly usecase: DeleteUserByIdUsecase) {
    super();
  }

  protected async executeImpl() {
    try {
      const result = await this.usecase.execute(this.req.params.id as unknown as string);

      if (result.isLeft()) {
        return this.fail(result.value.errorValue().message, result.value.errorValue().code);
      }

      return this.created(this.res, 'User deleted successfully');
    } catch (error) {
      return this.fail(error);
    }
  }
}
