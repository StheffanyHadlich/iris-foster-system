import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: Partial<Record<keyof UsersService, jest.Mock>>;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('fake-jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should validate user with correct password', async () => {
    const password = await bcrypt.hash('123456', 10);
    usersService.findByEmail!.mockResolvedValue({
      id: 1,
      email: 'test@test.com',
      username: 'tester',
      password,
    });

    const result = await authService.validateUser('test@test.com', '123456');
    expect(result).toHaveProperty('id');
    expect(result).not.toHaveProperty('password');
  });

  it('should return null for invalid password', async () => {
    usersService.findByEmail!.mockResolvedValue({
      id: 1,
      email: 'test@test.com',
      username: 'tester',
      password: await bcrypt.hash('123456', 10),
    });

    const result = await authService.validateUser('test@test.com', 'wrong');
    expect(result).toBeNull();
  });

  it('should register user and return jwt token', async () => {
    usersService.create!.mockResolvedValue({
      id: 1,
      email: 'new@test.com',
      username: 'newuser',
    });

    const result = await authService.register({
      username: 'newuser',
      email: 'new@test.com',
      password: '123456',
    });

    expect(result).toHaveProperty('access_token');
    expect(result.access_token).toBe('fake-jwt-token');
  });
});
