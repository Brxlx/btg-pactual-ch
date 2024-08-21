import { Order } from '@/domain/enterprise/entities/order';

export class OrderPresenter {
  static toHTTP(order: Order) {
    return {
      _id: order.id.toString(),
      orderId: order.orderId,
      customerId: order.customerId,
      total: order.total,
      items: order.items,
    };
  }
}
