import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  public email: string;

  @Field()
  @IsString()
  @Matches(/[a-z_]/)
  public username: string;

  @Field()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  public password: string;
}
