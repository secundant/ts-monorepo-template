import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class RefreshTokenPayload {
  userId: number;

  @IsString()
  accessTokenId: string;
}
