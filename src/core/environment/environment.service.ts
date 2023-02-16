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
    return JSON.parse(this.configService.getOrThrow('WELCOME_ENVS'))[key];
  }

  get isSwaggerEnabled(): boolean {
    return JSON.parse(this.configService.getOrThrow('WELCOME_ENVS'));
  }

  get isProd(): boolean {
    return (
      JSON.parse(this.configService.getOrThrow('WELCOME_ENVS')).NODE_ENV ===
      'production'
    );
  }

  get passwordDatabase(): string {
    return this.configService.getOrThrow('PASSWORD_BD');
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
