import { OrdersRepository } from '@/domain/application/repositories/orders-repository';
import { Order } from '@/domain/enterprise/entities/order';
import { PrismaService } from '../prisma.service';

// export class PrismaOrdersRepository implements OrdersRepository {
//   constructor(private readonly prisma: PrismaService) {}
//   async findById(id: string): Promise<Order | null> {
//     const order = await this.prisma.order.findUnique({ where: { id } });
//   }
//   async findByCustomerId(id: string): Promise<Order[]> {
//     const order = await this.prisma.order.findFirst({ where: { id } });
//   }
//   async create(wallet: Order): Promise<void> {
//     // return await this.prisma.order.create(wallet);
//   }
// }
