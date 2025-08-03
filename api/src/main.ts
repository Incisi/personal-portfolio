import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);
	const frontendUrl = configService.get<string>('FRONTEND_URL');

	app.use(helmet());

	app.enableCors({
		origin: frontendUrl,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
  	});

	app.useGlobalPipes(new ValidationPipe());

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
