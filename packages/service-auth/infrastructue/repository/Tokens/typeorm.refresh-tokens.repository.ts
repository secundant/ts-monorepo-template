import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IRefreshTokensRepository } from '@my-project/service-auth/infrastructue/repository/Tokens/IRefreshTokensRepository';
import { RefreshTokenEntity } from '@my-project/service-auth/domain/entities/refresh-token.entity';
import { CreateRefreshTokenDto } from '@my-project/service-auth/application/dto/refresh-token/create-refresh-token.dto';
import { GetRefreshTokenDto } from '@my-project/service-auth/application/dto/refresh-token/get-refresh-token.dto';

@Injectable()
export class TypeormRefreshTokensRepository implements IRefreshTokensRepository {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private refreshTokensRepository: Repository<RefreshTokenEntity>
  ) {}

  create(data: CreateRefreshTokenDto): Promise<RefreshTokenEntity> {
    return this.refreshTokensRepository.save(data);
  }

  getByToken({
    includeAccessToken,
    refreshToken
  }: GetRefreshTokenDto): Promise<RefreshTokenEntity> {
    return this.refreshTokensRepository.findOneOrFail({
      where: {
        value: refreshToken
      },
      relations: includeAccessToken ? ['accessToken'] : void 0
    });
  }

  async deleteByToken(token: string): Promise<void> {
    await this.refreshTokensRepository.delete({
      value: token
    });
  }
}
