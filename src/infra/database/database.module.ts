import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { EnvModule } from '../env/env.module';
import { OrdersRepository } from '@/domain/application/repositories/orders-repository';
import { PrismaOrdersRepository } from './prisma/repositories/orders.repository';

@Module({
  imports: [EnvModule],
  providers: [PrismaService, { provide: OrdersRepository, useClass: PrismaOrdersRepository }],
  exports: [PrismaService, OrdersRepository],
})
export class DatabaseModule {}
