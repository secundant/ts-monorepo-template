import { Expose } from 'class-transformer';
import { AccessTokenEntity } from '@my-project/service-auth/domain/entities/access-token.entity';

@Expose()
export class CreateRefreshTokenDto {
  accessToken: AccessTokenEntity;
  userId: number;
  value: string;
}
