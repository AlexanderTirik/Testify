import { Request, Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { createTest, getUserTests, deleteTest, updateTest } from '../../services/test.service';

const router = Router();

router
  .get('/user', run((req: Request) => getUserTests(req.user.id)))
  .post('/', run((req: Request) => createTest(req.user.id, req.body)))
  .delete('/:testId', run((req: Request) => deleteTest(req.user.id, req.params.testId)))
  .put('/:testId', run((req: Request) => updateTest(req.user.id, req.params.testId, req.body)));

export default router;
