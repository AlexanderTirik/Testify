import base64url from 'base64url';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const googleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { testId } = req.query;
  passport.authenticate('google', {
    session: false,
    scope: ['email', 'profile'],
    state: base64url.toBase64(JSON.stringify({ testId }))
  })(req, res, next);
};

export const googleReturnMiddleware = passport.authenticate('google', { failureRedirect: '/', session: false });
