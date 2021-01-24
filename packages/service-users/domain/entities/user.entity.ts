import { IsEmail, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  // @IsUUID()
  @Expose()
  id: number;

  @Column()
  @IsEmail()
  @Expose()
  email: string;

  @Column()
  @IsString()
  @Expose()
  username: string;
}
