import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { RefreshToken } from './RefreshToken';
import { Test } from './Test';
import { StudentAnswer } from './StudentAnswer';

@Entity()
@Unique(['email'])
export class User extends AbstractEntity {
  @Column()
  email: string;
  
  @Column()
  displayName: string;
  
  @OneToMany(() => RefreshToken, token => token.user, { onDelete: 'CASCADE' })
  refreshTokens: RefreshToken[];
  
  @OneToMany(() => Test, test => test.user, { onDelete: 'CASCADE' })
  tests: Test[]

  @OneToMany(() => StudentAnswer, studentAnswer => studentAnswer.user, { onDelete: 'CASCADE' })
  studentAnswers: StudentAnswer[];
}
