import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Environment } from './environment';

@Injectable()
export class EnvironmentService {
  constructor(
    private readonly configService: ConfigService<Environment, true>,
  ) {}

  getEnvironmentValue<Key extends keyof Environment>(
    key: Key,
  ): Environment[Key] {
    return this.configService.getOrThrow(key);
  }

  get isSwaggerEnabled(): boolean {
    return this.configService.getOrThrow('ENABLE_SWAGGER');
  }

  get isProd(): boolean {
    return this.configService.getOrThrow('NODE_ENV') === 'production';
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.getEnvironmentValue('DB_HOST'),
      port: this.getEnvironmentValue('DB_PORT'),
      username: this.getEnvironmentValue('DB_USER'),
      password: this.getEnvironmentValue('DB_PASSWORD'),
      database: this.getEnvironmentValue('DB_NAME'),
      entities: [],
      migrations: [],
      synchronize: !this.isProd, //!!shouldn't be used in production - otherwise you can lose production data.
      ssl: this.isProd,
    };
  }
}
