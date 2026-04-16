import { UsersService } from '@/users/users.service';
import { UsersRepository } from '@/users/repository/users.repository';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';

const mockUser = {
  id: 'user-1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'user',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockRepository: jest.Mocked<UsersRepository> = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
} as unknown as jest.Mocked<UsersRepository>;

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UsersService(mockRepository);
  });

  describe('findAll', () => {
    it('delegates to repository.findAll', async () => {
      mockRepository.findAll.mockResolvedValue([mockUser]);

      const result = await service.findAll();

      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('delegates to repository.findOne with the given id', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOne('user-1');

      expect(mockRepository.findOne).toHaveBeenCalledWith('user-1');
      expect(result).toEqual(mockUser);
    });

    it('propagates errors from repository', async () => {
      mockRepository.findOne.mockRejectedValue(new Error('Not found'));

      await expect(service.findOne('bad-id')).rejects.toThrow('Not found');
    });
  });

  describe('create', () => {
    it('delegates to repository.create with the given DTO', async () => {
      const dto: CreateUserDto = { email: 'new@example.com' };
      mockRepository.create.mockResolvedValue({
        id: 'user-2',
        ...dto,
        name: null,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(result.email).toBe('new@example.com');
    });
  });

  describe('update', () => {
    it('delegates to repository.update with id and DTO', async () => {
      const dto: UpdateUserDto = { name: 'Updated' };
      mockRepository.update.mockResolvedValue({ ...mockUser, name: 'Updated' });

      const result = await service.update('user-1', dto);

      expect(mockRepository.update).toHaveBeenCalledWith('user-1', dto);
      expect(result.name).toBe('Updated');
    });
  });
});
