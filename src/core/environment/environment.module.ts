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
        DB_HOST: Joi.string().default(''),
        DB_PORT: Joi.number().default(1234),
        DB_USER: Joi.string().default(''),
        DB_PASSWORD: Joi.string(),
        DB_NAME: Joi.string(),
        DB_SOCKET_PATH: Joi.string(),
        WELCOME_ENVS: Joi.string().default(''),
        PASSWORD_BD: Joi.string().default(''),
        FIREBASE_CREDENTIALS: Joi.string().default(''),
        REDISHOST: Joi.string().default(''),
        REDISPORT: Joi.number().default(1234),
        REDISAUTH: Joi.string().default(''),
      }),
    }),
  ],
  providers: [EnvironmentService, ConfigService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
