import { Request, Router } from 'express';
import url from 'url';
import { IAuthUser } from '../../common/models/user/IAuthUser';
import { env } from '../../env';
import { getAuthUser, login, refreshTokens } from '../../services/auth.service';
import { run } from '../../common/helpers/routeHelper';
import { googleMiddleware, googleReturnMiddleware } from '../middlewares/googleMiddleware';

const router = Router();

const { client } = env.app;

router
  .get('/login', googleMiddleware)
  .get('/login/return', googleReturnMiddleware, async (req, res) => {
    console.log('lalalaalal');
    const tokens = await login(req.user as IAuthUser);
    res.redirect(client + url.format({
      pathname: '/login',
      query: {
        ...tokens
      }
    }));
  })
  .get('/me', run((req: Request) => getAuthUser(req.user.id)))
  .post('/tokens', run((req: Request) => refreshTokens(req.body.refreshToken)));

export default router;
