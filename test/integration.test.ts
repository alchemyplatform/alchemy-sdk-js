import {
  Alchemy,
  findContractDeployer,
  getNftMetadata,
  getNfts,
  getNftsForCollection,
  getNftsForCollectionPaginated,
  getNftsPaginated,
  getOwnersForToken,
  initializeAlchemy,
  NftExcludeFilters,
  NftTokenType
} from '../src';

/** Temporary test */
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

  // TODO: add unit test coverage. Integration tests are just sanity tests for now.
  it('findContractDeployer()', async () => {
    // BAYC
    let contractAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';
    let contractDeployer = await findContractDeployer(alchemy, contractAddress);
    expect(contractDeployer.deployerAddress).toEqual(
      '0xaba7161a7fb69c88e16ed9f455ce62b791ee4d03'
    );
    expect(contractDeployer.blockNumber).toEqual(12287507);
    console.log(contractDeployer);

    // ENS
    contractAddress = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';
    contractDeployer = await findContractDeployer(alchemy, contractAddress);
    expect(contractDeployer.deployerAddress).toEqual(
      '0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8'
    );
    expect(contractDeployer.blockNumber).toEqual(9380410);
    console.log(contractDeployer);
  });

  it('getNftMetadata', async () => {
    console.log(await alchemy.getProvider().getBlockNumber());
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
    const nfts = await getNfts(alchemy, {
      owner: ownerAddress,
      excludeFilters: [NftExcludeFilters.SPAM],
      omitMetadata: true
    });
    console.log('nfts', nfts);
    const owners = await getOwnersForToken(alchemy, nfts.ownedNfts[0]);
    console.log('owner', owners);
  });

  it('getNFTs()', async () => {
    const nfts = await getNfts(alchemy, { owner: 'happy.eth' });
    console.log('owner', nfts);
  });

  it('getNftsForCollection with pageKey', async () => {
    let nftsForCollection = await getNftsForCollection(alchemy, {
      contractAddress
    });

    console.log(
      'nftsForCollection: ',
      nftsForCollection.pageKey,
      nftsForCollection.nfts.length
    );
    nftsForCollection = await getNftsForCollection(alchemy, {
      contractAddress,
      pageKey: nftsForCollection.pageKey
    });
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
    for await (const nft of getNftsPaginated(alchemy, {
      owner: ownerAddress
    })) {
      if (totalCount === 10) {
        break;
      }
      allNfts.push(nft);
      totalCount += 1;
    }

    for await (const nft of getNftsPaginated(alchemy, {
      owner: ownerAddress,
      omitMetadata: false
    })) {
      if (totalCount === 10) {
        break;
      }
      allNfts.push(nft);
      totalCount += 1;
    }
    console.log('done', allNfts.length, allNfts);
  });

  it('getNftsForCollectionPaginated', async () => {
    jest.setTimeout(15000);
    console.log('lets paginate');
    const allNfts = [];
    let totalCount = 0;
    for await (const nft of getNftsForCollectionPaginated(alchemy, {
      contractAddress,
      omitMetadata: false
    })) {
      if (totalCount === 150) {
        break;
      }
      allNfts.push(nft);
      totalCount += 1;
    }
    console.log('done', allNfts.length, allNfts[100], totalCount);
  });
});
