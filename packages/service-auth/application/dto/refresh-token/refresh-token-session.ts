import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class RefreshTokenSession {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
