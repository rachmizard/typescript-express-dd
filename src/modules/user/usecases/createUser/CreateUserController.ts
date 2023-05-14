import { BaseController } from '@/core/infra/BaseController';
import { CreateUserDto } from './CreateUserDTO';
import { CreateUserUsecase } from './CreateUserUsecase';

export class CreateUserController extends BaseController {
  constructor(private readonly usecase: CreateUserUsecase) {
    super();
  }

  protected async executeImpl() {
    try {
      const req = this.req;
      const body: CreateUserDto = req.body;
      const response = await this.usecase.execute(body);

      if (response.isLeft()) {
        const error = response.value;

        switch (error.constructor) {
          default:
            return this.fail(error.errorValue().message, error.errorValue().code);
        }
      }

      return this.created(this.res, 'User created successfully', response.value.getValue());
    } catch (error) {
      return this.fail(error);
    }
  }
}
