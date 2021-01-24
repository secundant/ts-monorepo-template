import Joi from '@hapi/joi';
import { DatabaseEnvSchema } from '@my-project/service-shared/infrastructure/configuration/database/database.env.schema';

export const AuthConfigurationSchema = Joi.object({
  SERVICE_USERS_HOST: Joi.string(),
  SERVICE_USERS_PORT: Joi.number().port(),

  JWT_ACCESS_TOKEN_SECRET: Joi.string(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string(),

  JWT_REFRESH_TOKEN_SECRET: Joi.string(),
  JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string(),

  AUTH_STRATEGY_GOOGLE_SECRET: Joi.string(),
  AUTH_STRATEGY_GOOGLE_CLIENT_ID: Joi.string(),
  AUTH_STRATEGY_GOOGLE_CALLBACK_URL: Joi.string()
})
  .append(DatabaseEnvSchema)
  .options({
    allowUnknown: true,
    presence: 'required',
    convert: true
  });
