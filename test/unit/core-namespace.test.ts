import { Alchemy, AssetTransfersCategory } from '../../src';

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

  describe('getAssetTransfers()', () => {
    const SUCCESSFUL_TX_HASH =
      '0xaaaa000000000000000000000000000000000000000000000000000000000001';
    const FAILED_TX_HASH =
      '0x1c8425dd5270067668e79361184f9fb005d64fa290e03485cd113c650be3e865';

    function makeTransfer(hash: string, value: number) {
      return {
        uniqueId: `${hash}:external`,
        category: 'external',
        blockNum: '0x34aeaf1',
        from: '0x0000000000000000000000000000000000000001',
        to: '0x405aa2e82cffb96c11f040f54cb3e4591fec8ffc',
        value,
        erc721TokenId: null,
        erc1155Metadata: null,
        tokenId: null,
        asset: 'BNB',
        hash,
        rawContract: {
          value: '0x2386f26fc10000',
          address: null,
          decimal: '0x12'
        }
      };
    }

    const mockApiResponse = {
      transfers: [
        makeTransfer(SUCCESSFUL_TX_HASH, 0.01),
        makeTransfer(FAILED_TX_HASH, 0.005)
      ],
      pageKey: undefined
    };

    /**
     * Bug reproduction (issue #520): alchemy_getAssetTransfers returns
     * transfers from failed/reverted transactions without any indication.
     */
    it('returns failed transactions by default (bug reproduction)', async () => {
      const provider = await alchemy.config.getProvider();
      jest.spyOn(provider, '_send').mockResolvedValueOnce(mockApiResponse);

      const result = await alchemy.core.getAssetTransfers({
        fromBlock: '0x34aeaf1',
        toBlock: '0x34aeaf1',
        toAddress: '0x405aa2e82cffb96c11f040f54cb3e4591fec8ffc',
        excludeZeroValue: true,
        category: [AssetTransfersCategory.EXTERNAL]
      });

      expect(result.transfers).toHaveLength(2);
      const hashes = result.transfers.map(t => t.hash);
      expect(hashes).toContain(FAILED_TX_HASH);
    });

    it('excludes failed transactions when excludeFailedTransfers is true', async () => {
      const provider = await alchemy.config.getProvider();
      jest
        .spyOn(provider, '_send')
        .mockResolvedValueOnce(JSON.parse(JSON.stringify(mockApiResponse)));

      jest
        .spyOn(provider, 'getTransactionReceipt')
        .mockImplementation(async (hash: string | Promise<string>) => {
          const resolved = await hash;
          if (resolved === FAILED_TX_HASH) {
            return {
              to: '0x405aa2e82cffb96c11f040f54cb3e4591fec8ffc',
              from: '0x0000000000000000000000000000000000000001',
              contractAddress: '',
              transactionIndex: 0,
              root: undefined,
              gasUsed: {} as any,
              logsBloom: '',
              blockHash: '0xblockhash',
              transactionHash: FAILED_TX_HASH,
              logs: [],
              blockNumber: 0x34aeaf1,
              confirmations: 1,
              cumulativeGasUsed: {} as any,
              effectiveGasPrice: {} as any,
              byzantium: true,
              type: 0,
              status: 0
            };
          }
          return {
            to: '0x405aa2e82cffb96c11f040f54cb3e4591fec8ffc',
            from: '0x0000000000000000000000000000000000000001',
            contractAddress: '',
            transactionIndex: 0,
            root: undefined,
            gasUsed: {} as any,
            logsBloom: '',
            blockHash: '0xblockhash',
            transactionHash: SUCCESSFUL_TX_HASH,
            logs: [],
            blockNumber: 0x34aeaf1,
            confirmations: 1,
            cumulativeGasUsed: {} as any,
            effectiveGasPrice: {} as any,
            byzantium: true,
            type: 0,
            status: 1
          };
        });

      const result = await alchemy.core.getAssetTransfers({
        fromBlock: '0x34aeaf1',
        toBlock: '0x34aeaf1',
        toAddress: '0x405aa2e82cffb96c11f040f54cb3e4591fec8ffc',
        excludeZeroValue: true,
        category: [AssetTransfersCategory.EXTERNAL],
        excludeFailedTransfers: true
      });

      expect(result.transfers).toHaveLength(1);
      expect(result.transfers[0].hash).toEqual(SUCCESSFUL_TX_HASH);
      const failedHashes = result.transfers.map(t => t.hash);
      expect(failedHashes).not.toContain(FAILED_TX_HASH);
    });

    it('does not strip excludeFailedTransfers from the API request', async () => {
      const provider = await alchemy.config.getProvider();
      const sendSpy = jest
        .spyOn(provider, '_send')
        .mockResolvedValueOnce({ transfers: [], pageKey: undefined });

      await alchemy.core.getAssetTransfers({
        fromBlock: '0x0',
        toBlock: 'latest',
        category: [AssetTransfersCategory.EXTERNAL],
        excludeFailedTransfers: true
      });

      const sentParams = sendSpy.mock.calls[0][1][0];
      expect(sentParams).not.toHaveProperty('excludeFailedTransfers');
    });
  });
});
