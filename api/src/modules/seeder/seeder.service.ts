import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../journey/entities/user.entity';

@Injectable()
export class SeederService implements OnModuleInit {
    private readonly logger = new Logger(SeederService.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async onModuleInit() {
        if (process.env.NODE_ENV === 'development') {
            this.logger.log('Iniciando seeder de desenvolvimento...');
            await this.seedAdminUser();
        }
    }

    private async seedAdminUser() {
        const adminUsername = 'admin';
        const adminExists = await this.userRepository.findOneBy({ username: adminUsername });

        if (!adminExists) {
            this.logger.log('Usuário admin não encontrado. Criando usuário genérico...');
            const adminUser = this.userRepository.create({
                username: adminUsername,
                password: 'admin',
            });
            await this.userRepository.save(adminUser);
            this.logger.log('Usuário admin genérico criado com sucesso (admin / admin)');
        } else {
            this.logger.log('Usuário admin de desenvolvimento já existe.');
        }
    }
}