import { getOwnersForToken, initializeAlchemy } from '../src';
import { Alchemy } from '../src/api/alchemy';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('NFT module', () => {
  let alchemy: Alchemy;
  let mock: MockAdapter;

  beforeAll(async () => {
    alchemy = await initializeAlchemy();
    mock = new MockAdapter(axios);

    // Skip all timeouts for testing.
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout').mockImplementation((f: any) => f());
  });

  afterEach(() => {
    mock.reset();
  });

  it('getNftOwnerForToken retries with maxAttempts', async () => {
    mock.onGet().reply(429, { message: 'Too many requests' });
    const contractAddress = '00bfa7d593b7a0812f4d11459e77ee868527f53b4';
    const tokenId =
      '0x00000000000000000000000000000000000000000000000000000000000001b7';

    await expect(
      getOwnersForToken(alchemy, contractAddress, tokenId)
    ).rejects.toThrow('Too many requests');
  });
});
