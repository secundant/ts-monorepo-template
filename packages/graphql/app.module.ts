import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from '@app/graphql/application/resolvers/user.resolver';
import { UserService } from '@app/graphql/domain/services/user.service';
import { LocalUserRepository } from '@app/graphql/infrastructure/repository/User/local.user.repository';
import { USER_REPOSITORY_TOKEN } from '@app/graphql/constants/di-tokens';
import { resolve } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: resolve(process.cwd(), 'schema.gql'),
      formatError: error => ({
        message: error.extensions?.exception.response.message ?? error.message,
        code: error.extensions?.code,
        locations: error.locations,
        path: error.path
      })
    })
  ],
  providers: [
    UserResolver,
    UserService,
    {
      useClass: LocalUserRepository,
      provide: USER_REPOSITORY_TOKEN
    }
  ]
})
export class AppModule {}
