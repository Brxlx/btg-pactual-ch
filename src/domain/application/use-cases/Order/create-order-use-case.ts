import { OrdersRepository } from '@/domain/application/repositories/orders-repository';
import { Order } from '@/domain/enterprise/entities/order';
import { OrderItem } from '@/domain/enterprise/entities/value-objects/order-item';

interface CreateOrderUseCaseRequest {
  orderId: number;
  customerId: number;
  total: number;
  items: OrderItem[];
}

type CreateOrderUseCaseResponse = { order: Order };

export class CreateOrderUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
    customerId,
    total,
    items,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      orderId,
      customerId,
      total,
      items,
    });

    await this.ordersRepository.create(order);

    return { order };
  }
}
