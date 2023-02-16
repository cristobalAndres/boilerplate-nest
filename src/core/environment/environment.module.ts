import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { Environment } from './environment';
import { EnvironmentService } from './environment.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: Joi.object<Environment, true>({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(8080),
        ENABLE_SWAGGER: Joi.boolean().default(true),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(3306),
        DB_USER: Joi.string().default('root'),
        DB_PASSWORD: Joi.string(),
        DB_NAME: Joi.string(),
        DB_SOCKET_PATH: Joi.string(),
        WELCOME_ENVS: Joi.string().default('root'),
        PASSWORD_BD: Joi.string().default('root'),
        // WELCOME_ENVS: Joi.object().keys({
        //     NODE_ENV: Joi.string()
        //     .valid('development', 'production', 'test')
        //     .default('development'),
        //   PORT: Joi.number().default(8080),
        //   ENABLE_SWAGGER: Joi.boolean().default(true),
        //   DB_HOST: Joi.string().default('localhost'),
        //   DB_PORT: Joi.number().default(3306),
        //   DB_USER: Joi.string().default('root'),
        //   DB_PASSWORD: Joi.string(),
        //   DB_NAME: Joi.string(),
        //   DB_SOCKET_PATH: Joi.string(),
        //   }),
      }),
    }),
  ],
  providers: [EnvironmentService, ConfigService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
