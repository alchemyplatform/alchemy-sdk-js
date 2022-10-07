import { Alchemy, Network } from '../../src';
import { Deferred } from '../test-util';

jest.setTimeout(50000);
describe('E2E integration tests', () => {
  describe('handles networks', () => {
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

      for (const network of Object.values(Network)) {
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

      for (const network of Object.values(Network)) {
        testNetwork(network);
      }
    });
  });
});
