import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExternalAccountEntity } from '@my-project/service-auth/domain/entities/external-account.entity';
import { Repository } from 'typeorm';
import { IExternalAccountsRepository } from '@my-project/service-auth/infrastructue/repository/external-accounts/IExternalAccountsRepository';
import { CreateExternalAccountDto } from '@my-project/service-auth/application/dto/external-account/create-external-account.dto';
import { GetExternalAccountDto } from '@my-project/service-auth/application/dto/external-account/get-external-account.dto';

@Injectable()
export class TypeormExternalAccountsRepository implements IExternalAccountsRepository {
  constructor(
    @InjectRepository(ExternalAccountEntity)
    private externalAccountsRepository: Repository<ExternalAccountEntity>
  ) {}

  create({
    userId,
    externalUserId,
    externalSystemName,
    profile
  }: CreateExternalAccountDto): Promise<ExternalAccountEntity> {
    return this.externalAccountsRepository.save({
      userId,
      externalUserId,
      externalProfile: profile,
      externalSystemName
    });
  }

  async tryGet(data: GetExternalAccountDto): Promise<ExternalAccountEntity | null> {
    const externalAccount = await this.externalAccountsRepository.findOne({
      where: data
    });

    return externalAccount ?? null;
  }
}
