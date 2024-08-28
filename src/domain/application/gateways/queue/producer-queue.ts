export abstract class ProducerQueue {
  abstract produce(topic: string | string[], message: Buffer): Promise<void>;
}
