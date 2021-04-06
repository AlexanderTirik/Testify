  import { Column, Entity, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Test } from './Test';
import { AnswerOption } from './AnswerOption';
import { StudentAnswer } from './StudentAnswer';
import { QuestionType } from '../../common/enums/QuestionType';

@Entity()
export class Question extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  questionType: QuestionType;

  @ManyToMany(() => Test, test => test.questions)
  tests: Test[];

  @ManyToMany(() => AnswerOption, option => option.questions)
  @JoinTable()
  answerOptions: AnswerOption[];

  @OneToMany(() => StudentAnswer, stusentAnswer => stusentAnswer.question)
  studentAnswers: StudentAnswer[];
}