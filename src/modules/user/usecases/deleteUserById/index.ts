import { UserEntity } from '../../infra/typeorm/UserEntity';
import { UserRepositoryImpl } from '../../repositories/UserRepository';
import { DeleteUserByIdController } from './DeleteUserByIdController';
import { DeleteUserByIdUsecase } from './DeleteUserByIdUsecase';

const userRepo = new UserRepositoryImpl(UserEntity);

const deleteUserByIdUsecase = new DeleteUserByIdUsecase(userRepo);
const deleteUserByIdController = new DeleteUserByIdController(deleteUserByIdUsecase);

export { deleteUserByIdUsecase, deleteUserByIdController };
