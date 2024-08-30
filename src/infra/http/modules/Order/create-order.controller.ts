import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { CreateOrderService } from './create-order.service';
import {
  CreateOrderSchema,
  CreateOrdersByCustomerIdDTO,
  createOrderSchema,
} from './types/order-schema';
import { OrderItem } from '@/domain/enterprise/entities/value-objects/order-item';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('/orders')
export class CreateOrderController {
  constructor(private readonly createOrderService: CreateOrderService) {}

  @Post()
  @HttpCode(201)
  @ApiTags('Order')
  @ApiOperation({ summary: 'Create order service and send to Queue' })
  @ApiBody({ type: CreateOrdersByCustomerIdDTO })
  @ApiCreatedResponse({ status: 201 })
  @ApiBadRequestResponse({ description: 'Validation error: ' })
  @ApiInternalServerErrorResponse({ description: 'Unhandled unknown error' })
  async handle(
    @Body(new ZodValidationPipe(createOrderSchema)) body: CreateOrderSchema,
  ) {
    const { orderId, customerId, items } = body;
    await this.createOrderService.execute({
      orderId,
      customerId,
      items: items as OrderItem[],
    });
  }
}
