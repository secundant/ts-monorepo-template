import { User } from '@my-project/graphql/domain/entities/User';
import { CreateUserInput } from '@my-project/graphql/application/dto/inputs/create-user.input';

export interface IUserRepository {
  create(user: CreateUserInput): Promise<User>;
  findById(id: string): Promise<User>;
}
