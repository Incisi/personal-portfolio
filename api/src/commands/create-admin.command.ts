import { Injectable } from '@nestjs/common';
import { Command, Option } from 'nestjs-command';
import { UserService } from '../modules/auth/user.service';

@Injectable()
export class CreateAdminCommand {
  constructor(private readonly userService: UserService) {}

  @Command({
    command: 'create:admin',
    describe: 'Cria um novo usuário administrador',
  })
  async create(
    @Option({
      name: 'username',
      describe: 'Username do administrador',
      type: 'string',
      alias: 'u',
      required: true,
    })
    username: string,
    @Option({
      name: 'password',
      describe: 'Senha do administrador',
      type: 'string',
      alias: 'p',
      required: true,
    })
    password: string,
  ) {
    try {
      const admin = await this.userService.createAdmin(username, password);
      console.log(`Usuário admin "${admin.username}" criado com sucesso!`);
    } catch (error) {
      console.error('Erro ao criar admin:', error.message);
    }
  }
}