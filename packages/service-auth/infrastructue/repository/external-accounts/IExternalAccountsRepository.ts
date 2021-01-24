import { GetExternalAccountDto } from '@my-project/service-auth/application/dto/external-account/get-external-account.dto';
import { CreateExternalAccountDto } from '@my-project/service-auth/application/dto/external-account/create-external-account.dto';
import { ExternalAccountEntity } from '@my-project/service-auth/domain/entities/external-account.entity';

export interface IExternalAccountsRepository {
  tryGet(data: GetExternalAccountDto): Promise<ExternalAccountEntity | null>;
  create(data: CreateExternalAccountDto): Promise<ExternalAccountEntity>;
}
