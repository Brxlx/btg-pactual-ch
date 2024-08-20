import { ObjectID } from '@/core/entities/object-id';
import { OrdersRepository } from '@/domain/application/repositories/orders-repository';
import { Order } from '@/domain/enterprise/entities/order';
import { OrderItem } from '@/domain/enterprise/entities/value-objects/order-item';

interface CreateOrderUseCaseRequest {
  customerId: string;
  total: number;
  items: OrderItem[];
}

type CreateOrderUseCaseResponse = { order: Order };

export class CreateOrderUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute({
    customerId,
    total,
    items,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      customerId: new ObjectID(customerId),
      total,
      items,
    });

    await this.ordersRepository.create(order);

    return { order };
  }
}
