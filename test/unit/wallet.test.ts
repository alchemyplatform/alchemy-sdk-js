import { Alchemy, Wallet } from '../../src';
import { parseEther, parseUnits } from '@ethersproject/units';

const privateKey =
  'dd5bdf09397b1fdf98e4f72c66047d5104b1511fa7dc1b8fdddd61a150f732c9';
const publicAddress = '0x4b9007B0BcE78cfB634032ec31Ed56adB464287b';

describe('Alchemy-Ethers Wallet', () => {
  it('returns a public address', async () => {
    const wallet = new Wallet(privateKey);
    const address = await wallet.getAddress();
    expect(address).toEqual(publicAddress);
  });

  it('connects to an Alchemy Provider', async () => {
    const alchemy = new Alchemy();
    const wallet = new Wallet(privateKey);
    const address = await wallet.getAddress();
    const provider = await alchemy.config.getProvider();

    const connectedWallet = wallet.connect(await alchemy.config.getProvider());
    expect(address).toEqual(publicAddress);
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

    const wallet = new Wallet(privateKey);
    const rawTx = await wallet.signTransaction(transaction);
    expect(rawTx).toEqual(expectedRawTx);
  });
});
