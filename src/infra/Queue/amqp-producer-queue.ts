import { CoreEnv } from '@/core/env/core-env';
import { ProducerQueue } from '@/domain/application/gateways/queue/producer-queue';
import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleDestroy,
} from '@nestjs/common';
import { Env } from '../env/env.schema';
import { Channel, Connection, connect } from 'amqplib';

@Injectable()
export class AmqpProducerQueue
  implements ProducerQueue, OnApplicationBootstrap, OnModuleDestroy
{
  private connection: Connection | undefined = undefined;
  private producer: Channel | undefined = undefined;

  constructor(private readonly envService: CoreEnv<Env>) {}

  async onApplicationBootstrap() {
    await this.initialize();
  }

  private async initialize() {
    this.connection = await connect(this.envService.get('QUEUE_URL'));
    this.producer = await this.connection.createChannel();
  }

  async produce(topic: string, message: Buffer): Promise<void> {
    try {
      if (!this.producer) return;

      await this.producer.assertQueue(topic, { durable: true });

      this.producer.sendToQueue(topic, message);
    } catch (err) {
      console.log('Error producing message to queue...', err);
    }
  }

  async onModuleDestroy() {
    await this.producer?.close();
    await this.connection?.close();
  }
}
