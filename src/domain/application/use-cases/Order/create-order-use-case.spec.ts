import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository';

import { CreateOrderUseCase } from './create-order-use-case';
import { ObjectID } from '@/core/entities/object-id';
import { makeOrder } from 'test/factories/make-order-factory';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
// system under test
let sut: CreateOrderUseCase;
suite('[Order]', () => {
  describe('Create Order', () => {
    beforeEach(() => {
      inMemoryOrdersRepository = new InMemoryOrdersRepository();
      sut = new CreateOrderUseCase(inMemoryOrdersRepository);
    });
    it('should be able to create a new order', async () => {
      const newOrder = await makeOrder({ orderId: 1 });
      const result = await sut.execute(newOrder);

      console.log(JSON.stringify(result, null, 2));

      expect(result).toBeTruthy();
      expect(newOrder.id).toBeInstanceOf(ObjectID);
      expect(newOrder.id.isValid()).toBeTruthy();
      expect(result).toEqual({
        order: inMemoryOrdersRepository.items[0],
      });
      expect(result.order.id.toString()).toEqual(
        inMemoryOrdersRepository.items[0].id.toString(),
      );
      expect(result.order.items).toHaveLength(1);
      expect(result.order.total).toEqual(newOrder.total);
    });
  });
});
