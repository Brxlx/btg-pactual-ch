import { CreateOrderUseCase } from './create-order-use-case';
import { ObjectID } from '@/core/entities/object-id';
import { makeOrder } from 'test/factories/make-order-factory';
import { FakeQueue } from 'test/queue/fake-queue';

let producerQueue: FakeQueue;
// system under test
let sut: CreateOrderUseCase;
suite('[Order]', () => {
  describe('Create Order', () => {
    beforeEach(() => {
      producerQueue = new FakeQueue();
      sut = new CreateOrderUseCase(producerQueue);
    });
    it('should be able to create a new order', async () => {
      const newOrder = await makeOrder({ orderId: 1 });
      const result = await sut.execute(newOrder);

      console.log('result---------', result.order);
      console.log(result.order.total);

      expect(result).toBeTruthy();
      expect(newOrder.id).toBeInstanceOf(ObjectID);
      expect(newOrder.id.isValid()).toBeTruthy();
      // expect(result).toEqual({
      //   order: inMemoryOrdersRepository.items[0],
      // });
      // expect(result.order.id.toString()).toEqual(
      //   inMemoryOrdersRepository.items[0].id.toString(),
      // );
      expect(result.order.items).toHaveLength(1);
      expect(result.order.items.length).toEqual(newOrder.items.length);
      expect(result.order.total).toEqual(newOrder.total);
    });
  });
});
