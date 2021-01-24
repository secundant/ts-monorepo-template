import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@my-project/service-auth/application/controllers/auth.controller';
import { GoogleExternalAuthController } from '@my-project/service-auth/application/controllers/google-external-auth.controller';
import { AuthService } from '@my-project/service-auth/domain/services/auth.service';
import { AccessTokenService } from '@my-project/service-auth/domain/services/access-token.service';
import { RefreshTokenService } from '@my-project/service-auth/domain/services/refresh-token.service';
import {
  ACCESS_TOKENS_REPOSITORY_TOKEN,
  EXTERNAL_ACCOUNTS_REPOSITORY_TOKEN,
  REFRESH_TOKENS_REPOSITORY_TOKEN
} from '@my-project/service-auth/constants/di-tokens';
import { TypeormAccessTokensRepository } from '@my-project/service-auth/infrastructue/repository/Tokens/typeorm.access-tokens.repository';
import { TypeormRefreshTokensRepository } from '@my-project/service-auth/infrastructue/repository/Tokens/typeorm.refresh-tokens.repository';
import { TypeormExternalAccountsRepository } from '@my-project/service-auth/infrastructue/repository/external-accounts/typeorm.external-accounts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalAccountEntity } from '@my-project/service-auth/domain/entities/external-account.entity';
import { RefreshTokenEntity } from '@my-project/service-auth/domain/entities/refresh-token.entity';
import { AccessTokenEntity } from '@my-project/service-auth/domain/entities/access-token.entity';
import { GoogleStrategy } from '@my-project/service-auth/application/strategies/google.strategy';
import { CommonModule } from '@my-project/service-auth/application/modules/common.module';

@Module({
  imports: [
    CommonModule,
    PassportModule,
    TypeOrmModule.forFeature([ExternalAccountEntity, RefreshTokenEntity, AccessTokenEntity]),
    // We have access and refresh tokens with different setting, so skip providing any default options
    JwtModule.register({})
  ],
  providers: [
    AccessTokenService,
    RefreshTokenService,
    AuthService,
    GoogleStrategy,
    {
      provide: ACCESS_TOKENS_REPOSITORY_TOKEN,
      useClass: TypeormAccessTokensRepository
    },
    {
      provide: REFRESH_TOKENS_REPOSITORY_TOKEN,
      useClass: TypeormRefreshTokensRepository
    },
    {
      provide: EXTERNAL_ACCOUNTS_REPOSITORY_TOKEN,
      useClass: TypeormExternalAccountsRepository
    }
  ],
  controllers: [AuthController, GoogleExternalAuthController]
})
export class AuthModule {}
