import { Request, Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { createTest, getUserTests } from '../../services/test.service';

const router = Router();

router
  .get('/user', run((req: Request) => getUserTests(req.user.id)))
  .post('/', run((req: Request) => createTest(req.user.id, req.body)));

export default router;
