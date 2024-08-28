import { ConsumerQueue } from '@/domain/application/gateways/queue/consumer-queue';
import { ProducerQueue } from '@/domain/application/gateways/queue/producer-queue';
import { Module } from '@nestjs/common';
import { EnvModule } from '../env/env.module';
import { AmqpConsumerQueue } from './amqp-consumer-queue';
import { AmqpProducerQueue } from './amqp-producer-queue';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [EnvModule, DatabaseModule],
  providers: [
    {
      provide: ProducerQueue,
      useClass: AmqpProducerQueue,
    },
    {
      provide: ConsumerQueue,
      useClass: AmqpConsumerQueue,
    },
  ],
  exports: [ProducerQueue, ConsumerQueue],
})
export class QueueModule {}
