import { Alchemy, Network } from '../../src';

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

  it('test', async () => {
    alchemy = new Alchemy({ network: Network.MATIC_MUMBAI });
    const a = await alchemy.core.getTransactionReceipt(
      '0xf5f8aa62d97024d3566ecfeb7fd696f621182608dde8b0eee45fa351d2a00ba7'
    );
    console.log(a);
  });
});
