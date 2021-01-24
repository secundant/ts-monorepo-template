import { registerAs } from '@nestjs/config';

export const MicroservicesConfigurationLoader = registerAs('microservices', () => ({
  users: {
    host: process.env.SERVICE_USERS_HOST,
    port: process.env.SERVICE_USERS_PORT
  }
}));
