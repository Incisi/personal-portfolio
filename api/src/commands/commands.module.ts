import { Module } from '@nestjs/common';
import { CommandModule as NestJSCommandModule } from 'nestjs-command';
import { AuthModule } from '../modules/auth/auth.module';
import { CreateAdminCommand } from './create-admin.command';

@Module({
  imports: [
    NestJSCommandModule,
    AuthModule,
  ],
  providers: [
    CreateAdminCommand,
  ],
  exports: [CreateAdminCommand],
})
export class CommandModule {}