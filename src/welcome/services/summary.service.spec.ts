import { createMock } from '@golevelup/ts-jest';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { SummaryService } from './welcome.service';

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

  describe('getSummary function', () => {
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

  describe('hasMovements function', () => {
    it('should called with correct argument', () => {
      const arg = {
        processDate: new Date('2023-01-31'),
        accountId: 'accountId',
      };
      const spyHasMovements = jest.spyOn(service, 'hasMovements');
      service.hasMovements(arg);
      expect(spyHasMovements).toBeCalledWith(arg);
    });

    it('should query datasource called', async () => {
      const arg = {
        processDate: new Date('2023-01-31'),
        accountId: 'accountId',
      };
      const spyQuery = jest.spyOn(datasource, 'query');
      await service.hasMovements(arg);
      expect(spyQuery).toBeCalledTimes(1);
    });

    it('should return false when movements is 0', async () => {
      const arg = {
        processDate: new Date('2023-01-31'),
        accountId: 'accountId',
      };
      jest.spyOn(datasource, 'query').mockResolvedValue([
        {
          movements: '0',
        },
      ]);
      const hasMovements = await service.hasMovements(arg);
      expect(hasMovements).toEqual(false);
    });

    it('should return false when movements is over 0', async () => {
      const arg = {
        processDate: new Date('2023-01-31'),
        accountId: 'accountId',
      };
      jest.spyOn(datasource, 'query').mockResolvedValue([
        {
          movements: '1',
        },
      ]);
      const hasMovements = await service.hasMovements(arg);
      expect(hasMovements).toEqual(true);
    });
  });

  describe('getLastMovement function', () => {
    it('should getLastMovement called with correct argument', () => {
      const arg = {
        processDate: new Date('2023-01-31'),
        accountId: 'accountId',
      };
      const spyGetLastMovement = jest.spyOn(service, 'getLastMovement');
      service.getLastMovement(arg);
      expect(spyGetLastMovement).toBeCalledWith(arg);
    });

    it('should query datasource called', async () => {
      const arg = {
        processDate: new Date('2023-01-31'),
        accountId: 'accountId',
      };
      const spyQuery = jest.spyOn(datasource, 'query');
      await service.getLastMovement(arg);
      expect(spyQuery).toBeCalledTimes(1);
    });
  });
});
