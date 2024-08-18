import { Wallet } from '@/domain/enterprise/entities/wallet';
import { WalletsRepository } from '../../repositories/wallets-repository';

interface CreateWalletUseCaseRequest {
  fullName: string;
  email: string;
}

type CreateWalletUseCaseResponse = { wallet: Wallet };

export class CreateWalletUseCase {
  constructor(private readonly walletsRepository: WalletsRepository) {}
  public async execute({
    fullName,
    email,
  }: CreateWalletUseCaseRequest): Promise<CreateWalletUseCaseResponse> {
    const wallet = Wallet.create({ fullName, email });

    await this.walletsRepository.create(wallet);

    return { wallet };
  }
}
