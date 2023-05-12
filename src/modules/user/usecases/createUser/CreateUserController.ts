import { BaseController } from '@/core/infra/BaseController';
import { CreateUserUsecase } from './CreateUserUsecase';

export class CreateUserController extends BaseController {
  constructor(public readonly usecase: CreateUserUsecase) {
    super();
  }

  protected async executeImpl() {
    try {
      const req = this.req;
      const body = req.body;
      const createUserData = await this.usecase.execute(body);

      return this.ok(this.res, createUserData);
    } catch (error) {
      return this.fail(error);
    }
  }
}
