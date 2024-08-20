import { ObjectID } from '@/core/entities/object-id';
import { ValueObject } from '@/core/entities/value-object';

export interface OrderItemProps {
  product: ObjectID;
  quantity: number;
  price: number;
}

export class OrderItem extends ValueObject<OrderItemProps> {
  get product() {
    return this.props.product.toString();
  }

  get quantity() {
    return this.props.quantity;
  }

  get price() {
    return this.props.price;
  }

  static create(props: OrderItemProps) {
    return new OrderItem(props);
  }
}
