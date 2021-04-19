import { getCustomRepository } from 'typeorm';
import { fromQuestionToIQuestion } from '../common/mappers/Question';
import { IQuestion } from '../common/models/question/IQuestion';
import QuestionRepository from '../data/repositories/QuestionRepository';

export const getTestQuestions = async (testId: string) => {
  const questions = await getCustomRepository(QuestionRepository).findTestQuestions(testId);
  return questions.map(q => fromQuestionToIQuestion(q));
};

export const createQuestion = async (testId: string, questionData: IQuestion) => {
  const createdQuestion = await getCustomRepository(QuestionRepository).createQuestion(testId, questionData);
  return fromQuestionToIQuestion(createdQuestion);
};
