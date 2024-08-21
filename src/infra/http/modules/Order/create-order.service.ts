import { CreateOrderUseCase } from '@/domain/application/use-cases/Order/create-order-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateOrderService extends CreateOrderUseCase {}
