import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';
import type { ContactFormDto } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('send')
  @HttpCode(HttpStatus.OK)
  async sendEmail(@Body() contactFormDto: ContactFormDto) {
    await this.contactService.sendContactEmail(contactFormDto);
    return { message: 'Mensagem enviada com sucesso!' };
  }
}