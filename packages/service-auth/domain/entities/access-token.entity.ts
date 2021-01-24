import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RefreshTokenEntity } from '@my-project/service-auth/domain/entities/refresh-token.entity';

@Entity('access_tokens')
export class AccessTokenEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: number;

  @Column('varchar')
  value: string;

  @OneToOne(type => RefreshTokenEntity)
  @JoinColumn()
  refreshToken: RefreshTokenEntity;
}
