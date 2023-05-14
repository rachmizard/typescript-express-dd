import { dbConnection } from '@/database';

import { UserEntity } from '../../infra/typeorm/UserEntity';
import { UserRepositoryImpl } from '../../repositories/implementations/UserRepositoryImpl';
import { GetUserByIdController } from './GetUserByIdController';
import { GetUserByIdUsecase } from './GetUserByIdUsecase';

const userRepoImpl = new UserRepositoryImpl(dbConnection.getRepository(UserEntity));

const getUserByIdUsecase = new GetUserByIdUsecase(userRepoImpl);
const getUserByIdController = new GetUserByIdController(getUserByIdUsecase);

export { getUserByIdUsecase, getUserByIdController };
