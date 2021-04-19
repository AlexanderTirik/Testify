import { Question } from '../../data/entities/Question';

export const fromQuestionToIQuestion = (question: Question) => {
  const { text, questionType, answerOptions } = question;
  return { text, questionType, answerOptions };
};
