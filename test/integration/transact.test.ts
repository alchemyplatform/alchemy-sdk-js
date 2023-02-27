import {
  Alchemy,
  DebugCallType,
  DecodingAuthority,
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

  describe('simulateAssetChangesBundle()', () => {
    const transferAToB = {
      from: '0x699aeca448ad51effd6dbee0a8618a79cf4370ba',
      to: '0x32e74d0b224e3ab4e854e81adc645dac9968ee93',
      data: '0x23b872dd000000000000000000000000699aeca448ad51effd6dbee0a8618a79cf4370ba000000000000000000000000699aeca448ad51effd6dbee0a8618a79cf4370bb0000000000000000000000000000000000000000000000000000000000000625'
    };
    const transferBToC = {
      from: '0x699aeca448ad51effd6dbee0a8618a79cf4370bb',
      to: '0x32e74d0b224e3ab4e854e81adc645dac9968ee93',
      data: '0x23b872dd000000000000000000000000699aeca448ad51effd6dbee0a8618a79cf4370bb000000000000000000000000699aeca448ad51effd6dbee0a8618a79cf4370bc0000000000000000000000000000000000000000000000000000000000000625'
    };

    const block = '0xF604F8';

    it('can simulate bundle successfully', async () => {
      const res = await alchemy.transact.simulateAssetChangesBundle(
        [transferAToB, transferBToC],
        block
      );
      expect(res).toHaveLength(2);
      expect(res[0].error).toBeUndefined();
      expect(res[0].changes).toHaveLength(1);
      expect(res[0].changes[0].assetType).toBe(SimulateAssetType.ERC721);
      expect(res[0].changes[0].changeType).toBe(SimulateChangeType.TRANSFER);
      expect(res[0].changes[0].from).toBe(
        '0x699aeca448ad51effd6dbee0a8618a79cf4370ba'
      );
      expect(res[0].changes[0].to).toBe(
        '0x699aeca448ad51effd6dbee0a8618a79cf4370bb'
      );

      expect(res[1].error).toBeUndefined();
      expect(res[1].changes).toHaveLength(1);
      expect(res[1].changes[0].assetType).toBe(SimulateAssetType.ERC721);
      expect(res[1].changes[0].changeType).toBe(SimulateChangeType.TRANSFER);
      expect(res[1].changes[0].from).toBe(
        '0x699aeca448ad51effd6dbee0a8618a79cf4370bb'
      );
      expect(res[1].changes[0].to).toBe(
        '0x699aeca448ad51effd6dbee0a8618a79cf4370bc'
      );
    });

    it('can simulate bundle with revert', async () => {
      const res = await alchemy.transact.simulateAssetChangesBundle(
        [transferBToC, transferAToB],
        block
      );
      expect(typeof res[0].error!.message).toBe('string');
      expect(res[0].changes).toHaveLength(0);
    });
  });

  describe('simulateExecutionBundle()', () => {
    const transferAToB = {
      from: '0x699aeca448ad51effd6dbee0a8618a79cf4370ba',
      to: '0x32e74d0b224e3ab4e854e81adc645dac9968ee93',
      data: '0x23b872dd000000000000000000000000699aeca448ad51effd6dbee0a8618a79cf4370ba000000000000000000000000699aeca448ad51effd6dbee0a8618a79cf4370bb0000000000000000000000000000000000000000000000000000000000000625'
    };
    const transferBToC = {
      from: '0x699aeca448ad51effd6dbee0a8618a79cf4370bb',
      to: '0x32e74d0b224e3ab4e854e81adc645dac9968ee93',
      data: '0x23b872dd000000000000000000000000699aeca448ad51effd6dbee0a8618a79cf4370bb000000000000000000000000699aeca448ad51effd6dbee0a8618a79cf4370bc0000000000000000000000000000000000000000000000000000000000000625'
    };

    const block = '0xF604F8';

    it('can simulate bundle successfully', async () => {
      const res = await alchemy.transact.simulateExecutionBundle(
        [transferAToB, transferBToC],
        block
      );
      expect(res).toHaveLength(2);
      expect(res[0].calls).toHaveLength(1);
      expect(res[0].logs).toHaveLength(1);

      expect(res[1].calls).toHaveLength(1);
      expect(res[1].logs).toHaveLength(1);
    });

    it('can simulate bundle with revert', async () => {
      const res = await alchemy.transact.simulateExecutionBundle(
        [transferBToC, transferAToB],
        block
      );

      expect(res[0].calls.length).toBe(1);
      expect(typeof res[0].calls[0].error).toBe('string');
    });
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

    it('can simulate transaction with block identifier', async () => {
      const res = await alchemy.transact.simulateAssetChanges(
        transaction,
        'latest'
      );
      expect(res.changes).toBeDefined();
      expect(res.changes).toHaveLength(1);
      expect(res.error).toBeUndefined();
    });

    it('can simulate transaction with no identifier ', async () => {
      const res = await alchemy.transact.simulateAssetChanges(transaction);
      const change = res.changes[0];
      expect(change.assetType).toBe(SimulateAssetType.ERC20);
      expect(change.changeType).toBe(SimulateChangeType.TRANSFER);
      expect(change.from).toBe(transaction.from.toLowerCase());
      expect(change.to).toBeDefined();
      expect(change.rawAmount).toBe('1000000');
      expect(change.contractAddress).toBe(USDC_CONTRACT_ADDRESS.toLowerCase());
      expect(change.tokenId).toBeUndefined();
      expect(change.decimals).toBe(6);
      expect(change.symbol).toBe('USDC');
      expect(change.name).toBe('USD Coin');
      expect(change.logo).toBe(
        'https://static.alchemyapi.io/images/assets/3408.png'
      );
      expect(change.amount).toBe('1');
    });

    it('can simulate transactions that revert', async () => {
      const transaction = {
        from: '0x538dF212DEf9d27B646B733cB267a69cBE1b77ad',
        to: '0x00000000006c3852cbEf3e08E8dF289169EdE581',
        value: '0x38d7ea4c68000',
        data: '0xfb0f3ee100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e609c82d34e000000000000000000000000000a0553e045fda77dbbe741ffd5b58ae7cefdab380000000000000000000000000004c00500000ad104d7dbd00e3ae0a5c00560c000000000000000000000000003ab3fdd225bb64268d39265c05550427257129b100000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000063d136550000000000000000000000000000000000000000000000000000000063da70d40000000000000000000000000000000000000000000000000000000000000000360c6ebe000000000000000000000000000000000000000060ce396f48879da70000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000000000000000000000000000000002e000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000006379da05b60000000000000000000000000000000a26b00c1f0df003000390027140000faa719000000000000000000000000000000000000000000000000000c6f3b40b6c00000000000000000000000000059e601a72a776d39efdb33e06b046357f3ce50500000000000000000000000000000000000000000000000000000000000000040aac1402fa335a3bb20a69991578f1a19be008c44d00f8d8bb1619471ef3fd67429b910868e87f42a97ad637d09010d68cdce3011bff12f8ba6448a69ce1bed3400000000360c6ebe',
        gas: '0x266ce'
      };
      const res = await alchemy.transact.simulateAssetChanges(
        transaction,
        'latest'
      );
      expect(res.changes.length).toEqual(0);
      expect(res.gasUsed).toBeUndefined();
      expect(typeof res.error?.message).toEqual('string');
    });

    it('can simulate approvals', async () => {
      const transaction = {
        from: '0xa06c3c08a19e51b33309eddfb356c33ead8517a3',
        to: '0xB54420149dBE2D5B2186A3e6dc6fC9d1A58316d4',
        value: '0x0',
        data: '0xa22cb4650000000000000000000000000dd7eef07982749410eceaa721cdc8ff3167fc9b0000000000000000000000000000000000000000000000000000000000000001',
        gas: '0x266ce'
      };

      const res = await alchemy.transact.simulateAssetChanges(transaction);
      expect(res.changes.length).toEqual(1);
      expect(res.changes[0].changeType).toEqual(SimulateChangeType.APPROVE);
      expect(res.changes[0].decimals).toEqual(0);
    });

    // TODO(bastien): Add test for ERC721 transfer and verify fields
    it('can simulate ERC721 transfers', async () => {});
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
      expect(res.logs).toBeDefined();
      expect(res.logs).toHaveLength(1);
    });

    // TODO(bastien): verify the decoded logs.
    it('can simulate sending 1 USDC', async () => {
      const { calls, logs } = await alchemy.transact.simulateExecution(
        transaction
      );

      expect(calls).toHaveLength(2);
      expect(logs).toHaveLength(1);

      // Call 1
      expect(calls[0].type).toBe(DebugCallType.CALL);
      expect(calls[0].from).toBe('0xd8da6bf26964af9d7eed9e03e53415d37aa96045');
      expect(calls[0].to).toBe('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48');
      expect(calls[0].value).toBe('0x0');
      expect(calls[0].gas).toBe('0x7fffffffffffaad0');
      expect(calls[0].gasUsed).toBe('0x6925');
      expect(calls[0].input).toBe(
        '0xa9059cbb000000000000000000000000fc43f5f9dd45258b3aff31bdbe6561d97e8b71de00000000000000000000000000000000000000000000000000000000000f4240'
      );
      expect(calls[0].output).toBe(
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      );

      // Call 2
      expect(calls[1].type).toBe(DebugCallType.DELEGATECALL);
      expect(calls[1].from).toBe('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48');
      expect(calls[1].to).toBe('0xa2327a938febf5fec13bacfb16ae10ecbc4cbdcf');
      expect(calls[1].value).toBeUndefined();
      expect(calls[1].gas).toBe('0x7dffffffffff8ef8');
      expect(calls[1].gasUsed).toBe('0x4cac');
      expect(calls[1].input).toBe(
        '0xa9059cbb000000000000000000000000fc43f5f9dd45258b3aff31bdbe6561d97e8b71de00000000000000000000000000000000000000000000000000000000000f4240'
      );
      expect(calls[1].output).toBe(
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      );
      expect(calls[1].decoded).toStrictEqual({
        authority: DecodingAuthority.ETHERSCAN,
        methodName: 'transfer',
        inputs: [
          {
            name: 'to',
            value: '0xfc43f5f9dd45258b3aff31bdbe6561d97e8b71de',
            type: 'address'
          },
          {
            name: 'value',
            value: '1000000',
            type: 'uint256'
          }
        ],
        outputs: [
          {
            name: '',
            value: 'true',
            type: 'bool'
          }
        ]
      });

      // Logs
      expect(logs[0].topics).toBeDefined();
      expect(logs[0].address).toBe(
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
      );
      expect(logs[0].data).toBe(
        '0x00000000000000000000000000000000000000000000000000000000000f4240'
      );
      expect(logs[0].decoded).toBeUndefined();
    });

    it('can simulate transactions that revert', async () => {
      const transaction = {
        from: '0x538dF212DEf9d27B646B733cB267a69cBE1b77ad',
        to: '0x00000000006c3852cbEf3e08E8dF289169EdE581',
        value: '0x38d7ea4c68000',
        data: '0xfb0f3ee100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e609c82d34e000000000000000000000000000a0553e045fda77dbbe741ffd5b58ae7cefdab380000000000000000000000000004c00500000ad104d7dbd00e3ae0a5c00560c000000000000000000000000003ab3fdd225bb64268d39265c05550427257129b100000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000063d136550000000000000000000000000000000000000000000000000000000063da70d40000000000000000000000000000000000000000000000000000000000000000360c6ebe000000000000000000000000000000000000000060ce396f48879da70000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000000000000000000000000000000002e000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000006379da05b60000000000000000000000000000000a26b00c1f0df003000390027140000faa719000000000000000000000000000000000000000000000000000c6f3b40b6c00000000000000000000000000059e601a72a776d39efdb33e06b046357f3ce50500000000000000000000000000000000000000000000000000000000000000040aac1402fa335a3bb20a69991578f1a19be008c44d00f8d8bb1619471ef3fd67429b910868e87f42a97ad637d09010d68cdce3011bff12f8ba6448a69ce1bed3400000000360c6ebe',
        gas: '0x266ce'
      };
      const res = await alchemy.transact.simulateExecution(transaction);
      expect(res.calls.length).toBe(1);
      expect(typeof res.calls[0].error).toBe('string');
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
