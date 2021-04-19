import { Express } from 'express';
import testRoute from './testRoute';
import authRoute from './authRoute';
import questionRoute from './questionRoute';

const routes = (app: Express) => {
  app.use('/api/auth', authRoute);
  app.use('/api/test', testRoute);
  app.use('/api/question', questionRoute);
};

export default routes;
