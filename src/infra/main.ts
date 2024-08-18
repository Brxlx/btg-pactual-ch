import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/infra/app.module';
import { Logger } from '@nestjs/common';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('App');

  const service = app.get(EnvService);
  const port = service.get('APP_PORT');

  await app
    .listen(port, () => {
      logger.log('App up and running!');
    })
    .catch((err) => {
      logger.log('Error starting app.. \n', err.message);
    });
}
bootstrap();
