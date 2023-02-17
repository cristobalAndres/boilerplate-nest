import { AccessRepository } from './access.repository';
import { Repository } from 'typeorm';
import { Access } from '../../../core/entities/access/access.entity';

describe('AccessRepository', () => {
  let accessRepository: AccessRepository;
  let usersRepository: Repository<Access>;

  beforeEach(async () => {
    usersRepository = {
      find: jest.fn(),
    } as unknown as Repository<Access>;

    accessRepository = new AccessRepository(usersRepository);
  });

  describe('findAll', () => {
    it('should return an array of access', async () => {
      const mockAccess: Access[] = [
        {
          id: 1,
          createdAt: new Date('2023-02-17T12:00:00Z'),
          updatedAt: new Date('2023-02-17T12:00:00Z'),
          userId: '',
        },
        {
          id: 2,
          createdAt: new Date('2023-02-17T12:00:00Z'),
          updatedAt: new Date('2023-02-17T12:00:00Z'),
          userId: '',
        },
      ];

      (usersRepository.find as jest.Mock).mockReturnValue(mockAccess);

      const result = await accessRepository.findAll();

      expect(result).toEqual(mockAccess);
      expect(usersRepository.find).toHaveBeenCalledTimes(1);
    });
  });
});
