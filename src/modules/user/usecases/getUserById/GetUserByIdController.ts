import { BaseController } from '@/core/infra/BaseController';

import { GetUserByIdResponseDTO } from './GetUserByIdResponseDTO';
import { GetUserByIdUsecase } from './GetUserByIdUsecase';

export class GetUserByIdController extends BaseController {
  constructor(public usecase: GetUserByIdUsecase) {
    super();
  }

  protected async executeImpl() {
    try {
      const result = await this.usecase.execute(this.req.params.id);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return this.fail(error.errorValue().message, error.errorValue().code);
        }
      }

      return this.ok<GetUserByIdResponseDTO>(this.res, {
        data: result.value.getValue(),
      });
    } catch (error) {
      return this.fail(error, 500);
    }
  }
}
