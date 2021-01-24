import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccessTokenEntity } from '@my-project/service-auth/domain/entities/access-token.entity';

@Entity('refresh_tokens')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: number;

  @Column('varchar')
  value: string;

  @OneToOne(type => AccessTokenEntity)
  @JoinColumn()
  accessToken: AccessTokenEntity;
}
