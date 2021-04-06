import { Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';
import { AnswerOption } from './AnswerOption';
import { Question } from './Question';
import { Test } from './Test';

@Entity()
export class StudentAnswer extends AbstractEntity {
  @ManyToOne(() => User, user => user.studentAnswers)
  @JoinColumn({ name: 'userId' })
  user: User;
  
  @ManyToOne(() => AnswerOption, answerOption => answerOption.studentAnswers)
  @JoinColumn({ name: 'answerOptionId' })
  answerOption: AnswerOption;
  
  @ManyToOne(() => Question, question => question.studentAnswers)
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @ManyToOne(() => Test, test => test.studentAnswers)
  @JoinColumn({ name: 'testId'})
  test: Test;
  
  @RelationId((studentAnswer: StudentAnswer) => studentAnswer.user)
  readonly userId: string;

  @RelationId((studentAnswer: StudentAnswer) => studentAnswer.answerOption)
  readonly answerOptionId: string;

  @RelationId((studentAnswer: StudentAnswer) => studentAnswer.question)
  readonly questionId: string;

  @RelationId((studentAnswer: StudentAnswer) => studentAnswer.test)
  readonly testId: string;
}