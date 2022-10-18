import { Wallet as EthersWallet } from '@ethersproject/wallet';

import { Alchemy, Network, Wallet } from '../../src';
import { TEST_WALLET_PRIVATE_KEY } from '../test-util';

describe('Alchemy-Ethers Wallet', () => {
  let alchemy: Alchemy;

  beforeAll(async () => {
    const settings = {
      network: Network.ETH_MAINNET
    };
    alchemy = new Alchemy(settings);
  });

  it('Matches functionality of Ethers Signer', async () => {
    const alchProvider = await alchemy.config.getProvider();

    const alchWallet = new Wallet(TEST_WALLET_PRIVATE_KEY, alchemy);
    const ethersWallet = new EthersWallet(
      TEST_WALLET_PRIVATE_KEY,
      alchProvider
    );
    const blockTag = 15000000;

    expect(await alchWallet.getBalance(blockTag)).toEqual(
      await ethersWallet.getBalance(blockTag)
    );
    expect(await alchWallet.getTransactionCount(blockTag)).toEqual(
      await ethersWallet.getTransactionCount(blockTag)
    );
    expect(await alchWallet.getChainId()).toEqual(
      await ethersWallet.getChainId()
    );
    expect(await alchWallet.getGasPrice()).toEqual(
      await ethersWallet.getGasPrice()
    );
    expect(await alchWallet.getFeeData()).toEqual(
      await ethersWallet.getFeeData()
    );
    expect(await alchWallet.resolveName('ricmoo.eth')).toEqual(
      await ethersWallet.resolveName('ricmoo.eth')
    );
  });

  it('Works with Alchemy object and Provider object', async () => {
    const alchProvider = await alchemy.config.getProvider();

    const alchWallet = new Wallet(TEST_WALLET_PRIVATE_KEY, alchemy);
    const providerWallet = new Wallet(TEST_WALLET_PRIVATE_KEY, alchProvider);
    const blockTag = 15000000;

    expect(await alchWallet.getBalance(blockTag)).toEqual(
      await providerWallet.getBalance(blockTag)
    );
    expect(await alchWallet.getTransactionCount(blockTag)).toEqual(
      await providerWallet.getTransactionCount(blockTag)
    );
    expect(await alchWallet.getChainId()).toEqual(
      await providerWallet.getChainId()
    );
    expect(await alchWallet.getGasPrice()).toEqual(
      await providerWallet.getGasPrice()
    );
    expect(await alchWallet.getFeeData()).toEqual(
      await providerWallet.getFeeData()
    );
    expect(await alchWallet.resolveName('ricmoo.eth')).toEqual(
      await providerWallet.resolveName('ricmoo.eth')
    );
  });
});
