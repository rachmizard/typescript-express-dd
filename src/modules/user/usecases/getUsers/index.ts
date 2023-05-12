import { UserEntity } from '../../infra/typeorm/UserEntity';
import { UserRepositoryImpl } from '../../repositories/UserRepository';
import { GetUsersController } from './GetUsersController';
import { GetUsersUsecase } from './GetUsersUsecase';

const userRepo = new UserRepositoryImpl(UserEntity);

const getUsersUsecase = new GetUsersUsecase(userRepo);
const getUsersController = new GetUsersController(getUsersUsecase);

export { getUsersUsecase, getUsersController };
