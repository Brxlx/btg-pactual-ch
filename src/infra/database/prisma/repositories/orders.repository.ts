import { OrdersRepository } from '@/domain/application/repositories/orders-repository';
import { Order } from '@/domain/enterprise/entities/order';
import { PrismaService } from '../prisma.service';
import { PrismaOrdersMapper } from '../mappers/prisma-orders.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaOrdersRepository implements OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({ where: { id } });

    if (!order) return null;

    return PrismaOrdersMapper.toDomain(order);
  }

  async findByCustomerId(customerId: number): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { customerId },
    });

    return orders.map(PrismaOrdersMapper.toDomain);
  }

  async create(order: Order): Promise<void> {
    const prismaOrder = PrismaOrdersMapper.toPrisma(order);
    await this.prisma.order.create({
      data: {
        id: prismaOrder.id,
        customerId: prismaOrder.customerId,
        orderId: prismaOrder.orderId,
        total: prismaOrder.total,
        items: prismaOrder.items,
        createdAt: prismaOrder.createdAt,
        updatedAt: prismaOrder.updatedAt,
      },
    });
  }
}
