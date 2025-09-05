import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: Partial<Record<keyof AuthService, jest.Mock>>;

  beforeEach(async () => {
    authService = {
      login: jest.fn(),
      register: jest.fn(),
      validateUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should login successfully', async () => {
    authService.validateUser!.mockResolvedValue({ id: 1, username: 'test', email: 'test@test.com' });
    authService.login!.mockReturnValue({ access_token: 'jwt-token' });

    const result = await controller.login({ email: 'test@test.com', password: '123456' });
    expect(result).toEqual({ access_token: 'jwt-token' });
  });

  it('should throw error if login fails', async () => {
    authService.validateUser!.mockResolvedValue(null);

    await expect(
      controller.login({ email: 'wrong@test.com', password: 'wrong' }),
    ).rejects.toThrow('Invalid Credentials');
  });

  it('should register user and return jwt token', async () => {
    authService.register!.mockResolvedValue({ access_token: 'jwt-token' });

    const result = await controller.register({
      username: 'newuser',
      email: 'new@test.com',
      password: '123456',
    });

    expect(result).toEqual({ access_token: 'jwt-token' });
  });
});
