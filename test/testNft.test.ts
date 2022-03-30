import { GetNftsResponse, getOwnersForToken, initializeAlchemy } from '../src';
import { Alchemy } from '../src/api/alchemy';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createNft } from './testUtil';
import { getNftsPaginated } from '../src/api/nft';

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

  // TODO: Extract all NFT methods into their own tests
  it('getNftOwnerForToken retries with maxAttempts', async () => {
    mock.onGet().reply(429, { message: 'Too many requests' });
    const contractAddress = '00bfa7d593b7a0812f4d11459e77ee868527f53b4';
    const tokenId =
      '0x00000000000000000000000000000000000000000000000000000000000001b7';

    await expect(
      getOwnersForToken(alchemy, contractAddress, tokenId)
    ).rejects.toThrow('Too many requests');
  });

  describe('getNftsPaginated', () => {
    const nftResponses: GetNftsResponse[] = [
      {
        ownedNfts: [createNft('a'), createNft('b')],
        pageKey: 'key1',
        totalCount: 3
      },
      {
        ownedNfts: [createNft('c')],
        totalCount: 3
      }
    ];

    beforeEach(() => {
      mock
        .onGet()
        .replyOnce(200, nftResponses[0])
        .onGet()
        .replyOnce(200, nftResponses[1]);
    });

    it('traverses all page keys', async () => {
      const nftTitles: string[] = [];
      for await (const nft of getNftsPaginated(alchemy, {
        owner: '0xABC'
      })) {
        nftTitles.push(nft.title);
      }

      // Verify page key was properly used and NFTs are returned in order.
      expect(nftTitles).toEqual(['a', 'b', 'c']);
      expect(mock.history.get.length).toEqual(2);
      expect(mock.history.get[0].params).not.toHaveProperty('pageKey');
      expect(mock.history.get[1].params).toHaveProperty('pageKey', 'key1');
    });

    it('can paginate starting from a given page key', async () => {
      const nftTitles: string[] = [];
      for await (const nft of getNftsPaginated(alchemy, {
        owner: '0xABC',
        pageKey: 'key0'
      })) {
        nftTitles.push(nft.title);
      }

      // Verify page key was properly used and NFTs are returned in order.
      expect(nftTitles).toEqual(['a', 'b', 'c']);
      expect(mock.history.get.length).toEqual(2);
      expect(mock.history.get[0].params).toHaveProperty('pageKey', 'key0');
      expect(mock.history.get[1].params).toHaveProperty('pageKey', 'key1');
    });

    it('yields NFTs until an error is thrown', async () => {
      mock.reset();
      mock
        .onGet()
        .replyOnce(200, nftResponses[0])
        .onGet()
        .replyOnce(500, { message: 'Internal Server Error' });

      const nftTitles: string[] = [];
      try {
        for await (const nft of getNftsPaginated(alchemy, {
          owner: '0xABC'
        })) {
          nftTitles.push(nft.title);
        }
        fail('getNftsPaginated should have surfaced error');
      } catch (e) {
        expect(nftTitles).toEqual(['a', 'b']);
        expect((e as Error).message).toContain('Internal Server Error');
      }
    });
  });
});
