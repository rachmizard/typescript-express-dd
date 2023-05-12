import { NextFunction, Request, Response } from 'express';

import { QueryParams } from '@/interfaces/request.interface';
import { User } from './interfaces/UserInterface';
import { UserRepositoryImpl } from './repositories/UserRepository';
import { UserService } from './services/user.service';
import { UserEntity } from './infra/typeorm/UserEntity';

export class UserController {
  public service = new UserService(new UserRepositoryImpl(UserEntity));

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const params = req.query as unknown as QueryParams;
      const response = await this.service.findAllUser(params);

      res.status(200).json({ data: response.data, meta: response.meta, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: User = await this.service.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const createUserData: User = await this.service.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: User = req.body;
      const updateUserData: User = await this.service.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: User = await this.service.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
