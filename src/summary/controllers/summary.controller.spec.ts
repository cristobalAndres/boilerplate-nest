import { createMock } from '@golevelup/ts-jest';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RequestOptionsDTO } from '../dto/request-options.dto';
import { SummaryService } from '../services/summary.service';
import { SummaryController } from './summary.controller';

describe('SummaryController', () => {
  let controller: SummaryController;
  let service: SummaryService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummaryController],
      providers: [SummaryService, Logger],
    })
      .overrideProvider(SummaryService)
      .useValue(createMock<SummaryService>())
      .compile();

    controller = module.get<SummaryController>(SummaryController);
    service = module.get<SummaryService>(SummaryService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('SummaryService getSummary', () => {
    it('showld called one time', () => {
      const spyGetSummary = jest.spyOn(service, 'getSummary');
      controller.findAll({} as any);
      expect(spyGetSummary).toBeCalledTimes(1);
    });
    it('showld called with correct arguments', () => {
      const requestData = {
        processDate: new Date('2023-01-31'),
        accountId: 'accountId',
      } as RequestOptionsDTO;
      const spyGetSummary = jest.spyOn(service, 'getSummary');
      controller.findAll(requestData);
      expect(spyGetSummary).toBeCalledWith(requestData);
    });
  });

  describe('SummaryController findAll', () => {
    it('showld called with correct arguments', () => {
      const requestData = {
        processDate: new Date('2023-01-31'),
        accountId: 'accountId',
      } as RequestOptionsDTO;
      const spyFindAll = jest.spyOn(controller, 'findAll');
      controller.findAll(requestData);
      expect(spyFindAll).toBeCalledWith(requestData);
    });
    describe('showld return object result', () => {
      it('when getSummary return array with one object', async () => {
        const requestData = {
          processDate: new Date('2023-01-31'),
          accountId: 'accountId',
        } as RequestOptionsDTO;
        jest.spyOn(service, 'getSummary').mockResolvedValue([
          {
            a: 'a',
          },
        ] as any);
        const response = await controller.findAll(requestData);
        expect(response).toEqual({
          a: 'a',
        });
      });
      it('when getSummary return array with two object return first', async () => {
        const requestData = {
          processDate: new Date('2023-01-31'),
          accountId: 'accountId',
        } as RequestOptionsDTO;
        jest.spyOn(service, 'getSummary').mockResolvedValue([
          {
            a: 'a',
          },
          {
            b: 'b',
          },
        ] as any);
        const response = await controller.findAll(requestData);
        expect(response).toEqual({
          a: 'a',
        });
      });
      it('when getSummary return object', async () => {
        const requestData = {
          processDate: new Date('2023-01-31'),
          accountId: 'accountId',
        } as RequestOptionsDTO;
        jest.spyOn(service, 'getSummary').mockResolvedValue({
          a: 'a',
        } as any);
        const response = await controller.findAll(requestData);
        expect(response).toEqual({
          a: 'a',
        });
      });
    });
    it('showld return error', async () => {
      const errorMessage = 'Error getting summary';
      jest
        .spyOn(service, 'getSummary')
        .mockRejectedValue(new Error(errorMessage));
      const response = await controller.findAll({} as any).catch((error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(errorMessage);
      });
      expect(response).toBe(undefined);
    });
  });
});
