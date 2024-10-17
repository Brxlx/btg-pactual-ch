import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { GetOrdersByCustomerIdService } from './get-orders-by-customer-id.controller.service';
import { OrderPresenter } from '../../presenters/order-presenter';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetOrdersByCustomerIdResponse } from './types/order-schema';

@Controller('/orders')
export class GetOrdersByCustomerIdController {
  constructor(private readonly getOrdersByCustomerIdService: GetOrdersByCustomerIdService) {}

  @Get('/customer/:customerId')
  @HttpCode(200)
  @ApiTags('Order')
  @ApiOperation({
    summary: 'Get all orders from specific customer consuming from queue',
  })
  @ApiOkResponse({ type: GetOrdersByCustomerIdResponse })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  async handle(@Param('customerId') customerId: number) {
    const { orders } = await this.getOrdersByCustomerIdService.execute({
      customerId,
    });

    return { orders: orders.map(OrderPresenter.toHTTP) };
  }
}
