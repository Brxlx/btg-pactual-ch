import { Order } from '@/domain/enterprise/entities/order';

export abstract class OrdersRepository {
  abstract findById(id: string): Promise<Order | null>;
  abstract findByCustomerId(id: string): Promise<Order[]>;
  abstract create(wallet: Order): Promise<void>;
}
