import { GetOrdersByCustomerUseCase } from '@/domain/application/use-cases/Order/get-orders-by-customer-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetOrdersByCustomerIdService extends GetOrdersByCustomerUseCase {}
