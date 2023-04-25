import { Alchemy, AlchemySettings, Network } from '../../src';
import {
  AlchemyApiType,
  DEFAULT_ALCHEMY_API_KEY,
  DEFAULT_MAX_RETRIES,
  DEFAULT_NETWORK
} from '../../src/util/const';

describe('Alchemy class', () => {
  describe('translates Network to ethers', () => {
    function testNetwork(network: Network) {
      it(`should return a valid provider for ${network}`, async () => {
        const alchemy = new Alchemy({
          network
        });
        await alchemy.config.getProvider();
      });
    }
    for (const network of Object.values(Network)) {
      testNetwork(network);
    }
  });

  it('preserves settings', () => {
    const config: AlchemySettings = {
      apiKey: 'api-key-here',
      network: Network.OPT_GOERLI,
      maxRetries: 2,
      url: 'invalid-url'
    };
    const alchemy = new Alchemy(config);
    config.apiKey = 'new-api-key';
    config.network = Network.OPT_MAINNET;
    config.maxRetries = 3;
    config.url = 'another-url';

    expect(alchemy.config.apiKey).toEqual('api-key-here');
    expect(alchemy.config.network).toEqual(Network.OPT_GOERLI);
    expect(alchemy.config.maxRetries).toEqual(2);
    expect(alchemy.config.url).toEqual('invalid-url');
  });

  it('initializes to default values', () => {
    const alchemy = new Alchemy();
    expect(alchemy.config.apiKey).toEqual(DEFAULT_ALCHEMY_API_KEY);
    expect(alchemy.config.network).toEqual(DEFAULT_NETWORK);
    expect(alchemy.config.maxRetries).toEqual(DEFAULT_MAX_RETRIES);
    expect(alchemy.config.url).toBeUndefined();
  });

  it('reuses the same provider', async () => {
    const alchemy = new Alchemy();
    const provider = await alchemy.config.getProvider();
    const provider2 = await alchemy.config.getProvider();
    expect(provider).toBe(provider2);

    const wsProvider = await alchemy.config.getWebSocketProvider();
    const wsProvider2 = await alchemy.config.getWebSocketProvider();
    expect(wsProvider).toBe(wsProvider2);
  });

  it('providers are loaded once', async () => {
    const alchemy = new Alchemy();
    const providerPromise = alchemy.config.getProvider();
    const provider2Promise = alchemy.config.getProvider();
    const provider = await providerPromise;
    const provider2 = await provider2Promise;
    expect(provider).toBe(provider2);

    const wsProviderPromise = alchemy.config.getWebSocketProvider();
    const wsProvider2Promise = alchemy.config.getWebSocketProvider();
    const wsProvider = await wsProviderPromise;
    const wsProvider2 = await wsProvider2Promise;
    expect(wsProvider).toBe(wsProvider2);
  });

  it('creates a request url based on the api type', () => {
    const alchemy = new Alchemy({
      network: Network.OPT_MAINNET,
      apiKey: 'demo-key'
    });

    expect(alchemy.config._getRequestUrl(AlchemyApiType.NFT)).toEqual(
      'https://opt-mainnet.g.alchemy.com/nft/v2/demo-key'
    );
    expect(alchemy.config._getRequestUrl(AlchemyApiType.BASE)).toEqual(
      'https://opt-mainnet.g.alchemy.com/v2/demo-key'
    );
  });

  it('uses the config url instead of apiKey/network if one was provided', () => {
    const alchemy = new Alchemy({
      apiKey: 'api-key-here',
      network: Network.OPT_GOERLI,
      url: 'custom-url'
    });
    expect(alchemy.config._getRequestUrl(AlchemyApiType.NFT)).toEqual(
      'custom-url'
    );
  });
});
