import { Request, Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { createQuestion, getTestQuestions } from '../../services/question.service';

const router = Router();

router
  .get('/:testId', run((req: Request) => getTestQuestions(req.params.testId)))
  .post('/:testId', run((req: Request) => createQuestion(req.params.testId, req.body)));

export default router;
