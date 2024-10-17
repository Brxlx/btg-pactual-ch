import { faker } from '@faker-js/faker/locale/pt_BR';

import { ObjectID } from '@/core/entities/object-id';
import { Order, OrderProps } from '@/domain/enterprise/entities/order';
import { OrderItem } from '@/domain/enterprise/entities/value-objects/order-item';

export async function makeOrder(override: Partial<OrderProps> = {}, itemsQtd = 1, id?: ObjectID) {
  const items = generateItems(itemsQtd);
  return Order.create(
    {
      orderId: override.orderId ?? faker.number.int({ min: 1, max: 10000 }),
      customerId: override.customerId ?? faker.number.int({ min: 1, max: 10000 }),
      total: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
      items,
      ...override,
    },
    id,
  );
}

function generateItems(qtd: number) {
  const items: OrderItem[] = [];
  for (let i = 0; i < qtd; i++) {
    items.push(
      OrderItem.create({
        product: faker.commerce.product(),
        quantity: faker.number.int({ min: 1, max: 3 }),
        price: faker.number.float({ fractionDigits: 2, min: 1, max: 150 }),
      }),
    );
  }
  return items;
}
