import { RefreshTokenEntity } from '@my-project/service-auth/domain/entities/refresh-token.entity';
import { CreateRefreshTokenDto } from '@my-project/service-auth/application/dto/refresh-token/create-refresh-token.dto';
import { GetRefreshTokenDto } from '@my-project/service-auth/application/dto/refresh-token/get-refresh-token.dto';

export interface IRefreshTokensRepository {
  create(data: CreateRefreshTokenDto): Promise<RefreshTokenEntity>;
  getByToken(options: GetRefreshTokenDto): Promise<RefreshTokenEntity>;
  deleteByToken(id: string): Promise<void>;
}
