import { BaseController } from '@/core/infra/BaseController';
import { GetUsersUsecase } from './GetUsersUsecase';
import { GetUsersResponseDTO } from './GetUsersResponseDTO';

export class GetUsersController extends BaseController {
  constructor(private readonly usecase: GetUsersUsecase) {
    super();
  }

  protected async executeImpl() {
    try {
      const result = await this.usecase.execute();

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return this.fail(error.errorValue().message);
        }
      }

      return this.ok<GetUsersResponseDTO>(this.res, {
        data: result.value.getValue(),
      });
    } catch (error) {
      return this.fail(error.toString());
    }
  }
}
