import { initializeAlchemy } from '../src/alchemy';
import { Alchemy } from '../src/api/alchemy';
import { getOwnersForToken } from '../src';

describe('NFT module', () => {
  let alchemy: Alchemy;
  beforeEach(() => {
    alchemy = initializeAlchemy();
  });

  it('getNftOwnerForToken', async () => {
    const contractAddress = '0x0bfa7d593b7a0812f4d11459e77ee868527f53b4';
    const tokenId =
      '0x00000000000000000000000000000000000000000000000000000000000001b7';

    const result = await getOwnersForToken(alchemy, contractAddress, tokenId)
      .then(owners => console.log(owners))
      .catch(error => console.error(error));
    console.log('done', result);
  });
});
