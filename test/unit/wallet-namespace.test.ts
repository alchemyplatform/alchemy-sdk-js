import { Alchemy } from '../../src';

describe('Wallet Namespace', () => {
  let alchemy: Alchemy;

  beforeEach(() => {
    alchemy = new Alchemy();
  });

  it('loads', async () => {
    const wallet = await alchemy.config.getWalletProvider();
    await wallet.getSigner();
  });
});
