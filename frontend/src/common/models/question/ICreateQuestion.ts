import { QuestionType } from '../../enums/QuestionType';
import { ICreateAnswerOption } from '../answerOption/ICreateAnswerOption';

export interface ICreateQuestion {
  text: string;
  questionType: QuestionType;
  answerOptions: ICreateAnswerOption[];
}
