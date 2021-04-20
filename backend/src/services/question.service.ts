import { getCustomRepository } from 'typeorm';
import { fromQuestionToIQuestion } from '../common/mappers/Question';
import { IQuestion } from '../common/models/question/IQuestion';
import QuestionRepository from '../data/repositories/QuestionRepository';

export const getTestQuestions = async (testId: string) => {
  const questions = await getCustomRepository(QuestionRepository).findTestQuestions(testId);
  const ans = questions.map(q => fromQuestionToIQuestion(q));
  return ans;
};

export const createQuestion = async (testId: string, questionData: IQuestion) => {
  const createdQuestion = await getCustomRepository(QuestionRepository).createQuestion(testId, questionData);
  return fromQuestionToIQuestion(createdQuestion);
};

export const deleteQuestion = async (testId: string, questionId: string) => {
  const deletedQuestion = await getCustomRepository(QuestionRepository).deleteQuestion(testId, questionId);
  return fromQuestionToIQuestion(deletedQuestion);
};

export const updateQuestion = async (testId: string, questionId: string, questionData: IQuestion) => {
  const updatedQuestion = await getCustomRepository(QuestionRepository)
    .updateQuestion(testId, questionId, questionData);
  return fromQuestionToIQuestion(updatedQuestion);
};
