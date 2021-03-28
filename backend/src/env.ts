import * as dotenv from 'dotenv';
import { getOsEnv } from './common/helpers/pathHelper';

dotenv.config();

export const env = {
  app: {
    port: getOsEnv('STORMRUST_PORT') || 3001,
    client: getOsEnv('REACT_APP_CLIENT'),
    server: getOsEnv('REACT_APP_SERVER'),
    secret: getOsEnv('JWT_SECRET_KEY')
  },
  auth: {
    googleId: getOsEnv('GOOGLE_CLIENT_ID'),
    googleSecret: getOsEnv('GOOGLE_SECRET')
  }
};
