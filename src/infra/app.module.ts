import { Module } from '@nestjs/common';
import { EnvModule } from './env/env.module';
import { HttpModule } from './http/http.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './http/filters/global-http.filter';

@Module({
  imports: [EnvModule, HttpModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
