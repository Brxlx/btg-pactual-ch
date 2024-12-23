import { OrdersRepository } from '@/domain/application/repositories/orders-repository';
import { Order } from '@/domain/enterprise/entities/order';

export class InMemoryOrdersRepository extends OrdersRepository {
  public items: Order[] = [];

  async findById(id: string): Promise<Order | null> {
    const order = this.items.find((item) => item.id.toString() === id);

    if (!order) return null;

    return order;
  }
  async findByCustomerId(id: number): Promise<Order[]> {
    return this.items.filter((item) => item.customerId === id);
  }

  async create(order: Order): Promise<void> {
    this.items.push(order);
  }
}
