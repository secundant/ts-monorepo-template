import { registerAs } from '@nestjs/config';

export const DatabaseConfigurationLoader = registerAs('database', () => ({
  type: process.env.DATABASE_TYPE,
  name: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  ssl: process.env.DATABASE_SSL
}));
