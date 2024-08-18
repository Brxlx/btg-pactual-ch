import { faker } from '@faker-js/faker/locale/pt_BR';

import { ObjectID } from '@/core/entities/object-id';
import { Wallet, WalletProps } from '@/domain/enterprise/entities/wallet';

export async function makeWallet(
  override: Partial<WalletProps> = {},
  id?: ObjectID,
) {
  return Wallet.create(
    {
      fullName: faker.person.fullName(),
      email: faker.internet.email().toLocaleLowerCase(),
      ...override,
    },
    id,
  );
}
