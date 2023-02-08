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
      socketPath: this.isProd
        ? this.getEnvironmentValue('DB_SOCKET_PATH')
        : null,
      type: 'mysql',
      port: this.getEnvironmentValue('DB_PORT'),
      host: this.isProd ? null : this.getEnvironmentValue('DB_HOST'),
      username: this.getEnvironmentValue('DB_USER'),
      password: this.getEnvironmentValue('DB_PASSWORD'),
      database: this.getEnvironmentValue('DB_NAME'),
      entities: [],
      migrations: [],
      synchronize: !this.isProd, //!!shouldn't be used in production - otherwise you can lose production data.
    };
  }
}
