import { CreateUserDto } from '@my-project/service-users/application/dto/create-user.dto';
import { UserEntity } from '@my-project/service-users/domain/entities/user.entity';

export interface IUsersRepository {
  createUser(user: CreateUserDto): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity>;
}
