import { Alchemy, Network } from '../../src';

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
