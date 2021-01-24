import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '@my-project/service-auth/infrastructue/repository/Users/IUsersRepository';
import { CreateUserDto } from '@my-project/service-users/application/dto/create-user.dto';
import { UserEntity } from '@my-project/service-users/domain/entities/user.entity';
import { USERS_MICROSERVICE_TOKEN } from '@my-project/service-auth/constants/di-tokens';
import { ClientProxy } from '@nestjs/microservices';
import { CREATE_USER_COMMAND, GET_USER_BY_ID } from '@my-project/service-users/constants/commands';

@Injectable()
export class MicroserviceUsersRepository implements IUsersRepository {
  constructor(@Inject(USERS_MICROSERVICE_TOKEN) private usersClient: ClientProxy) {}

  create(user: CreateUserDto): Promise<UserEntity> {
    return this.usersClient.send<UserEntity>({ cmd: CREATE_USER_COMMAND }, user).toPromise();
  }

  async findById(id: number): Promise<UserEntity> {
    return this.usersClient.send<UserEntity>({ cmd: GET_USER_BY_ID }, id).toPromise();
  }
}
