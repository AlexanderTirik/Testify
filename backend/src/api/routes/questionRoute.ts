import { Request, Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { createQuestion, getTestQuestions, deleteQuestion, updateQuestion } from '../../services/question.service';

const router = Router();

router
  .get('/:testId', run((req: Request) => getTestQuestions(req.params.testId)))
  .post('/:testId', run((req: Request) => createQuestion(req.params.testId, req.body)))
  .delete('/:testId/:questionId', run((req: Request) => deleteQuestion(req.params.testId, req.params.questionId)))
  .put('/:testId/:questionId',
    run((req: Request) => updateQuestion(req.params.testId, req.params.questionId, req.body)));

export default router;
