import { UserEntity } from '../../infra/typeorm/UserEntity';
import { UserRepositoryImpl } from '../../repositories/UserRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUserUsecase } from './CreateUserUsecase';

const userRepo = new UserRepositoryImpl(UserEntity);
const createUserUsecase = new CreateUserUsecase(userRepo);

const createUserController = new CreateUserController(createUserUsecase);

export { createUserUsecase, createUserController };
