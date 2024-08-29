import { Controller, Get, Param } from '@nestjs/common';
import { GetOrdersByCustomerIdService } from './get-orders-by-customer-id.controller.service';
import { OrderPresenter } from '../../presenters/order-presenter';

@Controller('/orders')
export class GetOrdersByCustomerIdController {
  constructor(
    private readonly getOrdersByCustomerIdService: GetOrdersByCustomerIdService,
  ) {}

  @Get('/customer/:customerId')
  async handle(@Param('customerId') customerId: number) {
    const { orders } = await this.getOrdersByCustomerIdService.execute({
      customerId,
    });

    return { orders: orders.map(OrderPresenter.toHTTP) };
  }
}
