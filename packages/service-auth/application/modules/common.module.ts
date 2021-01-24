import { ConfigurationLoader } from '@my-project/service-auth/infrastructue/configuration/configuration.loader';
import { DatabaseConfigurationLoader } from '@my-project/service-shared/infrastructure/configuration/database/database.configuration.loader';
import { MicroservicesConfigurationLoader } from '@my-project/service-auth/infrastructue/configuration/microservices.configuration.loader';
import { AuthConfigurationSchema } from '@my-project/service-auth/infrastructue/configuration/configuration.schema';
import { IConfiguration } from '@my-project/service-auth/infrastructue/configuration/IConfiguration';
import { ExternalAccountEntity } from '@my-project/service-auth/domain/entities/external-account.entity';
import { RefreshTokenEntity } from '@my-project/service-auth/domain/entities/refresh-token.entity';
import { AccessTokenEntity } from '@my-project/service-auth/domain/entities/access-token.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import {
  USER_REPOSITORY_TOKEN,
  USERS_MICROSERVICE_TOKEN
} from '@my-project/service-auth/constants/di-tokens';
import { MicroserviceUsersRepository } from '@my-project/service-auth/infrastructue/repository/Users/microservice.users.repository';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [ConfigurationLoader, DatabaseConfigurationLoader, MicroservicesConfigurationLoader],
      envFilePath: ['.env.local', '.env', '.env.example'],
      validationSchema: AuthConfigurationSchema
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<IConfiguration>) => ({
        ...config.get('database'),
        keepConnectionAlive: true,
        synchronize: true,
        entities: [ExternalAccountEntity, RefreshTokenEntity, AccessTokenEntity]
      })
    })
  ],
  providers: [
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: MicroserviceUsersRepository
    },
    {
      provide: USERS_MICROSERVICE_TOKEN,
      useFactory: (configService: ConfigService<IConfiguration>) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: configService.get('microservices').users
        });
      },
      inject: [ConfigService]
    }
  ],
  exports: [USER_REPOSITORY_TOKEN, USERS_MICROSERVICE_TOKEN, ConfigModule, TypeOrmModule]
})
export class CommonModule {}
