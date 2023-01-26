import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { SummaryService } from '@app/services/summary.service';
import { createMock } from '@golevelup/ts-jest';
import { SummaryReponseDTO } from '@app/dto/summary-response.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let service: SummaryService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [SummaryService, Logger],
    })
      .overrideProvider(SummaryService)
      .useValue(createMock<SummaryService>())
      .compile();

    app = moduleFixture.createNestApplication();
    service = app.get<SummaryService>(SummaryService);
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/summary (POST)', () => {
    describe('should correct request', () => {
      it('when account has movements', () => {
        const expectResponse = {
          id: 'id',
          category: 'category',
          nationalId: 'nationalId',
          ownerType: 'ownerType',
          firstBalance: 0,
          lastBalance: 0,
          totalDeposits: 0,
          totalWithdraws: 0,
          totalPayments: 0,
          totalRefunds: 0,
        } as SummaryReponseDTO;
        jest.spyOn(service, 'hasMovements').mockResolvedValue(true);
        jest.spyOn(service, 'getSummary').mockResolvedValue(expectResponse);
        return request(app.getHttpServer())
          .post('/summary')
          .expect(200)
          .send({
            processDate: new Date('2023-01-31'),
            accountId: 'accountId',
          })
          .expect({
            statusCode: 200,
            data: expectResponse,
          });
      });
      it('when account hasnt movements', () => {
        const expectResponse = {
          id: 'id',
          category: 'category',
          nationalId: 'nationalId',
          ownerType: 'ownerType',
          firstBalance: 0,
          lastBalance: 0,
          totalDeposits: 0,
          totalWithdraws: 0,
          totalPayments: 0,
          totalRefunds: 0,
        } as SummaryReponseDTO;
        jest.spyOn(service, 'hasMovements').mockResolvedValue(false);
        jest
          .spyOn(service, 'getLastMovement')
          .mockResolvedValue(expectResponse);
        return request(app.getHttpServer())
          .post('/summary')
          .expect(200)
          .send({
            processDate: new Date('2023-01-31'),
            accountId: 'accountId',
          })
          .expect({
            statusCode: 200,
            data: expectResponse,
          });
      });
    });
    describe('should return status code 500', () => {
      it('when getSummary fail', () => {
        const expectErrorText = 'Error getting summary';
        jest.spyOn(service, 'hasMovements').mockResolvedValue(true);
        jest
          .spyOn(service, 'getSummary')
          .mockRejectedValue(new Error(expectErrorText));
        return request(app.getHttpServer())
          .post('/summary')
          .expect(500)
          .send({
            processDate: new Date('2023-01-31'),
            accountId: 'accountId',
          })
          .expect({
            statusCode: 500,
            path: '/summary',
            message: expectErrorText,
            description: 'HttpException',
            cause: {},
          });
      });
      it('when getLastMovement fail', () => {
        const expectErrorText = 'Error getting last movement';
        jest.spyOn(service, 'hasMovements').mockResolvedValue(false);
        jest
          .spyOn(service, 'getLastMovement')
          .mockRejectedValue(new Error(expectErrorText));
        return request(app.getHttpServer())
          .post('/summary')
          .expect(500)
          .send({
            processDate: new Date('2023-01-31'),
            accountId: 'accountId',
          })
          .expect({
            statusCode: 500,
            path: '/summary',
            message: expectErrorText,
            description: 'HttpException',
            cause: {},
          });
      });
      it('when hasMovements fail', () => {
        const expectErrorText = 'Error getting has movements';
        jest
          .spyOn(service, 'hasMovements')
          .mockRejectedValue(new Error(expectErrorText));
        return request(app.getHttpServer())
          .post('/summary')
          .expect(500)
          .send({
            processDate: new Date('2023-01-31'),
            accountId: 'accountId',
          })
          .expect({
            statusCode: 500,
            path: '/summary',
            message: expectErrorText,
            description: 'HttpException',
            cause: {},
          });
      });
    });
    describe('should return 400 Bad Request', () => {
      it('when processDate is undefined', async () => {
        jest.spyOn(service, 'getSummary');
        return request(app.getHttpServer())
          .post('/summary')
          .expect(400)
          .send({
            accountId: 'accountId',
          })
          .expect({
            statusCode: 400,
            path: '/summary',
            message: 'Bad Request Exception',
            description: 'BadRequestException',
            cause: {
              response: {
                statusCode: 400,
                message: [
                  'processDate should not be empty',
                  'processDate must be a valid ISO 8601 date string',
                ],
                error: 'Bad Request',
              },
              status: 400,
              options: {},
              message: 'Bad Request Exception',
              name: 'BadRequestException',
            },
          });
      });
      it('when processDate with wrong value', async () => {
        jest.spyOn(service, 'getSummary');
        return request(app.getHttpServer())
          .post('/summary')
          .expect(400)
          .send({
            processDate: 'gola',
            accountId: 'accountId',
          })
          .expect({
            statusCode: 400,
            path: '/summary',
            message: 'Bad Request Exception',
            description: 'BadRequestException',
            cause: {
              response: {
                statusCode: 400,
                message: ['processDate must be a valid ISO 8601 date string'],
                error: 'Bad Request',
              },
              status: 400,
              options: {},
              message: 'Bad Request Exception',
              name: 'BadRequestException',
            },
          });
      });
      it('when accountId is undefined', async () => {
        jest.spyOn(service, 'getSummary');
        return request(app.getHttpServer())
          .post('/summary')
          .expect(400)
          .send({
            processDate: new Date('2023-01-31'),
          })
          .expect({
            statusCode: 400,
            path: '/summary',
            message: 'Bad Request Exception',
            description: 'BadRequestException',
            cause: {
              response: {
                statusCode: 400,
                message: [
                  'accountId should not be empty',
                  'accountId must be a string',
                ],
                error: 'Bad Request',
              },
              status: 400,
              options: {},
              message: 'Bad Request Exception',
              name: 'BadRequestException',
            },
          });
      });
      it('when accountId is empty', async () => {
        jest.spyOn(service, 'getSummary');
        return request(app.getHttpServer())
          .post('/summary')
          .expect(400)
          .send({
            processDate: new Date('2023-01-31'),
            accountId: '',
          })
          .expect({
            statusCode: 400,
            path: '/summary',
            message: 'Bad Request Exception',
            description: 'BadRequestException',
            cause: {
              response: {
                statusCode: 400,
                message: ['accountId should not be empty'],
                error: 'Bad Request',
              },
              status: 400,
              options: {},
              message: 'Bad Request Exception',
              name: 'BadRequestException',
            },
          });
      });
    });
  });
});
