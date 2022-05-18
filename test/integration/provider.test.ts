import { providers } from 'ethers';
import { initializeAlchemy } from '../../src';
import { EthersNetwork } from '../../src/util/const';

/**
 * These integrations are sanity checks to ensure that the SDK's overriden
 * implementation of {@link providers.AlchemyProvider} is working as expected.
 */
// TODO(ethers): Figure out appropriate unit tests for the SDK's custom AlchemyProvider.
describe('AlchemyProvider', () => {
  const alchemy = initializeAlchemy();
  const ethersProvider = new providers.AlchemyProvider(
    EthersNetwork[alchemy.network],
    alchemy.apiKey
  ) as providers.AlchemyProvider;
  const provider = alchemy.getProvider();

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

  // TODO(ethers): Write tests to make sure that the SDK's provider instance
  // has the correct network mappings compared to Ethers.
  it('network mappings should be correct', () => {});
});
