import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '@my-project/service-users/infrastructue/repository/users/IUsersRepository';
import { CreateUserDto } from '@my-project/service-users/application/dto/create-user.dto';
import { UserEntity } from '@my-project/service-users/domain/entities/user.entity';
import { USER_REPOSITORY_TOKEN } from '@my-project/service-users/constants/di-tokens';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY_TOKEN) private userRepository: IUsersRepository) {}

  create(data: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.createUser(data);
  }

  getById(id: string): Promise<UserEntity> {
    return this.userRepository.findById(id);
  }
}
