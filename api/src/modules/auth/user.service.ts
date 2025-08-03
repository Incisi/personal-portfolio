import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../journey/entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createAdmin(username: string, password: string): Promise<User> {
        const userExists = await this.userRepository.findOneBy({ username });
        if (userExists) {
            throw new ConflictException('Usuário com este username já existe.');
        }
        const adminUser = this.userRepository.create({ username, password });
        return this.userRepository.save(adminUser);
    }
}