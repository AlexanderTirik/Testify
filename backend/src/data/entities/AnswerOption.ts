import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Question } from './Question';
import { StudentAnswer } from './StudentAnswer';

@Entity()
export class AnswerOption extends AbstractEntity {
  @Column()
  text: string;

  @Column()
  isCorrect: boolean;

  @ManyToOne(() => Question, question => question.answerOptions)
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @RelationId((answerOption: AnswerOption) => answerOption.question)
  readonly questionId: string;

  @OneToMany(() => StudentAnswer, studentAnswer => studentAnswer.answerOption)
  studentAnswers: StudentAnswer[];
}
