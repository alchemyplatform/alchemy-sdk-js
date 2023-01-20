import {
  Alchemy,
  GasOptimizedTransactionStatus,
  Network,
  SimulateAssetType,
  SimulateChangeType,
  Wallet
} from '../../src';
import { TESTING_PRIVATE_KEY, loadAlchemyEnv } from '../test-util';

jest.setTimeout(50000);
describe('E2E integration tests', () => {
  let alchemy: Alchemy;

  beforeAll(async () => {
    await loadAlchemyEnv();
    alchemy = new Alchemy({
      apiKey: process.env.ALCHEMY_API_KEY,
      network: Network.ETH_MAINNET
    });
  });

  it('sendPrivateTransaction()', async () => {
    const transaction = {
      to: '0xa238b6008Bc2FBd9E386A5d4784511980cE504Cd',
      // Use random number to allow back to back runs.
      value: Math.floor(Math.random() * 10000),
      nonce: 2,
      type: 2,
      maxFeePerGas: 30000,
      chainId: 1
    };

    const wallet = new Wallet(TESTING_PRIVATE_KEY);
    const signed = await wallet.signTransaction(transaction);
    const response = await alchemy.transact.sendPrivateTransaction(signed);
    expect(typeof response).toEqual('string');
  });

  describe('simulateAssetChanges()', () => {
    // vitalik.eth transferring 1 USDC to random address
    const USDC_CONTRACT_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
    const transaction = {
      from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      to: USDC_CONTRACT_ADDRESS,
      value: '0x0',
      data: '0xa9059cbb000000000000000000000000fc43f5f9dd45258b3aff31bdbe6561d97e8b71de00000000000000000000000000000000000000000000000000000000000f4240'
    };

    it('can simulate a transaction', async () => {
      const res = await alchemy.transact.simulateAssetChanges(transaction);
      expect(res.changes).toBeDefined();
      expect(res.changes).toHaveLength(1);
      expect(res.error).toBeDefined();
    });

    it('can simulate sending 1 USDC', async () => {
      const res = await alchemy.transact.simulateAssetChanges(transaction);
      const change = res.changes[0];
      expect(change.assetType).toBe(SimulateAssetType.ERC20);
      expect(change.changeType).toBe(SimulateChangeType.TRANSFER);
      expect(change.from).toBe(transaction.from.toLowerCase());
      expect(change.to).toBeDefined();
      expect(change.rawAmount).toBe('1000000');
      expect(change.contractAddress).toBe(USDC_CONTRACT_ADDRESS.toLowerCase());
      expect(change.tokenId).toBe(null);
      expect(change.decimals).toBe(6);
      expect(change.symbol).toBe('USDC');
      expect(change.name).toBe('USD Coin');
      expect(change.logo).toBe(
        'https://static.alchemyapi.io/images/assets/3408.png'
      );
      expect(change.amount).toBe('1');
    });
  });

  describe('simulateExecution()', () => {
    // vitalik.eth transferring 1 USDC to random address
    const USDC_CONTRACT_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
    const transaction = {
      from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      to: USDC_CONTRACT_ADDRESS,
      value: '0x0',
      data: '0xa9059cbb000000000000000000000000fc43f5f9dd45258b3aff31bdbe6561d97e8b71de00000000000000000000000000000000000000000000000000000000000f4240'
    };

    it('can simulate a transaction', async () => {
      const res = await alchemy.transact.simulateExecution(transaction);
      expect(res.calls).toBeDefined();
      expect(res.logs).toHaveLength(1);
      // expect(res.error).toBeDefined();
    });

    it('can simulate sending 1 USDC', async () => {
      const res = await alchemy.transact.simulateExecution(transaction);
      // TODO: add tests
    });
  });

  describe('sendGasOptimizedTransaction()', () => {
    it('can send signed transactions', async () => {
      const response = await alchemy.transact.sendGasOptimizedTransaction([
        '0x02f86f0107847735940085174876e8008252089415fdad99a4b0c72fc5c2761542e1b17cff7357de843b9aca0080c080a0db73b4c108202f2a0d22d8836ccb2052b24aaffbcbd8222e2030d0b8d68c3218a01ec636ff8a3a6125ba524d72348e91c96be5ac8330eadab31e70e753fbe00236'
      ]);
      const tx = await alchemy.transact.getTransaction(
        response.transactionHashes[0]
      );
      expect(tx).toBeDefined();
    });

    it('can send a raw transaction', async () => {
      const transaction = {
        to: '0xa238b6008Bc2FBd9E386A5d4784511980cE504Cd',
        value: 10000,
        nonce: 2,
        type: 2,
        chainId: 5
      };

      const wallet = new Wallet(TESTING_PRIVATE_KEY);
      const response = await alchemy.transact.sendGasOptimizedTransaction(
        transaction,
        wallet
      );
      expect(typeof response.trackingId).toEqual('string');
      expect(response.transactionHashes.length).toEqual(5);
    });
  });

  describe('getGasOptimizedTransactionStatus()', () => {
    it('can get the transaction state', async () => {
      const response = await alchemy.transact.sendGasOptimizedTransaction([
        '0x02f86f0107847735940085174876e8008252089415fdad99a4b0c72fc5c2761542e1b17cff7357de843b9aca0080c080a0db73b4c108202f2a0d22d8836ccb2052b24aaffbcbd8222e2030d0b8d68c3218a01ec636ff8a3a6125ba524d72348e91c96be5ac8330eadab31e70e753fbe00236'
      ]);

      const response2 = await alchemy.transact.getGasOptimizedTransactionStatus(
        response.trackingId
      );
      expect(
        Object.values(GasOptimizedTransactionStatus).includes(
          response2.jobStatus
        )
      ).toBe(true);
      expect(typeof response2.minedTransactionHash).toEqual('string');
    });
  });
});
