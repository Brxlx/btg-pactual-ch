import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/infra/app.module';
import { Logger } from '@nestjs/common';
import { EnvService } from './env/env.service';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '@/../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('App');

  const envService = app.get(EnvService);
  const port = envService.get('APP_PORT');

  patchNestjsSwagger();

  const config = new DocumentBuilder()
    .setTitle('BTG')
    .setDescription('The BTG challenge microservice')
    .setVersion(version)
    .addTag('BTG')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app
    .listen(port, () => {
      logger.log('App up and running!');
    })
    .catch((err) => {
      logger.error('Error starting app...');
      err.message && logger.error(err.message);
      err.cause && logger.error(err.cause);
      err.stack && logger.error(err.stack);
      process.exit(1);
    });
}
bootstrap();
