import { TokensPairDto } from '@my-project/service-auth/application/dto/tokens-pair.dto';
import { UserEntity } from '@my-project/service-users/domain/entities/user.entity';

export class SessionDto extends TokensPairDto {
  user: UserEntity;
}
