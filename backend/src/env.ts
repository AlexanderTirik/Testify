import * as dotenv from 'dotenv';
import { getOsEnv } from './common/helpers/pathHelper';

dotenv.config();

export const env = {
  app: {
    port: getOsEnv('STORMRUST_PORT') || 3001
  }
};
