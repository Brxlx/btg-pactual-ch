import { Prisma, Order as PrismaOrder } from '@prisma/client';

import { ObjectID } from '@/core/entities/object-id';
import { Order } from '@/domain/enterprise/entities/order';
import { OrderItem } from '@/domain/enterprise/entities/value-objects/order-item';
export class PrismaOrdersMapper {
  static toDomain(raw: PrismaOrder): Order {
    return Order.create(
      {
        customerId: new ObjectID(raw.customerId),
        total: raw.total,
        items: raw.items as unknown as OrderItem[],
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new ObjectID(raw.id),
    );
  }

  static toPrisma(order: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: order.id.toString(),
      customerId: order.customerId,
      total: order.total,
      items: order.items as unknown as Prisma.InputJsonValue,
      createdAt: order.createdAt,
    };
  }
}
