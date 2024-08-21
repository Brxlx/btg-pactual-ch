import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderService } from './create-order.service';
import { CreateOrderSchema } from './types/order-schema';
import { OrderItem } from '@/domain/enterprise/entities/value-objects/order-item';

@Controller('/orders')
export class CreateOrderController {
  constructor(private readonly createOrderService: CreateOrderService) {}

  @Post()
  async handle(@Body() body: CreateOrderSchema) {
    const { orderId, customerId, items } = body;
    await this.createOrderService.execute({
      orderId,
      customerId,
      items: items as OrderItem[],
    });
  }
}
