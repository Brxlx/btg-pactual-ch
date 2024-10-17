import { CoreEnv } from '@/core/env/core-env';
import { Injectable, Logger, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';
import { Env } from '../env/env.schema';
import { ConsumerQueue } from '@/domain/application/gateways/queue/consumer-queue';
import { OrdersRepository } from '@/domain/application/repositories/orders-repository';
import { Channel, Connection, ConsumeMessage, connect } from 'amqplib';
import { Order, OrderProps } from '@/domain/enterprise/entities/order';
import { ObjectID } from '@/core/entities/object-id';

@Injectable()
export class AmqpConsumerQueue implements ConsumerQueue, OnApplicationBootstrap, OnModuleDestroy {
  private logger: Logger;
  private connection: Connection | undefined = undefined;
  private consumer: Channel | undefined = undefined;

  constructor(
    private readonly envService: CoreEnv<Env>,
    private readonly ordersRepository: OrdersRepository,
  ) {
    this.logger = new Logger(AmqpConsumerQueue.name);
  }

  async onApplicationBootstrap() {
    await this.initialize();
  }

  private async initialize() {
    this.connection = await connect(this.envService.get('QUEUE_URL'));
    this.consumer = await this.connection.createChannel();
    await this.consume('orders');
  }

  async consume(topic: string) {
    if (!this.consumer) return;
    try {
      await this.consumer.assertQueue(topic, { durable: true });

      await this.consumer.consume(topic, async (msg) => {
        if (msg) {
          console.log('message incoming from queue: ', msg.content.toString());
          await this.handleMessage(msg);
        }
      });
    } catch (err) {
      this.logger.error('Error consuming message...', err);
    }
  }

  private async handleMessage(msg: ConsumeMessage) {
    try {
      const deserialized = JSON.parse(msg.content.toString()) as {
        id: string;
      } & OrderProps;

      const newOrder = Order.create(
        {
          customerId: deserialized.customerId,
          orderId: deserialized.orderId,
          total: deserialized.total,
          items: deserialized.items,
        },
        new ObjectID(deserialized.id),
      );
      await this.ordersRepository.create(newOrder);
      this.consumer?.ack(msg);
    } catch (err) {
      this.logger.error('Error handling message... ', err);
      this.consumer?.nack(msg, false, true);
    }
  }

  async onModuleDestroy() {
    await this.consumer?.close();
    await this.connection?.close();
  }
}
