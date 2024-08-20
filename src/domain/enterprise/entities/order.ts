import { Entity } from '@/core/entities/entity';
import { ObjectID } from '@/core/entities/object-id';
import { Optional } from '@/core/types/optional';
import { OrderItem } from './value-objects/order-item';

export interface OrderProps {
  customerId: ObjectID;
  total: number;
  items: OrderItem[];
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Order extends Entity<OrderProps> {
  get customerId() {
    return this.props.customerId.toString();
  }

  get items() {
    return this.props.items;
  }

  get total() {
    return this.props.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  }

  static create(props: Optional<OrderProps, 'createdAt'>, id?: ObjectID) {
    return new Order(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }
}
