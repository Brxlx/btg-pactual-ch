export abstract class ConsumerQueue {
  abstract consume(topic: string): Promise<void>;
}
