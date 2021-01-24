import Joi from '@hapi/joi';

export const DatabaseEnvSchema = {
  DATABASE_TYPE: Joi.alternatives([Joi.equal('postgres')]),
  DATABASE_NAME: Joi.string().optional(),
  DATABASE_HOST: Joi.string(),
  DATABASE_PORT: Joi.number().port().options({
    convert: true
  }),
  DATABASE_USERNAME: Joi.string(),
  DATABASE_PASSWORD: Joi.string(),
  DATABASE_DATABASE: Joi.string().optional(),
  DATABASE_SSL: Joi.bool().optional()
};
