import { Request, Router } from 'express';
import url from 'url';
import { IAuthUser } from '../../common/models/user/IAuthUser';
import { env } from '../../env';
import { getAuthUser, iosLogin, login, refreshTokens } from '../../services/auth.service';
import { run } from '../../common/helpers/routeHelper';
import { googleMiddleware, googleReturnMiddleware } from '../middlewares/googleMiddleware';

const router = Router();

const { client } = env.app;

router
  .get('/login', googleMiddleware)
  .get('/login/return', googleReturnMiddleware, async (req, res) => {
    const tokens = await login(req.user as IAuthUser);
    const state = req.query.state as string;
    const obj = state.slice(state.indexOf('{'), state.indexOf('}') + 1);
    const { testId } = JSON.parse(obj);
    res.redirect(client + url.format({
      pathname: '/login-process',
      query: {
        ...tokens,
        testId
      }
    }));
  })
  .get('/me', run((req: Request) => getAuthUser(req.user.id)))
  .post('/ios-login', run((req: Request) => iosLogin({ ...req.body })))
  .post('/tokens', run((req: Request) => refreshTokens(req.body.refreshToken)));

export default router;
