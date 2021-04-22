import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Test } from './Test';
import { AnswerOption } from './AnswerOption';
import { StudentAnswer } from './StudentAnswer';
import { QuestionType } from '../../common/enums/QuestionType';

@Entity()
export class Question extends AbstractEntity {
  @Column()
  text: string;

  @Column()
  questionType: QuestionType;

  @ManyToMany(() => Test, test => test.questions)
  tests: Test[];

  @OneToMany(() => AnswerOption, option => option.question, { onDelete: 'CASCADE' })
  answerOptions: AnswerOption[];

  @OneToMany(() => StudentAnswer, stusentAnswer => stusentAnswer.question)
  studentAnswers: StudentAnswer[];
}
