import express from 'express';
import bodyParser from 'body-parser';
import { env } from './env';
import routes from './api/routes';
import { createConnection } from 'typeorm';
import "reflect-metadata";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.listen(env.app.port, async () => {
  try {
    await createConnection();
  } catch (error) {
    console.log('App started with error:', error);
  }

  console.log(`Server is running at ${env.app.port}.`);
});

export default app;
