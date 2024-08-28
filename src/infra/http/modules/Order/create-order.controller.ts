import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateOrderService } from './create-order.service';
import { CreateOrderSchema, createOrderSchema } from './types/order-schema';
import { OrderItem } from '@/domain/enterprise/entities/value-objects/order-item';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';

@Controller('/orders')
@UsePipes(new ZodValidationPipe(createOrderSchema))
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
