import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@app/graphql/infrastructure/repository/User/IUserRepository';
import { USER_REPOSITORY_TOKEN } from '@app/graphql/constants/di-tokens';
import { CreateUserInput } from '@app/graphql/application/dto/inputs/create-user.input';
import { User } from '@app/graphql/domain/entities/User';

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
