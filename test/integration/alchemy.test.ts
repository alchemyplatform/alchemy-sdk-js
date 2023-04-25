import { Alchemy, Network } from '../../src';
import { Deferred, loadAlchemyEnv } from '../test-util';

jest.setTimeout(50000);
describe('E2E integration tests', () => {
  beforeAll(async () => {
    await loadAlchemyEnv();
  });

  describe('handles networks', () => {
    // TODO(deprecation): Remove after removing deprecated networks.
    const deprecated = ['ropsten', 'kovan', 'rinkeby'];
    // Filter out deprecated networks.
    const supportedNetworks = Object.values(Network).filter(
      network => !deprecated.some(key => network.includes(key))
    );

    describe('AlchemyProvider', () => {
      function testNetwork(network: Network) {
        it(`get blockNumber on ${network}`, async () => {
          const alchemy = new Alchemy({
            apiKey: process.env.ALCHEMY_API_KEY,
            network
          });
          const block = await alchemy.core.getBlockNumber();
          expect(block).toBeDefined();
        });
      }

      for (const network of supportedNetworks) {
        testNetwork(network);
      }
    });

    // TODO(v6): enable.
    describe.skip('AlchemyWebSocketProvider', () => {
      function testNetwork(network: Network) {
        it(`block subscription for ${network}`, () => {
          const alchemy = new Alchemy({
            apiKey: process.env.ALCHEMY_API_KEY,
            network
          });
          const done = new Deferred<void>();
          // TODO(v6): enable test
          alchemy.ws.once('block' as any, () => {
            alchemy.ws.removeAllListeners();
            done.resolve();
          });
          return done.promise;
        });
      }

      const excludedNetworks = [
        Network.ASTAR_MAINNET,
        Network.POLYGONZKEVM_MAINNET,
        Network.POLYGONZKEVM_TESTNET
      ];

      for (const network of supportedNetworks) {
        // TODO: Enable after Astar websockets work.
        if (excludedNetworks.includes(network)) {
          continue;
        }

        testNetwork(network);
      }
    });
  });
});
