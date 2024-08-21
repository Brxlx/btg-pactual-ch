import { DatabaseModule } from '@/infra/database/database.module';
import { Module } from '@nestjs/common';
import { GetOrdersByCustomerIdService } from './get-orders-by-customer-id.controller.service';
import { GetOrdersByCustomerIdController } from './get-orders-by-customer-id.controller';
import { OrdersRepository } from '@/domain/application/repositories/orders-repository';
import { CreateOrderController } from './create-order.controller';
import { CreateOrderService } from './create-order.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateOrderController, GetOrdersByCustomerIdController],
  providers: [
    {
      provide: CreateOrderService,
      useFactory: (ordersRepository: OrdersRepository) => {
        return new CreateOrderService(ordersRepository);
      },
      inject: [OrdersRepository],
    },
    {
      provide: GetOrdersByCustomerIdService,
      useFactory: (ordersRepository: OrdersRepository) => {
        return new GetOrdersByCustomerIdService(ordersRepository);
      },
      inject: [OrdersRepository],
    },
  ],
  exports: [GetOrdersByCustomerIdService],
})
export class OrderModule {}
