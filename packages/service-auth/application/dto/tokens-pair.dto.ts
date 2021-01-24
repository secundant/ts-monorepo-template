import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class TokensPairDto {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
