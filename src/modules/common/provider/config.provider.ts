import * as Joi from '@hapi/joi';
import * as _ from 'lodash';
import { Service } from '../../tokens';
import { Config } from '../model';

export const configProvider = {
  provide: Service.CONFIG,
  useFactory: (): Config => {
    const env = process.env;

    const validationSchema = Joi.object().unknown().keys({
      API_PORT: Joi.string().required(),
      API_PREFIX: Joi.string().required(),
      SWAGGER_ENABLE: Joi.string().required(),
      DATABASE_ENTITIES: Joi.string().required(),
      DATABASE_TYPE: Joi.string().required(),
      DATABASE_NAME: Joi.string().required(),
      DATABASE_SYNCHRONIZE: Joi.string().required()
    });

    const result = validationSchema.validate(env);

    if (result.error) {
      throw new Error(`Configuration not valid: ${result.error.message}`);
    }

    return {
      API_PORT: _.toNumber(env.API_PORT),
      API_PREFIX: `${env.API_PREFIX}`,
      SWAGGER_ENABLE: _.toNumber(env.SWAGGER_ENABLE),
      DATABASE_ENTITIES: `${env.DATABASE_ENTITIES}`,
      DATABASE_TYPE: `${env.DATABASE_TYPE}`,
      DATABASE_NAME: `${env.DATABASE_NAME}`,
      DATABASE_SYNCHRONIZE: env.DATABASE_SYNCHRONIZE === 'true'
    };
  }
};
