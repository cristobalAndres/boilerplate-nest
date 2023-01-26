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
      .overrideProvider(Logger)
      .useValue(createMock<Logger>())
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

  describe('getSummary of service', () => {
    it('showld called one time', async () => {
      const spyGetSummary = jest.spyOn(service, 'getSummary');
      jest.spyOn(service, 'hasMovements').mockResolvedValue(true);
      await controller.findAll({} as any);
      expect(spyGetSummary).toBeCalledTimes(1);
    });
    it('showld called with correct arguments', async () => {
      const spyGetSummary = jest.spyOn(service, 'getSummary');
      jest.spyOn(service, 'hasMovements').mockResolvedValue(true);
      const requestData = {
        processDate: new Date('2023-01-31'),
        accountId: 'accountId',
      } as RequestOptionsDTO;
      await controller.findAll(requestData);
      expect(spyGetSummary).toBeCalledWith(requestData);
    });
    it('showld not called', async () => {
      const spyGetSummary = jest.spyOn(service, 'getSummary');
      jest.spyOn(service, 'hasMovements').mockResolvedValue(false);
      await controller.findAll({} as any);
      expect(spyGetSummary).toBeCalledTimes(0);
    });
  });
  describe('getLastMovement of service', () => {
    it('showld called one time', async () => {
      const spyGetLastMovement = jest.spyOn(service, 'getLastMovement');
      jest.spyOn(service, 'hasMovements').mockResolvedValue(false);
      await controller.findAll({} as any);
      expect(spyGetLastMovement).toBeCalledTimes(1);
    });
    it('showld called with correct arguments', async () => {
      const spyGetLastMovement = jest.spyOn(service, 'getLastMovement');
      jest.spyOn(service, 'hasMovements').mockResolvedValue(false);
      const requestData = {
        processDate: new Date('2023-01-31'),
        accountId: 'accountId',
      } as RequestOptionsDTO;
      await controller.findAll(requestData);
      expect(spyGetLastMovement).toBeCalledWith(requestData);
    });
    it('showld not called', async () => {
      const spyGetLastMovement = jest.spyOn(service, 'getLastMovement');
      jest.spyOn(service, 'hasMovements').mockResolvedValue(true);
      await controller.findAll({} as any);
      expect(spyGetLastMovement).toBeCalledTimes(0);
    });
  });

  describe('function findAll', () => {
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
      describe('when hasMovements is true', () => {
        it('and getSummary return array with one object', async () => {
          jest.spyOn(service, 'hasMovements').mockResolvedValue(true);
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
        it('and getSummary return array with two object return first', async () => {
          jest.spyOn(service, 'hasMovements').mockResolvedValue(true);
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
        it('and getSummary return object', async () => {
          jest.spyOn(service, 'hasMovements').mockResolvedValue(true);
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
      describe('when hasMovements is false', () => {
        it('and getLastMovement return array with one object', async () => {
          jest.spyOn(service, 'hasMovements').mockResolvedValue(false);
          const requestData = {
            processDate: new Date('2023-01-31'),
            accountId: 'accountId',
          } as RequestOptionsDTO;
          jest.spyOn(service, 'getLastMovement').mockResolvedValue([
            {
              a: 'a',
            },
          ] as any);
          const response = await controller.findAll(requestData);
          expect(response).toEqual({
            a: 'a',
          });
        });
        it('and getLastMovement return array with two object return first', async () => {
          jest.spyOn(service, 'hasMovements').mockResolvedValue(false);
          const requestData = {
            processDate: new Date('2023-01-31'),
            accountId: 'accountId',
          } as RequestOptionsDTO;
          jest.spyOn(service, 'getLastMovement').mockResolvedValue([
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
        it('and getLastMovement return object', async () => {
          jest.spyOn(service, 'hasMovements').mockResolvedValue(false);
          const requestData = {
            processDate: new Date('2023-01-31'),
            accountId: 'accountId',
          } as RequestOptionsDTO;
          jest.spyOn(service, 'getLastMovement').mockResolvedValue({
            a: 'a',
          } as any);
          const response = await controller.findAll(requestData);
          expect(response).toEqual({
            a: 'a',
          });
        });
      });
    });
    describe('showld return error', () => {
      it('when getSummary fail', async () => {
        const errorMessage = 'Error getting summary';
        jest.spyOn(service, 'hasMovements').mockResolvedValue(true);
        jest
          .spyOn(service, 'getSummary')
          .mockRejectedValue(new Error(errorMessage));
        const response = await controller.findAll({} as any).catch((error) => {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toEqual(errorMessage);
        });
        expect(response).toBe(undefined);
      });
      it('when getLastMovement fail', async () => {
        const errorMessage = 'Error getting las movement';
        jest.spyOn(service, 'hasMovements').mockResolvedValue(false);
        jest
          .spyOn(service, 'getLastMovement')
          .mockRejectedValue(new Error(errorMessage));
        const response = await controller.findAll({} as any).catch((error) => {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toEqual(errorMessage);
        });
        expect(response).toBe(undefined);
      });
      it('when getLastMovement fail', async () => {
        const errorMessage = 'Error hasMovements';
        jest
          .spyOn(service, 'hasMovements')
          .mockRejectedValue(new Error(errorMessage));
        const response = await controller.findAll({} as any).catch((error) => {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toEqual(errorMessage);
        });
        expect(response).toBe(undefined);
      });
    });
  });
});
