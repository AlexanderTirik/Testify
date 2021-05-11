import { Request, Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { createTest, getUserTests, deleteTest, updateTest, getTest, getTestResults } from '../../services/test.service';
import { testMiddleware } from '../middlewares/protectionMiddleware';

const router = Router();

router
  .get('/user', run((req: Request) => getUserTests(req.user.id)))
  .get('/:id', run((req: Request) => getTest(req.params.id, req.user.id)))
  .post('/', run((req: Request) => createTest(req.user.id, req.body)))
  .delete('/:id', testMiddleware, run((req: Request) => deleteTest(req.user.id, req.params.id)))
  .put('/:id', testMiddleware, run((req: Request) => updateTest(req.user.id, req.params.id, req.body)))
  .get('/:id/results', testMiddleware, run((req: Request) => getTestResults(req.params.id)));
export default router;
