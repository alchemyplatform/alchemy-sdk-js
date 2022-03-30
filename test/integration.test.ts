import { initializeAlchemy } from '../src';
import { Alchemy } from '../src/api/alchemy';
import { getNftsPaginated } from '../src/api/nft';

/**
 * Temporary test
 */
// TODO: REMOVE these tests once we have more comprehensive unit testing.
describe.skip('E2E integration tests', () => {
  let alchemy: Alchemy;

  beforeAll(async () => {
    alchemy = await initializeAlchemy();

    // Skip all timeouts for testing.
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout').mockImplementation((f: any) => f());
  });

  it('getPaginated', async () => {
    jest.setTimeout(15000);
    console.log('lets paginate');
    const shah = '0x65d25E3F2696B73b850daA07Dd1E267dCfa67F2D';
    const allNfts = [];
    let totalCount = 0;
    for await (const nftResponse of getNftsPaginated(alchemy, {
      owner: shah
    })) {
      totalCount += 1;
      allNfts.push(nftResponse);
    }
    console.log('done', allNfts.length, totalCount);
  });
});
