import { getConnection } from 'typeorm';

import { IRequestContext } from '../shared/IRequestContext';

export function createGraphqlContext(context: IRequestContext): IRequestContext {
  const { request, response } = context;
  const connection = getConnection();
  const em = connection.manager;
  return { request, response, em, modelsToSave: [], user: response.locals.user };
}
