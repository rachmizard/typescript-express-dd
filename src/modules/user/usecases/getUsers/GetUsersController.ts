import { QueryParams } from '@/interfaces/request.interface';
import { BaseController } from '@/core/infra/BaseController';
import { GetUsersUsecase } from './GetUsersUsecase';

export class GetUsersController extends BaseController {
  constructor(private readonly usecase: GetUsersUsecase) {
    super();
  }

  protected async executeImpl() {
    try {
      const req = this.req;
      const queryParams = req.query as unknown as QueryParams;

      const result = await this.usecase.execute(queryParams);

      return this.ok(this.res, result);
    } catch (error) {
      return this.fail(error.toString());
    }
  }
}
