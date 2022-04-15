import { AlchemyConfig, initializeAlchemy, Network } from '../../src';
import {
  DEFAULT_ALCHEMY_API_KEY,
  DEFAULT_MAX_RETRIES,
  DEFAULT_NETWORK
} from '../../src/util/const';

describe('Alchemy class', () => {
  describe('translates Network to ethers', () => {
    function testNetwork(network: Network) {
      it(`should return a valid provider for ${network}`, () => {
        const alchemy = initializeAlchemy({
          network
        });
        alchemy.getProvider();
      });
    }

    for (const network of Object.values(Network)) {
      testNetwork(network);
    }
  });

  it('preserves settings', () => {
    const config: AlchemyConfig = {
      apiKey: 'api-key-here',
      network: Network.OPT_KOVAN,
      maxRetries: 2
    };
    const alchemy = initializeAlchemy(config);
    config.apiKey = 'new-api-key';
    config.network = Network.OPT_MAINNET;
    config.maxRetries = 3;

    expect(alchemy.apiKey).toEqual('api-key-here');
    expect(alchemy.network).toEqual(Network.OPT_KOVAN);
    expect(alchemy.maxRetries).toEqual(2);
  });

  it('initializes to default values', () => {
    const alchemy = initializeAlchemy();
    expect(alchemy.apiKey).toEqual(DEFAULT_ALCHEMY_API_KEY);
    expect(alchemy.network).toEqual(DEFAULT_NETWORK);
    expect(alchemy.maxRetries).toEqual(DEFAULT_MAX_RETRIES);
  });
});
