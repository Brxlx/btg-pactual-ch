import { ObjectId } from 'bson';

import { InvalidIdError } from '@/domain/application/use-cases/errors/invalid-id';

export class ObjectID {
  private value: string;

  toString() {
    return this.value;
  }

  toValue() {
    return this.value;
  }

  public _unsafeGenerateObjectId() {
    // Implementação da geração de ObjectId
    const timestampBytes = Buffer.alloc(4);
    timestampBytes.writeUInt32BE(Math.floor(Date.now() / 1000), 0);

    const randomBytes = Buffer.alloc(5);
    crypto.getRandomValues(randomBytes);

    const first9Bytes = Buffer.concat([timestampBytes, randomBytes]);

    // Gera o contador aleatório de 3 bytes
    const counterBytes = Buffer.alloc(3);
    crypto.getRandomValues(counterBytes);
    // Combina os 9 primeiros bytes com o contador e converte para hexadecimal
    const objectId = first9Bytes.toString('hex') + counterBytes.toString('hex');
    return objectId;
  }

  private generateObjectId() {
    return new ObjectId().toHexString();
  }

  constructor(value?: string) {
    if (value && value.length !== 24) throw new InvalidIdError();
    this.value = value ?? this.generateObjectId();
  }

  public equals(id: ObjectID): boolean {
    return id.toValue() === this.value;
  }

  public isValid(this: ObjectID): boolean {
    return ObjectId.isValid(this.toValue());
  }
}
