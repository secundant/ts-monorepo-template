import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '@my-project/service-auth/infrastructue/repository/Users/IUsersRepository';
import {
  EXTERNAL_ACCOUNTS_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN
} from '@my-project/service-auth/constants/di-tokens';
import { UserEntity } from '@my-project/service-users/domain/entities/user.entity';
import { TokensPairDto } from '@my-project/service-auth/application/dto/tokens-pair.dto';
import { RefreshTokenSession } from '@my-project/service-auth/application/dto/refresh-token/refresh-token-session';
import { ExternalAuthorizationInfoDto } from '@my-project/service-auth/application/dto/external-account/external-authorization-info.dto';
import { IExternalAccountsRepository } from '@my-project/service-auth/infrastructue/repository/external-accounts/IExternalAccountsRepository';
import { RegisterUserDto } from '@my-project/service-auth/application/dto/register-user.dto';
import { SessionDto } from '@my-project/service-auth/application/dto/session.dto';
import { RefreshTokenService } from '@my-project/service-auth/domain/services/refresh-token.service';
import { AccessTokenService } from '@my-project/service-auth/domain/services/access-token.service';
import { AccessTokenSession } from '@my-project/service-auth/application/dto/access-token/access-token-session';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN) private usersRepository: IUsersRepository,

    @Inject(EXTERNAL_ACCOUNTS_REPOSITORY_TOKEN)
    private externalAccountsRepository: IExternalAccountsRepository,

    private accessTokenService: AccessTokenService,
    private refreshTokenService: RefreshTokenService
  ) {}
  async registerNewUser(data: RegisterUserDto): Promise<SessionDto> {
    const user = await this.usersRepository.create(data);

    return this.login(user);
  }

  async identify(tokens: AccessTokenSession): Promise<UserEntity> {
    await this.accessTokenService.assert(tokens);
    return this.accessTokenService.getUserByTokenValue(tokens.accessToken);
  }

  async login(user: UserEntity): Promise<SessionDto> {
    console.log(`[login] Creating tokens for`, user);
    const tokens = await this.createNewTokensPair(user);

    console.log(`Tokens created:`, tokens);
    return AuthService.createSession(user, tokens);
  }

  async refresh({ refreshToken, accessToken }: RefreshTokenSession): Promise<SessionDto> {
    await this.refreshTokenService.assert({
      accessToken,
      refreshToken
    });
    const user = await this.refreshTokenService.getUserByTokenValue(refreshToken);

    await this.refreshTokenService.destroy({
      accessToken,
      refreshToken
    });
    return this.login(user);
  }

  async loginExternalAccount({
    externalSystemName,
    profile,
    userId
  }: ExternalAuthorizationInfoDto): Promise<SessionDto> {
    console.log(
      `Signing by "${externalSystemName}" as email "${profile.email}" and id "${userId}"`
    );
    const externalAccount = await this.externalAccountsRepository.tryGet({
      externalSystemName: externalSystemName,
      externalUserId: userId
    });

    if (externalAccount) {
      console.log(`External account:`, externalAccount);
      const user = await this.usersRepository.findById(externalAccount.userId);

      console.log(`Linked user to external account:`, user);
      return this.login(user);
    } else {
      console.log(`No external account. Creating new user...`);
      const newUser = await this.usersRepository.create({
        email: profile.email as string,
        password: 'A12@1dds!dzkjd',
        username: 'external-random-username'
      });

      console.log('Created user:', newUser);
      console.log(`Creating new "${externalSystemName}" external account...`);
      await this.externalAccountsRepository.create({
        externalSystemName: externalSystemName,
        externalUserId: userId,
        userId: newUser.id,
        profile
      });

      return this.login(newUser);
    }
  }

  async createNewTokensPair(user: UserEntity): Promise<TokensPairDto> {
    const accessToken = await this.accessTokenService.create(user);
    const refreshToken = await this.refreshTokenService.create(user, accessToken);

    return {
      accessToken: accessToken.value,
      refreshToken: refreshToken.value
    };
  }

  private static createSession(user: UserEntity, tokens: TokensPairDto): SessionDto {
    return {
      user,
      ...tokens
    };
  }
}
