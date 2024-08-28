import { DatabaseModule } from '@/infra/database/database.module';
import { Module } from '@nestjs/common';
import { GetOrdersByCustomerIdService } from './get-orders-by-customer-id.controller.service';
import { GetOrdersByCustomerIdController } from './get-orders-by-customer-id.controller';
import { OrdersRepository } from '@/domain/application/repositories/orders-repository';
import { CreateOrderController } from './create-order.controller';
import { CreateOrderService } from './create-order.service';
import { QueueModule } from '@/infra/Queue/queue.module';
import { ProducerQueue } from '@/domain/application/gateways/queue/producer-queue';

@Module({
  imports: [DatabaseModule, QueueModule],
  controllers: [CreateOrderController, GetOrdersByCustomerIdController],
  providers: [
    {
      provide: CreateOrderService,
      useFactory: (producerQueue: ProducerQueue) => {
        return new CreateOrderService(producerQueue);
      },
      inject: [ProducerQueue],
    },
    {
      provide: GetOrdersByCustomerIdService,
      useFactory: (ordersRepository: OrdersRepository) => {
        return new GetOrdersByCustomerIdService(ordersRepository);
      },
      inject: [OrdersRepository],
    },
  ],
  exports: [GetOrdersByCustomerIdService, CreateOrderService],
})
export class OrderModule {}
