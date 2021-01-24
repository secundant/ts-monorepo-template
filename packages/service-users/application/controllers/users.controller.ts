import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CREATE_USER_COMMAND, GET_USER_BY_ID } from '@my-project/service-users/constants/commands';
import { CreateUserDto } from '@my-project/service-users/application/dto/create-user.dto';
import { UsersService } from '@my-project/service-users/domain/services/users.service';
import { UserEntity } from '@my-project/service-users/domain/entities/user.entity';

@Controller()
@UsePipes(ValidationPipe)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @MessagePattern({ cmd: CREATE_USER_COMMAND })
  createUser(userDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(userDto);
  }

  @MessagePattern({ cmd: GET_USER_BY_ID })
  getUserById(id: string): Promise<UserEntity> {
    return this.usersService.getById(id);
  }
}
