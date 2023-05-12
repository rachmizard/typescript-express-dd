import { BaseController } from '@/core/infra/BaseController';
import { DeleteUserByIdUsecase } from './DeleteUserByIdUsecase';

export class DeleteUserByIdController extends BaseController {
  constructor(private readonly usecase: DeleteUserByIdUsecase) {
    super();
  }

  protected async executeImpl() {
    try {
      await this.usecase.execute(this.req.params.id as unknown as number);
      return this.ok(this.res);
    } catch (error) {
      return this.fail(error);
    }
  }
}
