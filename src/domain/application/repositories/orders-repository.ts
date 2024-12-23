import { Order } from '@/domain/enterprise/entities/order';

export abstract class OrdersRepository {
  abstract findById(id: string): Promise<Order | null>;
  abstract findByCustomerId(customerId: number): Promise<Order[]>;
  abstract create(order: Order): Promise<void>;
}
