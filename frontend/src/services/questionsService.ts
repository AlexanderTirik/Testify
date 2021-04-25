import api from '../common/helpers/apiHelper';
import { IQuestion } from '../common/models/question/IQuestion';

export const fetchQuestions = async (testId: string) => (
  api.get(`/api/question/${testId}`)
);

export const createQuestion = async (testId: string, question: IQuestion) => (
  api.post(`/api/question/${testId}`, { ...question })
);

export const deleteQuestion = async (testId: string, questionId: string) => (
  api.delete(`/api/question/${testId}/${questionId}`)
);
