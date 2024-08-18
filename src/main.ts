import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('App');

  await app
    .listen(3000, () => {
      logger.log('App up and running!');
    })
    .catch((err) => {
      logger.log('Error starting app.. \n', err.message);
    });
}
bootstrap();
