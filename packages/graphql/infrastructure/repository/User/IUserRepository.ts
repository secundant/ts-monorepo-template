import { User } from '@app/graphql/domain/entities/User';
import { CreateUserInput } from '@app/graphql/application/dto/inputs/create-user.input';

export interface IUserRepository {
  create(user: CreateUserInput): Promise<User>;
  findById(id: string): Promise<User>;
}
