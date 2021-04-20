import { QuestionType } from '../../enums/QuestionType';
import { IAnswerOption } from '../answerOption/IAnswerOption';

export interface IQuestion {
  text: string;
  questionType: QuestionType;
  answerOptions: Array<IAnswerOption>;
}
