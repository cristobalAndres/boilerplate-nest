import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Environment } from './environment';
import { Access } from '../../core/entities/access/access.entity';

@Injectable()
export class EnvironmentService {
  constructor(
    private readonly configService: ConfigService<Environment, true>,
  ) {}

  getEnvironmentValue<Key extends keyof Environment>(
    key: Key,
  ): Environment[Key] {
    if (this.isProd) {
      return this.formatEnvs('WELCOME_ENVS')[key];
    }
    return this.configService.getOrThrow(key);
  }

  get isSwaggerEnabled(): boolean {
    if (this.isProd) {
      return this.formatEnvs('WELCOME_ENVS').ENABLE_SWAGGER;
    }
    return this.configService.getOrThrow('ENABLE_SWAGGER');
  }

  get isProd(): boolean {
    if (
      this.configService.getOrThrow('WELCOME_ENVS') &&
      this.formatEnvs('WELCOME_ENVS').NODE_ENV === 'production'
    ) {
      return true;
    } else if (this.configService.getOrThrow('NODE_ENV') === 'production') {
      return true;
    }
    return false;
  }

  get passwordDatabase(): string {
    return this.configService.getOrThrow('PASSWORD_BD');
  }

  formatEnvs<Key extends keyof Environment>(key: Key) {
    return Object.fromEntries(
      this.configService
        .getOrThrow(key)
        .split('\n')
        .map((pair) => pair.split('='))
        .map(([key, value]) => [key, value]),
    );
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
      password: this.passwordDatabase,
      database: this.getEnvironmentValue('DB_NAME'),
      entities: [Access],
      // migrations: [],
      // synchronize: !this.isProd, //!!shouldn't be used in production - otherwise you can lose production data.
    };
  }
}
