import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MongoServerExceptionFilter } from './exceptions/mongo-server-exception.filter';

const setupSwagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('Store mock example')
    .setDescription('Mock API for online store')
    .setVersion('1.0')
    .addBearerAuth({ bearerFormat: 'JWT', type: 'http', description: 'Put your authorization token here' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // adding validation to all requests
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MongoServerExceptionFilter());

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  setupSwagger(app);

  await app.listen(port || 3000);
}
bootstrap();
