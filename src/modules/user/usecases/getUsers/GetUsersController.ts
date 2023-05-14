import { BaseController } from '@/core/infra/BaseController';
import { GetUsersUsecase } from './GetUsersUsecase';
import { GetUsersResponseDTO } from './GetUsersResponseDTO';
import { QueryParams } from '@/interfaces/request.interface';

export class GetUsersController extends BaseController {
  constructor(private readonly usecase: GetUsersUsecase) {
    super();
  }

  protected async executeImpl() {
    try {
      const queryParams = this.req.query as unknown as QueryParams;
      const result = await this.usecase.execute(queryParams);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return this.fail(error.errorValue().message);
        }
      }

      return this.ok<GetUsersResponseDTO>(this.res, result.value.getValue());
    } catch (error) {
      return this.fail(error.toString());
    }
  }
}
