import { Alchemy, Network } from '../../src';
import { Deferred } from '../test-util';

jest.setTimeout(50000);
describe('E2E integration tests', () => {
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

    describe('AlchemyWebSocketProvider', () => {
      function testNetwork(network: Network) {
        it(`block subscription for ${network}`, () => {
          const alchemy = new Alchemy({
            network
          });
          const done = new Deferred<void>();
          alchemy.ws.once('block', () => {
            alchemy.ws.removeAllListeners();
            done.resolve();
          });
          return done.promise;
        });
      }

      for (const network of supportedNetworks) {
        // TODO: Enable after Astar websockets work.
        if (network === Network.ASTAR_MAINNET) {
          continue;
        }

        testNetwork(network);
      }
    });
  });
});
