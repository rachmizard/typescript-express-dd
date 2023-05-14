import { dbConnection } from '@/database';
import { UserEntity } from '../../infra/typeorm/UserEntity';
import { UserRepositoryImpl } from '../../repositories/implementations/UserRepositoryImpl';
import { UpdateUserUsecase } from './UpdateUserUsecase';
import { UpdateUserController } from './UpdateUserController';

const userRepoImpl = new UserRepositoryImpl(dbConnection.getRepository(UserEntity));

const updateUserUsecase = new UpdateUserUsecase(userRepoImpl);
const updateUserController = new UpdateUserController(updateUserUsecase);

export { updateUserUsecase, updateUserController };
