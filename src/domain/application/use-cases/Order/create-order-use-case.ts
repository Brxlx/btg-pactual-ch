import { Order } from '@/domain/enterprise/entities/order';
import { OrderItem } from '@/domain/enterprise/entities/value-objects/order-item';
import { ProducerQueue } from '../../gateways/queue/producer-queue';

interface CreateOrderUseCaseRequest {
  orderId: number;
  customerId: number;
  items: OrderItem[];
}

type CreateOrderUseCaseResponse = { order: Order };

export class CreateOrderUseCase {
  constructor(private readonly producerQueue: ProducerQueue) {}

  async execute({
    orderId,
    customerId,
    items,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      orderId,
      customerId,
      items,
    });
    // await this.ordersRepository.create(order);
    await this.producerQueue.produce(
      'orders',
      Buffer.from(
        JSON.stringify({
          id: order.id.toString(),
          orderId,
          customerId,
          items,
          total: order.total,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        }),
      ),
    );

    return { order };
  }
}
