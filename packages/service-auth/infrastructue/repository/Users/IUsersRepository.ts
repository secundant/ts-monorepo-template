import { CreateUserDto } from '@my-project/service-users/application/dto/create-user.dto';
import { UserEntity } from '@my-project/service-users/domain/entities/user.entity';

export interface IUsersRepository {
  create(user: CreateUserDto): Promise<UserEntity>;
  findById(id: number): Promise<UserEntity>;
}
