import { OrdersRepository } from '@/domain/application/repositories/orders-repository';
import { Order } from '@/domain/enterprise/entities/order';
import { OrderItem } from '@/domain/enterprise/entities/value-objects/order-item';

interface CreateOrderUseCaseRequest {
  orderId: number;
  customerId: number;
  items: OrderItem[];
}

type CreateOrderUseCaseResponse = { order: Order };

export class CreateOrderUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
    customerId,
    items,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    console.log(items.map((item) => item));
    const order = Order.create({
      orderId,
      customerId,
      items,
    });

    await this.ordersRepository.create(order);

    return { order };
  }
}
