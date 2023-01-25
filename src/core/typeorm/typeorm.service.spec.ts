import { EnvironmentService } from '@core/environment';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeormService } from './typeorm.service';

describe('TypeormService', () => {
  let service: TypeormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeormService, EnvironmentService, ConfigService],
    }).compile();

    service = module.get<TypeormService>(TypeormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should getTypeOrmConfig called one time', () => {
    const spyGetTypeOrmConfig = jest.spyOn(
      EnvironmentService.prototype,
      'getTypeOrmConfig',
    );
    service.createTypeOrmOptions();
    expect(spyGetTypeOrmConfig).toBeCalledTimes(1);
  });
});
