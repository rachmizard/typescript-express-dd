import { dbConnection } from '@/database';
import { UserEntity } from '../../infra/typeorm/UserEntity';
import { UserRepositoryImpl } from '../../repositories/implementations/UserRepositoryImpl';
import { DeleteUserByIdController } from './DeleteUserByIdController';
import { DeleteUserByIdUsecase } from './DeleteUserByIdUsecase';

const userRepoImpl = new UserRepositoryImpl(dbConnection.getRepository(UserEntity));

const deleteUserByIdUsecase = new DeleteUserByIdUsecase(userRepoImpl);
const deleteUserByIdController = new DeleteUserByIdController(deleteUserByIdUsecase);

export { deleteUserByIdUsecase, deleteUserByIdController };
