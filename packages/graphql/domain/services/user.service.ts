import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@my-project/graphql/infrastructure/repository/User/IUserRepository';
import { USER_REPOSITORY_TOKEN } from '@my-project/graphql/constants/di-tokens';
import { CreateUserInput } from '@my-project/graphql/application/dto/inputs/create-user.input';
import { User } from '@my-project/graphql/domain/entities/User';

@Injectable()
export class UserService {
  constructor(@Inject(USER_REPOSITORY_TOKEN) private userRepository: IUserRepository) {}

  create(data: CreateUserInput): Promise<User> {
    return this.userRepository.create(data);
  }

  getById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }
}
