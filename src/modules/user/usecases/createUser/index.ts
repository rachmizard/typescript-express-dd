import { dbConnection } from '@/database';
import { UserEntity } from '../../infra/typeorm/UserEntity';
import { CreateUserController } from './CreateUserController';
import { CreateUserUsecase } from './CreateUserUsecase';
import { UserRepositoryImpl } from '../../repositories/UserRepositoryImpl';

const userRepoImpl = new UserRepositoryImpl(dbConnection.getRepository(UserEntity));
const createUserUsecase = new CreateUserUsecase(userRepoImpl);

const createUserController = new CreateUserController(createUserUsecase);

export { createUserUsecase, createUserController };
