import { ConsumerQueue } from '@/domain/application/gateways/queue/consumer-queue';
import { ProducerQueue } from '@/domain/application/gateways/queue/producer-queue';

export class FakeQueue implements ProducerQueue, ConsumerQueue {
  async produce(topic: string | string[], message: Buffer): Promise<void> {
    console.log(`[${topic}] - Message sent to queue - ${message.toString()}`);
  }
  async consume(topic: string): Promise<void> {
    console.log(`[${topic}] - Order saved in DB`);
  }
}
