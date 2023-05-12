import { BaseController } from '@/core/infra/BaseController';
import { CreateUserUsecase } from './CreateUserUsecase';
import { CreateUserDto } from './CreateUserDTO';

export class CreateUserController extends BaseController {
  constructor(private readonly usecase: CreateUserUsecase) {
    super();
  }

  protected async executeImpl() {
    try {
      const req = this.req;
      const body: CreateUserDto = req.body;
      const createUserData = await this.usecase.execute(body);

      return this.ok(this.res, createUserData);
    } catch (error) {
      return this.fail(error);
    }
  }
}
