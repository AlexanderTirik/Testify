import { QuestionType } from '../../enums/QuestionType';
import { IStudentOption } from '../answerOption/IStudentOption';

export interface IStudentQuestion {
  id: string;
  text: string;
  questionType: QuestionType;
  answerOptions: IStudentOption[];
}
