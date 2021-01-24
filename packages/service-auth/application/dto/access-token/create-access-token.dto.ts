import { Expose } from 'class-transformer';

@Expose()
export class CreateAccessTokenDto {
  userId: number;
  value: string;
}
