import { IsEmail, IsString, IsUUID } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class User {
  @Field()
  @IsUUID()
  @Expose()
  id: string;

  @Field()
  @IsEmail()
  @Expose()
  email: string;

  @Field()
  @IsString()
  @Expose()
  username: string;
}
