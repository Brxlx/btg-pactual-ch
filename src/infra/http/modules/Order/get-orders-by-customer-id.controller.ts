import { Controller, Get, Param } from '@nestjs/common';
import { GetOrdersByCustomerIdService } from './get-orders-by-customer-id.controller.service';

@Controller('/orders')
export class GetOrdersByCustomerIdController {
  constructor(
    private readonly getOrdersByCustomerIdService: GetOrdersByCustomerIdService,
  ) {}
  @Get(':customerId')
  async handle(@Param('customerId') customerId: string) {
    console.log(customerId);
    return;
    await this.getOrdersByCustomerIdService.execute({ customerId });
  }
}
