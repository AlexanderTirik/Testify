import { Express } from 'express';
import testRoute from './testRoute';
import authRoute from './authRoute';

const routes = (app: Express) => {
  app.use('/api/auth', authRoute);
  app.use('/api/test', testRoute);
};

export default routes;
