import { QuestionType } from '../../enums/QuestionType';
import { IAnswerOption } from '../answerOption/IAnswerOption';

export interface IQuestion {
  id: string;
  text: string;
  questionType: QuestionType;
  answerOptions: Array<IAnswerOption>;
}
