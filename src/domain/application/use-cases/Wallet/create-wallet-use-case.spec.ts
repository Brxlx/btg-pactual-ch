import { InMemoryWalletsRepository } from 'test/repositories/in-memory-wallet-repository';

import { CreateWalletUseCase } from './create-wallet-use-case';
import { makeWallet } from 'test/factories/make-wallet-factory';
import { ObjectID } from '@/core/entities/object-id';

let inMemoryWalletsRepository: InMemoryWalletsRepository;
// system under test
let sut: CreateWalletUseCase;
suite('[Wallet]', () => {
  describe('Create Wallet', () => {
    beforeEach(() => {
      inMemoryWalletsRepository = new InMemoryWalletsRepository();
      sut = new CreateWalletUseCase(inMemoryWalletsRepository);
    });
    it('should be able to create a new user wallet', async () => {
      const newWallet = await makeWallet();
      const result = await sut.execute(newWallet);

      console.log(result);

      expect(result).toBeTruthy();
      expect(result.wallet.id).toBeInstanceOf(ObjectID);
      expect(result.wallet.id.isValid()).toBeTruthy();
      expect(result).toEqual({
        wallet: inMemoryWalletsRepository.items[0],
      });
      expect(result.wallet.id.toString()).toEqual(
        inMemoryWalletsRepository.items[0].id.toString(),
      );
    });
  });
});
