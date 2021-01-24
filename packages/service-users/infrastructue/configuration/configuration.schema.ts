import Joi from '@hapi/joi';
import { DatabaseEnvSchema } from '@my-project/service-shared/infrastructure/configuration/database/database.env.schema';

export const ConfigurationSchema = Joi.object({
  database: DatabaseEnvSchema
});
