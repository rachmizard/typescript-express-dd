import { hash } from 'bcrypt';

import { QueryParams } from '@/interfaces/request.interface';
import { HttpException } from '@/exceptions/httpException';
import { User } from '../interfaces/UserInterface';
import { UserRepository } from '../repositories/UserRepository';
import { CreateUserUsecase } from '../usecases/create-user.usecase';
import { DeleteUserByIdUsecase } from '../usecases/delete-user-by-id.usecase';
import { FindUserByEmailUsecase } from '../usecases/find-user-by-email.usecase';
import { FindUserByIdUsecase } from '../usecases/find-user-by-id.usecase';
import { GetAllUserUsecase } from '../usecases/get-all-user.usecase';
import { ResponseWithMetadata } from '@/interfaces/response.interface';
import { convertResponseWithMetadata, convertToParsedQueryParams } from '@/utils/response-converter';
import { GetCountUserUsecase } from '../usecases/get-count-user.usecase';
import { UserEntity } from '../infra/typeorm/UserEntity';

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  public async findAllUser(params?: QueryParams): Promise<ResponseWithMetadata<User[]>> {
    const parsedParams = convertToParsedQueryParams(params);

    const getAllUserUsecase = new GetAllUserUsecase(this.repository);
    const getCountUserUsecase = new GetCountUserUsecase(this.repository);

    const data = await getAllUserUsecase.execute(parsedParams);
    const count = await getCountUserUsecase.execute();

    return convertResponseWithMetadata({
      count,
      data,
      queryParams: params,
    });
  }

  public async findUserById(userId: number): Promise<User> {
    const findUserByIdUsecase = new FindUserByIdUsecase(this.repository);
    const foundedUser: User = await findUserByIdUsecase.execute(userId);

    if (!foundedUser) throw new HttpException(409, "User doesn't exist");

    return foundedUser;
  }

  public async createUser(userData: User): Promise<User> {
    const findUserByEmailUseCase = new FindUserByEmailUsecase(this.repository);
    const createUserUsecase = new CreateUserUsecase(this.repository);

    const foundedUser = await findUserByEmailUseCase.execute(userData.email);
    if (foundedUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createdUserData = await createUserUsecase.execute({ ...userData, password: hashedPassword });

    return createdUserData;
  }

  public async updateUser(userId: number, userData: User): Promise<User> {
    const findUserByIdUsecase = new FindUserByIdUsecase(this.repository);
    const foundedUser = await findUserByIdUsecase.execute(userId);

    if (!foundedUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    await UserEntity.update(userId, { ...userData, password: hashedPassword });

    const updateUser = await UserEntity.findOne({ where: { id: userId } });
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<User> {
    const findUserByIdUsecase = new FindUserByIdUsecase(this.repository);
    const deleteUserByIdUsecase = new DeleteUserByIdUsecase(this.repository);

    const foundedUser = await findUserByIdUsecase.execute(userId);

    if (!foundedUser) throw new HttpException(409, "User doesn't exist");

    await deleteUserByIdUsecase.execute(userId);
    return foundedUser;
  }
}
