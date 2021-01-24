import {
  ACCESS_TOKENS_REPOSITORY_TOKEN,
  REFRESH_TOKENS_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN
} from '@my-project/service-auth/constants/di-tokens';
import { IRefreshTokensRepository } from '@my-project/service-auth/infrastructue/repository/Tokens/IRefreshTokensRepository';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenPayload } from '@my-project/service-auth/application/dto/refresh-token/refresh-token-payload';
import { UserEntity } from '@my-project/service-users/domain/entities/user.entity';
import { AccessTokenEntity } from '@my-project/service-auth/domain/entities/access-token.entity';
import { RefreshTokenEntity } from '@my-project/service-auth/domain/entities/refresh-token.entity';
import { RefreshTokenSession } from '@my-project/service-auth/application/dto/refresh-token/refresh-token-session';
import { JWTConfiguration } from '@my-project/service-auth/infrastructue/configuration/IConfiguration';
import { IUsersRepository } from '@my-project/service-auth/infrastructue/repository/Users/IUsersRepository';
import { IAccessTokensRepository } from '@my-project/service-auth/infrastructue/repository/Tokens/IAccessTokensRepository';

export class RefreshTokenService {
  constructor(
    @Inject(REFRESH_TOKENS_REPOSITORY_TOKEN)
    private refreshTokensRepository: IRefreshTokensRepository,

    @Inject(ACCESS_TOKENS_REPOSITORY_TOKEN)
    private accessTokensRepository: IAccessTokensRepository,

    @Inject(USER_REPOSITORY_TOKEN)
    private usersRepository: IUsersRepository,

    private jwtService: JwtService,
    private configService: ConfigService
  ) {}
  async getUserByTokenValue(token: string): Promise<UserEntity> {
    const { userId } = await this.refreshTokensRepository.getByToken({
      refreshToken: token
    });

    return this.usersRepository.findById(userId);
  }

  async destroy({ refreshToken, accessToken }: RefreshTokenSession): Promise<void> {
    await this.refreshTokensRepository.deleteByToken(refreshToken);
    await this.accessTokensRepository.deleteByToken(accessToken);
  }

  async assert(session: RefreshTokenSession): Promise<void> {
    if (!(await this.verify(session))) {
      throw new UnauthorizedException('Incorrect refresh token');
    }
  }

  async verify({ accessToken, refreshToken }: RefreshTokenSession): Promise<boolean> {
    const { secret } = this.configService.get<JWTConfiguration>('jwt')!.refreshToken;

    try {
      await this.jwtService.verifyAsync(refreshToken, {
        secret
      });
      const refreshTokenEntity = await this.refreshTokensRepository.getByToken({
        refreshToken: refreshToken,
        includeAccessToken: true
      });

      return refreshTokenEntity.accessToken.value === accessToken;
    } catch (e) {
      return false;
    }
  }

  async create(user: UserEntity, accessToken: AccessTokenEntity): Promise<RefreshTokenEntity> {
    const value = await this.createTokenValue({
      userId: user.id,
      accessTokenId: accessToken.id
    });

    return this.refreshTokensRepository.create({
      userId: user.id,
      accessToken,
      value
    });
  }

  private createTokenValue(payload: RefreshTokenPayload): Promise<string> {
    const {
      refreshToken: { expiresIn, secret }
    } = this.configService.get('jwt')!;

    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn
    });
  }
}
