import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { RefreshToken } from './RefreshToken';

@Entity()
@Unique(['email'])
export class User extends AbstractEntity {
    @Column()
    email: string;

    @Column()
    displayName: string;

    @OneToMany(() => RefreshToken, token => token.user, { onDelete: 'CASCADE' })
    refreshTokens: RefreshToken[];
}
