import { IsObject } from 'class-validator';

export class CreateExternalAccountDto {
  userId: number;
  externalUserId: string;
  externalSystemName: 'google';

  @IsObject()
  profile: Record<string, unknown>;
}
