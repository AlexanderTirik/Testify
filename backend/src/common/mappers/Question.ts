import { Question } from '../../data/entities/Question';

export const fromQuestionToIQuestion = (question: Question) => {
  const { id, text, questionType, answerOptions } = question;
  return { id, text, questionType, answerOptions };
};
