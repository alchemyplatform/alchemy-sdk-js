import { Wallet, Contract } from '../../src';

const privateKey =
  'dd5bdf09397b1fdf98e4f72c66047d5104b1511fa7dc1b8fdddd61a150f732c9';
const publicAddress = '0x4b9007B0BcE78cfB634032ec31Ed56adB464287b';
const contractAddress = '0x74a9a20f67d5499b62255bfa1dca195d06aa4617';

const abi = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getValue',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: '_name', type: 'string' }],
    name: 'setValue',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

describe('Alchemy-Ethers Contract', () => {
  it('returns a signer', async () => {
    const wallet = new Wallet(privateKey);
    const contract = new Contract(contractAddress, abi, wallet);
    const signer = contract.signer;
    const address = await signer.getAddress();
    expect(address).toEqual(publicAddress);
  });

  it('has the expected address', async () => {
    const wallet = new Wallet(privateKey);
    const contract = new Contract(contractAddress, abi, wallet);
    const address = contract.address;
    expect(address).toEqual(contractAddress);
  });
});
