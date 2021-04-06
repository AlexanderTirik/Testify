import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Question } from './Question';
import { StudentAnswer } from './StudentAnswer';

@Entity()
export class AnswerOption extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  isCorrect: boolean;

  @ManyToMany(() => Question, question => question.answerOptions)
  questions: Question[];

  @OneToMany(() => StudentAnswer, studentAnswer => studentAnswer.answerOption)
  studentAnswers: StudentAnswer[];
}