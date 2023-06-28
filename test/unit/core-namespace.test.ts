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
});
