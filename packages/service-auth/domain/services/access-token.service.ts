import {
  ACCESS_TOKENS_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN
} from '@my-project/service-auth/constants/di-tokens';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '@my-project/service-users/domain/entities/user.entity';
import { AccessTokenEntity } from '@my-project/service-auth/domain/entities/access-token.entity';
import { IAccessTokensRepository } from '@my-project/service-auth/infrastructue/repository/Tokens/IAccessTokensRepository';
import { AccessTokenPayload } from '@my-project/service-auth/application/dto/access-token/access-token-payload';
import { AccessTokenSession } from '@my-project/service-auth/application/dto/access-token/access-token-session';
import { JWTConfiguration } from '@my-project/service-auth/infrastructue/configuration/IConfiguration';
import { IUsersRepository } from '@my-project/service-auth/infrastructue/repository/Users/IUsersRepository';

export class AccessTokenService {
  constructor(
    @Inject(ACCESS_TOKENS_REPOSITORY_TOKEN)
    private accessTokensRepository: IAccessTokensRepository,

    @Inject(USER_REPOSITORY_TOKEN)
    private usersRepository: IUsersRepository,

    private jwtService: JwtService,
    private configService: ConfigService
  ) {}
  async getUserByTokenValue(token: string): Promise<UserEntity> {
    const { userId } = await this.accessTokensRepository.getByToken(token);

    return this.usersRepository.findById(userId);
  }

  async assert(session: AccessTokenSession): Promise<void> {
    if (!(await this.verify(session))) {
      throw new UnauthorizedException('Incorrect access token');
    }
  }

  async verify({ accessToken }: AccessTokenSession): Promise<boolean> {
    const { secret } = this.configService.get<JWTConfiguration>('jwt')!.accessToken;

    try {
      await this.jwtService.verifyAsync<AccessTokenPayload>(accessToken, {
        secret
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  async create(user: UserEntity): Promise<AccessTokenEntity> {
    const value = await this.createTokenValue({
      userId: user.id
    });

    return this.accessTokensRepository.create({
      userId: user.id,
      value
    });
  }

  private createTokenValue(payload: AccessTokenPayload): Promise<string> {
    const {
      refreshToken: { expiresIn, secret }
    } = this.configService.get('jwt')!;

    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn
    });
  }
}
