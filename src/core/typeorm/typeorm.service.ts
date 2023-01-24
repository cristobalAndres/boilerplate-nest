import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { EnvironmentService } from '@core/environment/environment.service';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  constructor(private readonly enviromentSrvc: EnvironmentService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const options: TypeOrmModuleOptions =
      this.enviromentSrvc.getTypeOrmConfig();
    return options;
  }
}
