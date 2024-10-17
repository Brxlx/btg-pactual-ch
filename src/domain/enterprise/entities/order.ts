import { Entity } from '@/core/entities/entity';
import { ObjectID } from '@/core/entities/object-id';
import { Optional } from '@/core/types/optional';
import { OrderItem } from './value-objects/order-item';

export interface OrderProps {
  orderId: number;
  customerId: number;
  total: number;
  items: OrderItem[];
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Order extends Entity<OrderProps> {
  get orderId() {
    return this.props.orderId;
  }

  get customerId() {
    return this.props.customerId;
  }

  get items() {
    return this.props.items;
  }

  get total() {
    return this.normalizePrice(
      this.props.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    );
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private normalizePrice(price: number) {
    return parseFloat(price.toFixed(2));
  }

  static create(props: Optional<OrderProps, 'total' | 'createdAt'>, id?: ObjectID) {
    return new Order(
      {
        ...props,
        total:
          props.total ??
          parseFloat(
            props.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2),
          ),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }
}
