import { CreateAccessTokenDto } from '@my-project/service-auth/application/dto/access-token/create-access-token.dto';
import { AccessTokenEntity } from '@my-project/service-auth/domain/entities/access-token.entity';

export interface IAccessTokensRepository {
  create(data: CreateAccessTokenDto): Promise<AccessTokenEntity>;
  getByToken(value: string): Promise<AccessTokenEntity>;
  deleteByToken(value: string): Promise<void>;
}
