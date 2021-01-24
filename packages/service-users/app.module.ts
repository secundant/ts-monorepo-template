import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigurationSchema } from '@my-project/service-users/infrastructue/configuration/configuration.schema';
import { UserEntity } from '@my-project/service-users/domain/entities/user.entity';
import { IConfiguration } from '@my-project/service-users/infrastructue/configuration/IConfiguration';
import { DatabaseConfigurationLoader } from '@my-project/service-shared/infrastructure/configuration/database/database.configuration.loader';
import { UsersModule } from '@my-project/service-users/application/modules/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [DatabaseConfigurationLoader],
      envFilePath: ['.env', '.env.example'],
      validationSchema: ConfigurationSchema
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<IConfiguration>) => ({
        ...config.get('database'),
        keepConnectionAlive: true,
        synchronize: true,
        entities: [UserEntity]
      })
    }),
    UsersModule
  ]
})
export class AppModule {}
