import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../journey/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService,
    ) {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        if (!jwtSecret) {
        throw new Error('Segredo JWT não encontrado nas variáveis de ambiente.');
        }
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtSecret,
        });
    }

    async validate(payload: { sub: string; username: string }): Promise<Omit<User, 'password' | 'hashPassword'>> {
        const user = await this.userRepository.findOneBy({ id: payload.sub });
        if (!user) {
        throw new UnauthorizedException();
        }
        
        const { password, hashPassword, ...result } = user;
        
        return result;
    }
}