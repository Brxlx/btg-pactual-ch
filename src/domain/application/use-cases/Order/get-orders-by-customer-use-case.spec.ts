import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository';

import { ObjectID } from '@/core/entities/object-id';
import { makeOrder } from 'test/factories/make-order-factory';
import { GetOrdersByCustomerUseCase } from './get-orders-by-customer-use-case';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
// system under test
let sut: GetOrdersByCustomerUseCase;
suite('[Order]', () => {
  describe('Get Order by CustomerId', () => {
    beforeEach(() => {
      inMemoryOrdersRepository = new InMemoryOrdersRepository();
      sut = new GetOrdersByCustomerUseCase(inMemoryOrdersRepository);
    });
    it('should be able to get orders from a customer', async () => {
      const newOrder1 = await makeOrder({}, 2);
      const newOrder2 = await makeOrder({
        customerId: new ObjectID(newOrder1.customerId),
      });
      console.log('order 1', newOrder1.items);
      console.log('order 2', newOrder2.items);
      console.log('soma total dos itens: ', newOrder1.total + newOrder2.total);
      await inMemoryOrdersRepository.create(newOrder1);
      await inMemoryOrdersRepository.create(newOrder2);

      const result = await sut.execute({ customerId: newOrder1.customerId });

      expect(result.orders).toBeDefined();
      expect(result.orders[0].id).toBeInstanceOf(ObjectID);
      expect(result.orders[0].id.isValid()).toBeTruthy();
      expect(result).toEqual({
        orders: inMemoryOrdersRepository.items,
      });
      expect(result.orders[0].id.toString()).toEqual(
        inMemoryOrdersRepository.items[0].id.toString(),
      );
      expect(newOrder1.total + newOrder2.total).toEqual(
        result.orders[0].total + result.orders[1].total,
      );
    });
  });
});
