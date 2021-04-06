import { Column, Entity, OneToMany, Unique, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { RefreshToken } from './RefreshToken';
import { Test } from './Test';

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
  @JoinColumn({ name: 'testId' })
  tests: Test[]
}
