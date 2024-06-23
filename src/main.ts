import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './middleware/http-exception.filter';
import { VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as morgan from 'morgan';

async function bootstrap() {
	const logger = WinstonModule.createLogger({
		transports: [
			new winston.transports.Console({
				format: winston.format.combine(
					winston.format.colorize(),
					winston.format.timestamp(),
					winston.format.align(),
					winston.format.printf((info) => {
						const { timestamp, level, message } = info;
						return `${timestamp} [${level}]${message}`;
					})
				),
			}),
			new winston.transports.File({
				filename: 'app-error.log',
				level: 'error',
				format: winston.format.combine(
					winston.format.timestamp(),
					winston.format.json()
				),
			}),
		],
	});

	const app = await NestFactory.create(AppModule, { logger });

	app.use(
		helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false })
	);
	app.use(morgan('tiny'));
	app.enableCors();
	app.setGlobalPrefix('api');
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1',
	});

	const port = process.env.PORT || 3000;
	app.useGlobalFilters(new HttpExceptionFilter());

	const config = new DocumentBuilder()
		.setTitle('Expense API Documentation')
		.setDescription(
			`This API documentation outlines endpoints and functionality for managing blog data.
			Explore endpoints for retrieving, adding, and updating data efficiently.`
		)
		.addBearerAuth()
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger-doc', app, document);

	try {
		await app.listen(port);
		logger.warn(`Server is listening on http://localhost:${port} 🚀`);
	} catch (err) {
		logger.error(`Failed to start server on port ${port}:`, err);
		process.exit(1); // Exit process with failure
	}
}

bootstrap();
