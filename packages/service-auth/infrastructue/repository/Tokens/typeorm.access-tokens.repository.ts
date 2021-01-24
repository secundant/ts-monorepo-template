import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AccessTokenEntity } from '@my-project/service-auth/domain/entities/access-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IAccessTokensRepository } from '@my-project/service-auth/infrastructue/repository/Tokens/IAccessTokensRepository';
import { CreateAccessTokenDto } from '@my-project/service-auth/application/dto/access-token/create-access-token.dto';

@Injectable()
export class TypeormAccessTokensRepository implements IAccessTokensRepository {
  constructor(
    @InjectRepository(AccessTokenEntity)
    private accessTokensRepository: Repository<AccessTokenEntity>
  ) {}

  create(data: CreateAccessTokenDto): Promise<AccessTokenEntity> {
    return this.accessTokensRepository.save(data);
  }

  getByToken(value: string): Promise<AccessTokenEntity> {
    return this.accessTokensRepository.findOneOrFail({
      where: {
        value
      }
    });
  }

  async deleteByToken(value: string): Promise<void> {
    const { affected } = await this.accessTokensRepository.delete({
      value
    });

    if (affected !== 1) {
      // TODO Add Exception to incorrect deletion call
    }
  }
}
