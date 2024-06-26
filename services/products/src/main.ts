import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { NODE_ENV, PORT } from './shared/infrastructure/env';
import { AppModule } from './app.module';

const NAME = 'Products service';
const GLOBAL_PREFIX = 'product';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // Opcional, para eliminar propiedades que no están en el DTO
    }),
  );

  if (NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle(NAME)
      .setDescription(`${NAME} description`)
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
  await app.listen(PORT);
  Logger.log(`🚀 ${NAME} running on: ${await app.getUrl()}`);
  Logger.log(`📚 ${NAME} Swagger running on: ${await app.getUrl()}/api`);
}
bootstrap();
