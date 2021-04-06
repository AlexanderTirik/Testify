import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Test } from './Test';

@Entity()
export class Question extends AbstractEntity {
  @Column()
  name: string;

  @ManyToMany(() => Test, test => test.questions)
  tests: Test[];
}