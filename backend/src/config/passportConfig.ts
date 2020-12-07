import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam'
import { env } from '../env';

const { server, port } = env.app;
const { apiKey } = env.steam;

const validateUser = (_identifier: any, profile: any , done: any) => {
  done(null, profile);
};

const options = {
  returnURL: `${server}:${port}/api/auth/login/return`,
  realm: `${server}:${port}`,
  apiKey: apiKey
}

passport.use(new SteamStrategy(options, validateUser));
