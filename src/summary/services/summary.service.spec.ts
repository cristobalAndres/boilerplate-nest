import { createMock } from '@golevelup/ts-jest';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { SummaryService } from './summary.service';

describe('SummaryService', () => {
  let service: SummaryService;
  let datasource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SummaryService, Logger, DataSource],
    })
      .overrideProvider(DataSource)
      .useValue(
        createMock<DataSource>({
          query: jest.fn().mockResolvedValue([{}]),
        }),
      )
      .compile();

    service = module.get<SummaryService>(SummaryService);
    datasource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should getSummary called with correct argument', () => {
    const arg = {
      processDate: new Date('2023-01-31'),
      accountId: 'accountId',
    };
    const spyGetSummary = jest.spyOn(service, 'getSummary');
    service.getSummary(arg);
    expect(spyGetSummary).toBeCalledWith(arg);
  });

  it('should query datasource called', async () => {
    const arg = {
      processDate: new Date('2023-01-31'),
      accountId: 'accountId',
    };
    const spyQuery = jest.spyOn(datasource, 'query');
    await service.getSummary(arg);
    expect(spyQuery).toBeCalledTimes(1);
  });
});
