import { UserService } from '@my-project/graphql/domain/services/user.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@my-project/graphql/domain/entities/User';
import { CreateUserInput } from '@my-project/graphql/application/dto/inputs/create-user.input';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver(User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, {
    name: 'user'
  })
  getById(@Args('id') id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @Mutation(() => User, {
    name: 'createUser'
  })
  @UsePipes(ValidationPipe)
  create(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.create(input);
  }
}
