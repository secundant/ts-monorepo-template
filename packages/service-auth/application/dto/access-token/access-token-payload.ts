import { Expose } from 'class-transformer';

@Expose()
export class AccessTokenPayload {
  userId: number;
}
