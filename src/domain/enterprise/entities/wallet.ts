import { Entity } from '@/core/entities/entity';
import { ObjectID } from '@/core/entities/object-id';
import { Optional } from '@/core/types/optional';

export interface WalletProps {
  fullName: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Wallet extends Entity<WalletProps> {
  get fullName() {
    return this.props.fullName;
  }

  get email() {
    return this.props.email;
  }

  static create(props: Optional<WalletProps, 'createdAt'>, id?: ObjectID) {
    return new Wallet(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }
}
