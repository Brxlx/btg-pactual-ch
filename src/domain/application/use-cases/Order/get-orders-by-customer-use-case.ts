import { OrdersRepository } from '@/domain/application/repositories/orders-repository';
import { Order } from '@/domain/enterprise/entities/order';

interface GetOrdersByCustomerUseCaseRequest {
  customerId: number;
}

type GetOrdersByCustomerUseCaseResponse = { orders: Order[] };

export class GetOrdersByCustomerUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute({
    customerId,
  }: GetOrdersByCustomerUseCaseRequest): Promise<GetOrdersByCustomerUseCaseResponse> {
    const orders = await this.ordersRepository.findByCustomerId(customerId);

    return { orders };
  }
}
