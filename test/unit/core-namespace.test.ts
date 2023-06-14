import { Alchemy } from '../../src';

describe('Core Namespace', () => {
  let alchemy: Alchemy;
  beforeEach(() => {
    alchemy = new Alchemy();
  });

  describe('getTokenBalances()', () => {
    it('validates inputs', async () => {
      const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
      await expect(() =>
        alchemy.core.getTokenBalances(address, [])
      ).rejects.toThrow();
    });
  });

  describe('isContractAddress()', () => {
    it('checks if address is a contract', async () => {
      const contractAddress = '0x00000000006c3852cbEf3e08E8dF289169EdE581'; // Seaport contract address
      const result = await alchemy.core.isContractAddress(contractAddress);

      expect(result).toBe(true);
    });

    it('checks if address is an EOA', async () => {
      const eoaAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'; // Vitalik's address
      const result = await alchemy.core.isContractAddress(eoaAddress);

      expect(result).toBe(false);
    });
  });
});
