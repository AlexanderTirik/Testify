import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { env } from '../env';
import { getCreatedOrExistUser } from '../services/auth.service';

const { server, port } = env.app;

const validateUser = async (_request: any, _accessToken: any, _refreshToken: any, profile: any, done: any) => {
  const { emails, displayName } = profile;
  const email = emails[0].value;

  // need to add validation for @knu.ua.

  const user = await getCreatedOrExistUser({ email, displayName });

  done(null, user);
};

const options = {
  clientID: env.auth.googleId,
  clientSecret: env.auth.googleSecret,
  callbackURL: `${server}:${port}/api/auth/login/return`,
  passReqToCallback: true as true
};

passport.use(new GoogleStrategy(options, validateUser));
