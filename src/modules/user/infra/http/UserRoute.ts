import { Router } from 'express';

import { BaseRoute } from '@/core/infra/BaseRoute';

import { createUserController } from '../../usecases/createUser';
import { deleteUserByIdController } from '../../usecases/deleteUserById';
import { getUserByIdController } from '../../usecases/getUserById';
import { getUsersController } from '../../usecases/getUsers';

export class UserRoute implements BaseRoute {
  public path = '/users';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, (req, res) => getUsersController.execute(req, res));
    this.router.get(`${this.path}/:id`, (req, res) => getUserByIdController.execute(req, res));
    this.router.post(`${this.path}`, (req, res) => createUserController.execute(req, res));
    // this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateUserDto, true), this.controller.updateUser);
    this.router.delete(`${this.path}/:id`, (req, res) => deleteUserByIdController.execute(req, res));
  }
}
