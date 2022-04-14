import {
  getBaseNfts,
  getBaseNftsPaginated,
  getNftMetadata,
  getNfts,
  getNftsForCollection,
  getOwnersForToken,
  initializeAlchemy,
  NftTokenType
} from '../src';
import { Alchemy } from '../src/api/alchemy';

/**
 * Temporary test
 */
// TODO: REMOVE these tests once we have more comprehensive unit testing.
describe('E2E integration tests', () => {
  let alchemy: Alchemy;
  const ownerAddress = '0x65d25E3F2696B73b850daA07Dd1E267dCfa67F2D';
  const contractAddress = '0x01234567bac6ff94d7e4f0ee23119cf848f93245';

  beforeAll(async () => {
    alchemy = await initializeAlchemy();

    // Skip all timeouts for testing.
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout').mockImplementation((f: any) => f());
  });

  it('getNftMetadata', async () => {
    const contractAddress = '0x0510745d2ca36729bed35c818527c4485912d99e';
    const tokenIdHex =
      '0x0000000000000000000000000000000000000000000000000000000000000193';
    const tokenId = 403;
    const response = await getNftMetadata(
      alchemy,
      contractAddress,
      tokenId,
      NftTokenType.UNKNOWN
    );

    // const response4 = await getNftMetadata(
    //   alchemy,
    //   contractAddress,
    //   tokenId,
    //   NftTokenType.UNKNOWN
    // );

    console.log('res', response, tokenIdHex, tokenId);
  });

  it('getOwnersForToken', async () => {
    const tokenId =
      '0x00000000000000000000000000000000000000000000000000000000008b57f0';
    const response = await getOwnersForToken(alchemy, contractAddress, tokenId);
    console.log('res', response);
  });

  it('getOwnersForToken from NFT', async () => {
    const nfts = await getBaseNfts(alchemy, { owner: ownerAddress });
    const owners = await getOwnersForToken(alchemy, nfts.ownedNfts[0].nft);
    console.log('owner', owners);
  });

  it('getOwnersForToken from NFT', async () => {
    const owners = await getNfts(alchemy, { owner: 'happy.eth' });
    console.log('owner', owners);
  });

  it('getNftsForCollection with pageKey', async () => {
    let nftsForCollection = await getNftsForCollection(
      alchemy,
      contractAddress
    );

    console.log(
      'nftsForCollection: ',
      nftsForCollection.pageKey,
      nftsForCollection.nfts.length
    );
    nftsForCollection = await getNftsForCollection(
      alchemy,
      contractAddress,
      nftsForCollection.pageKey
    );
    console.log(
      'nftsForCollection: ',
      nftsForCollection.pageKey,
      nftsForCollection.nfts.length
    );
  });

  it('getPaginated', async () => {
    jest.setTimeout(15000);
    console.log('lets paginate');
    const allNfts = [];
    let totalCount = 0;
    for await (const nft of getBaseNftsPaginated(alchemy, {
      owner: ownerAddress
    })) {
      if (totalCount === 10) {
        break;
      }
      allNfts.push(nft);
      totalCount += 1;
    }
    console.log('done', allNfts.length, allNfts);
  });
});
