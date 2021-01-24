import { IDatabaseConfiguration } from '@my-project/service-shared/infrastructure/configuration/database/IDatabaseConfiguration';
import { IMicroserviceConfiguration } from '@my-project/service-shared/infrastructure/configuration/microservices/IMicroserviceConfiguration';

export interface IConfiguration {
  jwt: JWTConfiguration;
  database: IDatabaseConfiguration;
  microservices: MicroservicesConfiguration;
  authStrategies: AuthStrategiesConfiguration;
}

export interface MicroservicesConfiguration {
  users: IMicroserviceConfiguration;
}

export interface JWTConfiguration {
  accessToken: {
    secret: string;
    expiresIn: string;
  };
  refreshToken: {
    secret: string;
    expiresIn: string;
  };
}

export interface AuthStrategiesConfiguration {
  google: GoogleAuthStrategyConfiguration;
}

export interface GoogleAuthStrategyConfiguration {
  callbackUrl: string;
  clientId: string;
  secret: string;
}
