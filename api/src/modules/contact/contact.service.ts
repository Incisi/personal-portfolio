import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

export interface ContactFormDto {
  name: string;
  email: string;
  message: string;
}

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendContactEmail(contactFormDto: ContactFormDto): Promise<void> {
    const { name, email, message } = contactFormDto;
    const mailOptions = {
      from: `Portfólio <${this.configService.get<string>('EMAIL_USER')}>`,
      to: this.configService.get<string>('EMAIL_TO'),
      subject: `Nova Mensagem de Contato de ${name}`,
      html: `
        <h2>Nova mensagem recebida através do seu portfólio!</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`E-mail de ${name} enviado com sucesso!`);
    } catch (error) {
      this.logger.error('Falha ao enviar e-mail de contato', error.stack);
      throw new Error('Não foi possível enviar a mensagem.');
    }
  }
}