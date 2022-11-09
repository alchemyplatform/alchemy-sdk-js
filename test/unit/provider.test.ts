import { Alchemy, Network } from '../../src';
import { RequestBatcher } from '../../src/internal/request-batcher';
import { Mocked } from '../test-util';

describe('AlchemyProvider', () => {
  describe('translates Network to ethers', () => {
    function testNetwork(network: Network) {
      it(`should return a valid provider for ${network}`, async () => {
        const alchemy = new Alchemy({
          network
        });
        await alchemy.config.getWebSocketProvider();
      });
    }
    for (const network of Object.values(Network)) {
      testNetwork(network);
    }
  });

  describe('supports batching', () => {
    let alchemy: Alchemy;
    let batcher: Mocked<RequestBatcher>;
    beforeEach(async () => {
      alchemy = new Alchemy({
        optimizedBatching: true
      });
      const provider = await alchemy.config.getProvider();
      batcher = provider.batcher as Mocked<RequestBatcher>;
      batcher.enqueueRequest = jest.fn();
    });
    it('uses batcher when batching is enabled', async () => {
      batcher.enqueueRequest.mockResolvedValueOnce([
        {
          jsonrpc: '2.0',
          id: 1,
          result: '0x1'
        },
        {
          jsonrpc: '2.0',
          id: 2,
          result: '0x2'
        }
      ]);
      const p1 = alchemy.core.send('eth_blockNumber', []);
      const p2 = alchemy.core.send('eth_getBalance', []);
      expect(await p1).toEqual('mock-return1');
      expect(await p2).toEqual('mock-return2');
      expect(batcher.enqueueRequest.mock.calls.length).toEqual(2);
    });
  });

  it('accepts a URL hard override', async () => {
    const alchemy = new Alchemy({
      apiKey: 'demo-key',
      url: 'hardcoded-url'
    });
    const provider = await alchemy.config.getProvider();
    expect(provider.connection.url).toEqual('hardcoded-url');
    expect(provider.apiKey).toEqual('demo-key');
  });
});
