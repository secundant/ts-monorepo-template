import { IsObject, IsString } from 'class-validator';

export class ExternalAuthorizationInfoDto {
  externalSystemName: 'google';

  @IsString()
  userId: string;

  @IsObject()
  profile: Record<string, unknown>;
}
