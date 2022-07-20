import { Alchemy, AlchemySettings, Network } from '../../src';
import {
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
        await alchemy.getProvider();
      });
    }

    for (const network of Object.values(Network)) {
      testNetwork(network);
    }
  });

  it('preserves settings', () => {
    const config: AlchemySettings = {
      apiKey: 'api-key-here',
      network: Network.OPT_KOVAN,
      maxRetries: 2
    };
    const alchemy = new Alchemy(config);
    config.apiKey = 'new-api-key';
    config.network = Network.OPT_MAINNET;
    config.maxRetries = 3;

    expect(alchemy.config.apiKey).toEqual('api-key-here');
    expect(alchemy.config.network).toEqual(Network.OPT_KOVAN);
    expect(alchemy.config.maxRetries).toEqual(2);
  });

  it('initializes to default values', () => {
    const alchemy = new Alchemy();
    expect(alchemy.config.apiKey).toEqual(DEFAULT_ALCHEMY_API_KEY);
    expect(alchemy.config.network).toEqual(DEFAULT_NETWORK);
    expect(alchemy.config.maxRetries).toEqual(DEFAULT_MAX_RETRIES);
  });

  it('reuses the same provider', async () => {
    const alchemy = new Alchemy();
    const provider = await alchemy.getProvider();
    const provider2 = await alchemy.getProvider();
    expect(provider).toBe(provider2);

    const wsProvider = await alchemy.getWebSocketProvider();
    const wsProvider2 = await alchemy.getWebSocketProvider();
    expect(wsProvider).toBe(wsProvider2);
  });

  it('providers are loaded once', async () => {
    const alchemy = new Alchemy();
    const providerPromise = alchemy.getProvider();
    const provider2Promise = alchemy.getProvider();
    const provider = await providerPromise;
    const provider2 = await provider2Promise;
    expect(provider).toBe(provider2);

    const wsProviderPromise = alchemy.getWebSocketProvider();
    const wsProvider2Promise = alchemy.getWebSocketProvider();
    const wsProvider = await wsProviderPromise;
    const wsProvider2 = await wsProvider2Promise;
    expect(wsProvider).toBe(wsProvider2);
  });
});
