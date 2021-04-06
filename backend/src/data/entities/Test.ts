import { Column, Entity, ManyToOne, ManyToMany, JoinTable, RelationId, OneToMany, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';
import { Question } from './Question';
import { StudentAnswer } from './StudentAnswer';

@Entity()
export class Test extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @ManyToOne(() => User, user => user.tests)
  @JoinColumn({ name: 'userId' })
  user: User;

  @RelationId((test: Test) => test.user)
  readonly userId: string;

  @ManyToMany(() => Question, question => question.tests)
  @JoinTable()
  questions: Question[];

  @OneToMany(() => StudentAnswer, studentAnswer => studentAnswer.test, { onDelete: 'CASCADE' })
  studentAnswers: StudentAnswer[];
}
