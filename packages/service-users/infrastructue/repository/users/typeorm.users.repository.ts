import { Repository } from 'typeorm';
import { UserEntity } from '@my-project/service-users/domain/entities/user.entity';
import { CreateUserDto } from '@my-project/service-users/application/dto/create-user.dto';
import { IUsersRepository } from '@my-project/service-users/infrastructue/repository/users/IUsersRepository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeormUsersRepository implements IUsersRepository {
  constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) {}

  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    return this.usersRepository.save(userDto);
  }

  findById(id: string): Promise<UserEntity> {
    return this.usersRepository.findOneOrFail({
      where: {
        id
      }
    });
  }
}
