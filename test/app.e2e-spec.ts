import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { SummaryService } from './../src/summary/services/summary.service';
import { createMock } from '@golevelup/ts-jest';
import { SummaryReponseDTO } from './../src/summary/dto/summary-response.dto';

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
    it('should correct request', () => {
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

      jest.spyOn(service, 'getSummary').mockResolvedValue(expectResponse);
      return request(app.getHttpServer())
        .post('/summary')
        .expect(200)
        .send({
          processDate: new Date('2023-01-31'),
          userId: 'userId',
        })
        .expect({
          statusCode: 200,
          data: expectResponse,
        });
    });
    it('should return status code 500', () => {
      const expectErrorText = 'Error getting summary';
      jest
        .spyOn(service, 'getSummary')
        .mockRejectedValue(new Error(expectErrorText));
      return request(app.getHttpServer())
        .post('/summary')
        .expect(500)
        .send({
          processDate: new Date('2023-01-31'),
          userId: 'userId',
        })
        .expect({
          statusCode: 500,
          message: expectErrorText,
          cause: {},
          description: 'Error',
        });
    });
    describe('should return 400 Bad Request', () => {
      it('when processDate is undefined', async () => {
        jest.spyOn(service, 'getSummary');
        return request(app.getHttpServer())
          .post('/summary')
          .expect(400)
          .send({
            userId: 'userId',
          })
          .expect({
            statusCode: 400,
            message: 'Bad Request Exception',
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
            description: 'BadRequestException',
          });
      });
      it('when processDate with wrong value', async () => {
        jest.spyOn(service, 'getSummary');
        return request(app.getHttpServer())
          .post('/summary')
          .expect(400)
          .send({
            processDate: 'gola',
            userId: 'userId',
          })
          .expect({
            statusCode: 400,
            message: 'Bad Request Exception',
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
            description: 'BadRequestException',
          });
      });
      it('when userId is undefined', async () => {
        jest.spyOn(service, 'getSummary');
        return request(app.getHttpServer())
          .post('/summary')
          .expect(400)
          .send({
            processDate: new Date('2023-01-31'),
          })
          .expect({
            statusCode: 400,
            message: 'Bad Request Exception',
            cause: {
              response: {
                statusCode: 400,
                message: [
                  'userId should not be empty',
                  'userId must be a string',
                ],
                error: 'Bad Request',
              },
              status: 400,
              options: {},
              message: 'Bad Request Exception',
              name: 'BadRequestException',
            },
            description: 'BadRequestException',
          });
      });
      it('when userId is empty', async () => {
        jest.spyOn(service, 'getSummary');
        return request(app.getHttpServer())
          .post('/summary')
          .expect(400)
          .send({
            processDate: new Date('2023-01-31'),
            userId: '',
          })
          .expect({
            statusCode: 400,
            message: 'Bad Request Exception',
            cause: {
              response: {
                statusCode: 400,
                message: ['userId should not be empty'],
                error: 'Bad Request',
              },
              status: 400,
              options: {},
              message: 'Bad Request Exception',
              name: 'BadRequestException',
            },
            description: 'BadRequestException',
          });
      });
    });
  });
});
