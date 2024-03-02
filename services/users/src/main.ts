import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';

import { AppModule } from './app.module';
import { NODE_ENV, PORT } from './shared/infrastructure/env';

const NAME = 'Users service';
const GLOBAL_PREFIX = 'user-service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' });

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

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
