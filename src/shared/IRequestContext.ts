import { Request, Response } from 'express';
import { EntityManager } from 'typeorm';
import { User } from '../user/models/User';

export interface IRequest extends Request {
  headers: {
    token?: string;
    Authorization: string;
  };
}

export interface IRequestContext {
  em: EntityManager;
  request: IRequest;
  response: Response;
  modelsToSave: Array<object>;
  user?: User;
}
