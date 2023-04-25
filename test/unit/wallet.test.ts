import { parseEther, parseUnits } from 'ethers';

import { Alchemy, Network, Wallet } from '../../src';
import {
  TEST_WALLET_PRIVATE_KEY,
  TEST_WALLET_PUBLIC_ADDRESS
} from '../test-util';

describe('Alchemy-Ethers Wallet', () => {
  let alchemy: Alchemy;

  beforeAll(async () => {
    const settings = {
      network: Network.ETH_MAINNET
    };
    alchemy = new Alchemy(settings);
  });

  it('returns a public address', async () => {
    const wallet = new Wallet(TEST_WALLET_PRIVATE_KEY);
    const address = await wallet.getAddress();
    expect(address).toEqual(TEST_WALLET_PUBLIC_ADDRESS);
  });

  it('connects to an Alchemy Provider', async () => {
    const wallet = new Wallet(TEST_WALLET_PRIVATE_KEY);
    const address = await wallet.getAddress();
    const provider = await alchemy.config.getProvider();

    const connectedWallet = wallet.connect(await alchemy.config.getProvider());
    expect(address).toEqual(TEST_WALLET_PUBLIC_ADDRESS);
    expect(connectedWallet.provider).toEqual(provider);
  });

  it('signs a transaction properly', async () => {
    const expectedRawTx =
      '0x02f873050585012a05f2008504a817c80082520894a238b6008bc2fbd9e386a5d4784511980ce504cd87038d7ea4c6800080c080a00866018df11db9ff5a560bc838cafff9638996c1a8583cf52dde3f0419ec871da074c04fce3afe6adc419c8cac8ece0946a8ca4501a68b17e79f50cfbbd72f789e';
    const transaction = {
      to: '0xa238b6008Bc2FBd9E386A5d4784511980cE504Cd',
      value: parseEther('0.001'),
      gasLimit: '21000',
      maxPriorityFeePerGas: parseUnits('5', 'gwei'),
      maxFeePerGas: parseUnits('20', 'gwei'),
      nonce: 5,
      type: 2,
      chainId: 5
    };

    const wallet = new Wallet(TEST_WALLET_PRIVATE_KEY);
    const rawTx = await wallet.signTransaction(transaction);
    expect(rawTx).toEqual(expectedRawTx);
  });
});
