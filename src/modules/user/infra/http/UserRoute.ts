import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';

import { UserController } from '../../user.controller';
import { CreateUserDto, UpdateUserDto } from '../../dto/UserDTO';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';

import { createUserController } from '../../usecases/createUser';
import { deleteUserByIdController } from '../../usecases/deleteUserById';
import { getUsersController } from '../../usecases/getUsers';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();

  public controller = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, (req, res) => getUsersController.execute(req, res));
    this.router.get(`${this.path}/:id(\\d+)`, this.controller.getUserById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto, true), (req, res) => createUserController.execute(req, res));
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateUserDto, true), this.controller.updateUser);
    this.router.delete(`${this.path}/:id(\\d+)`, (req, res) => deleteUserByIdController.execute(req, res));
  }
}
