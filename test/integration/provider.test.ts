import { AlchemyProvider as EthersAlchemyProvider } from '@ethersproject/providers';

import {
  Alchemy,
  AlchemyProvider,
  AlchemySubscription,
  AlchemyWebSocketProvider
} from '../../src';
import { EthersNetwork } from '../../src/util/const';
import { loadAlchemyEnv } from '../test-util';

jest.setTimeout(50000);
/**
 * These integrations are sanity checks to ensure that the SDK's overridden
 * implementation of {@link AlchemyProvider} is working as expected.
 */
// TODO(ethers): Figure out appropriate unit tests for the SDK's custom AlchemyProvider.
describe('AlchemyProvider', () => {
  let alchemy: Alchemy;
  let wsProvider: AlchemyWebSocketProvider;
  let provider: AlchemyProvider;
  let ethersProvider: EthersAlchemyProvider;

  beforeEach(async () => {
    await loadAlchemyEnv();
    alchemy = new Alchemy({
      apiKey: process.env.ALCHEMY_API_KEY
    });
    ethersProvider = new EthersAlchemyProvider(
      EthersNetwork[alchemy.config.network],
      alchemy.config.apiKey
    );
    wsProvider = await alchemy.config.getWebSocketProvider();
    provider = await alchemy.config.getProvider();
  });

  afterEach(async () => {
    await wsProvider.destroy();
  });

  // TODO(ethers): Extract into helper method to verify all inputs.
  it('methods should return the same result', async () => {
    const expected = await ethersProvider.send('eth_getBalance', [
      '0xc94770007dda54cF92009BFF0dE90c06F603a09f',
      'latest'
    ]);
    const actual = await provider.send('eth_getBalance', [
      '0xc94770007dda54cF92009BFF0dE90c06F603a09f',
      'latest'
    ]);
    expect(actual).toEqual(expected);
  });

  it('alchemy_pendingTransactions', done => {
    let eventCount = 0;
    const address = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
    wsProvider.on(
      {
        method: AlchemySubscription.PENDING_TRANSACTIONS,
        toAddress: address,
        hashesOnly: true
      },
      (res: string) => {
        expect(res.substring(0, 2)).toEqual('0x');
        if (eventCount === 5) {
          done();
        }
        eventCount++;
      }
    );
  });

  it('alchemy_minedTransactions', done => {
    let eventCount = 0;
    wsProvider.on(
      {
        method: AlchemySubscription.MINED_TRANSACTIONS,
        hashesOnly: true
      },
      (res: any) => {
        expect(res.transaction).toBeDefined();
        expect(typeof res.transaction.hash).toEqual('string');
        if (eventCount === 5) {
          done();
        }
        eventCount++;
      }
    );
  });

  it('once', done => {
    const address = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
    let eventCount = 0;
    wsProvider.once(
      {
        method: AlchemySubscription.PENDING_TRANSACTIONS,
        toAddress: address,
        hashesOnly: true
      },
      () => {
        eventCount++;
        if (eventCount > 1) {
          done();
        }
      }
    );

    wsProvider.once(
      {
        method: AlchemySubscription.PENDING_TRANSACTIONS,
        toAddress: address,
        hashesOnly: true
      },
      () => {
        eventCount++;
        if (eventCount > 1) {
          done();
        }
      }
    );
  });

  it('can send normal json-rpc methods', async () => {
    const res = await wsProvider.getBlockNumber();
    expect(typeof res).toBe('number');
  });

  it('full transactions', done => {
    let eventCount = 0;
    wsProvider.on(
      {
        method: AlchemySubscription.PENDING_TRANSACTIONS
      },
      () => {
        if (eventCount === 10) {
          done();
        }
        eventCount++;
      }
    );
  });
  //
  it('handles blocks', done => {
    wsProvider.on('block', res => {
      expect(typeof res).toEqual('number');
      done();
    });
  });

  it('batching mode resolves promises', async () => {
    alchemy = new Alchemy({
      apiKey: process.env.ALCHEMY_API_KEY,
      batchRequests: true
    });

    const p1 = alchemy.core.getGasPrice();
    const p2 = alchemy.core.getBlockNumber();
    await p1;
    await p2;
  });

  // // TODO(ethers): Write tests to make sure that the SDK's provider instance
  // // has the correct network mappings compared to Ethers.
  // it('network mappings should be correct', () => {});
});
