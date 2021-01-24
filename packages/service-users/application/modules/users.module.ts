import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@my-project/service-users/domain/entities/user.entity';
import { UsersService } from '@my-project/service-users/domain/services/users.service';
import { UsersController } from '@my-project/service-users/application/controllers/users.controller';
import { TypeormUsersRepository } from '@my-project/service-users/infrastructue/repository/users/typeorm.users.repository';
import { USER_REPOSITORY_TOKEN } from '@my-project/service-users/constants/di-tokens';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UsersService,
    {
      useClass: TypeormUsersRepository,
      provide: USER_REPOSITORY_TOKEN
    }
  ],
  controllers: [UsersController]
})
export class UsersModule {}
