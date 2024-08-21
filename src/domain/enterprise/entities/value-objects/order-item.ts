import { ValueObject } from '@/core/entities/value-object';

export interface OrderItemProps {
  product: string;
  quantity: number;
  price: number;
}

export class OrderItem extends ValueObject<OrderItemProps> {
  get product() {
    return this.props.product;
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
