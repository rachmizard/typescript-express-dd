import { dbConnection } from '@/database';
import { UserEntity } from '../../infra/typeorm/UserEntity';
import { UserRepositoryImpl } from '../../repositories/UserRepositoryImpl';
import { GetUsersController } from './GetUsersController';
import { GetUsersUsecase } from './GetUsersUsecase';

const userRepoImpl = new UserRepositoryImpl(dbConnection.getRepository(UserEntity));

const getUsersUsecase = new GetUsersUsecase(userRepoImpl);
const getUsersController = new GetUsersController(getUsersUsecase);

export { getUsersUsecase, getUsersController };
