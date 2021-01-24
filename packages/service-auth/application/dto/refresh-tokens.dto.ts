import { IsString } from 'class-validator';

export class RefreshTokensDto {
  @IsString()
  refreshToken: string;

  @IsString()
  accessToken: string;
}
