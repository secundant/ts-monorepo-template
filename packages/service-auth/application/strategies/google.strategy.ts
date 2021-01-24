import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import {
  AuthStrategiesConfiguration,
  IConfiguration
} from '@my-project/service-auth/infrastructue/configuration/IConfiguration';
import { AuthService } from '@my-project/service-auth/domain/services/auth.service';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ExternalAuthorizationInfoDto } from '@my-project/service-auth/application/dto/external-account/external-authorization-info.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService<IConfiguration>, private authService: AuthService) {
    super(createStrategyConfig(configService));
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<void> {
    const { id, emails: [email] = [], ...fields } = profile;
    const externalAccountInfo = plainToClass<
      ExternalAuthorizationInfoDto,
      ExternalAuthorizationInfoDto
    >(ExternalAuthorizationInfoDto, {
      externalSystemName: 'google',
      userId: id,
      profile: {
        email: email?.value,
        ...fields
      }
    });

    await validateOrReject(externalAccountInfo);
    const session = await this.authService.loginExternalAccount(externalAccountInfo);

    done(void 0, session);
  }
}

const createStrategyConfig = (configService: ConfigService<IConfiguration>) => {
  const {
    google: { callbackUrl, clientId, secret }
  } = configService.get<AuthStrategiesConfiguration>('authStrategies')!;

  return {
    clientID: clientId,
    clientSecret: secret,
    callbackURL: callbackUrl,
    scope: ['email', 'profile']
  };
};
