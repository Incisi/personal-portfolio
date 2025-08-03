import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../journey/entities/user.entity';
import * as bcrypt from 'bcrypt';

const mockUserRepository = {
  findOneBy: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            AuthService,
            {
                provide: getRepositoryToken(User),
                useValue: mockUserRepository,
            },
            {
                provide: JwtService,
                useValue: mockJwtService,
            },
        ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('validateUser', () => {
        it('should return the user object (without password) if validation is successful', async () => {
            const password = 'password123';
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = { id: 'some-id', username: 'test', password: hashedPassword };

            mockUserRepository.findOneBy.mockResolvedValue(user);

            const result = await service.validateUser('test', password);
            expect(result).toEqual({ id: 'some-id', username: 'test' });
            expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ username: 'test' });
        });

        it('should return null if passwords do not match', async () => {
            const hashedPassword = await bcrypt.hash('password123', 10);
            const user = { id: 'some-id', username: 'test', password: hashedPassword };
            
            mockUserRepository.findOneBy.mockResolvedValue(user);

            const result = await service.validateUser('test', 'wrongpassword');
            expect(result).toBeNull();
        });

        it('should return null if user is not found', async () => {
            mockUserRepository.findOneBy.mockResolvedValue(null);
            const result = await service.validateUser('not-a-user', 'anypassword');
            expect(result).toBeNull();
        });
    });

    describe('login', () => {
        it('should return an access token for a valid user', async () => {
            const user = { username: 'test', id: 'some-id' };
            const token = 'mock-jwt-token';
            
            jest.spyOn(service, 'validateUser').mockResolvedValue(user);
            mockJwtService.sign.mockReturnValue(token);

            const result = await service.login({ username: 'test', password: 'password123' });

            expect(result).toEqual({ access_token: token });
            expect(mockJwtService.sign).toHaveBeenCalledWith({ username: user.username, sub: user.id });
        });

        it('should throw an UnauthorizedException for invalid credentials', async () => {
            jest.spyOn(service, 'validateUser').mockResolvedValue(null);

            await expect(service.login({ username: 'test', password: 'wrong' })).rejects.toThrow('Credenciais inválidas');
        });
    });
});