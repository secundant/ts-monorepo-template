import { IUserRepository } from '@my-project/graphql/infrastructure/repository/User/IUserRepository';
import { User } from '@my-project/graphql/domain/entities/User';
import { CreateUserInput } from '@my-project/graphql/application/dto/inputs/create-user.input';
import { random } from 'faker/locale/ru';
import { plainToClass } from 'class-transformer';

export class LocalUserRepository implements IUserRepository {
  private users = new Map<string, User>();

  async findById(id: string): Promise<User> {
    if (!this.users.has(id)) {
      throw new Error(`Not found User#${id}`);
    }
    return this.users.get(id)!;
  }

  async create(userDto: CreateUserInput): Promise<User> {
    const user = plainToClass(User, {
      id: random.uuid(),
      ...userDto
    });

    this.users.set(user.id, user);
    return user;
  }
}
