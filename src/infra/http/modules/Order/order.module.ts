import { DatabaseModule } from '@/infra/database/database.module';
import { Module } from '@nestjs/common';
import { GetOrdersByCustomerIdService } from './get-orders-by-customer-id.controller.service';
import { GetOrdersByCustomerIdController } from './get-orders-by-customer-id.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [GetOrdersByCustomerIdController],
  providers: [GetOrdersByCustomerIdService],
  exports: [],
})
export class OrderModule {}
