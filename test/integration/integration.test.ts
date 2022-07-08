import { Alchemy, NftExcludeFilters, NftTokenType } from '../../src';

/** Temporary test */
// TODO: REMOVE these tests once we have more comprehensive unit testing.
describe('E2E integration tests', () => {
  let alchemy: Alchemy;
  const ownerAddress = '0x65d25E3F2696B73b850daA07Dd1E267dCfa67F2D';
  const contractAddress = '0x01234567bac6ff94d7e4f0ee23119cf848f93245';

  beforeAll(async () => {
    alchemy = await new Alchemy({
      apiKey: 'o8EEA9hbCQCTx6CsJqsUrlQFxZQ_8ado'
    });

    // Skip all timeouts for testing.
    jest.setTimeout(50000);
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout').mockImplementation((f: any) => f());
  });

  it('test', async () => {
    const provider = await alchemy.getProvider();
    console.log(await provider.getBalance(ownerAddress, 'latest'));
  });

  // TODO: add unit test coverage. Integration tests are just sanity tests for now.
  it('findContractDeployer()', async () => {
    // BAYC
    let contractAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';
    let contractDeployer = await alchemy.findContractDeployer(contractAddress);
    expect(contractDeployer.deployerAddress).toEqual(
      '0xaba7161a7fb69c88e16ed9f455ce62b791ee4d03'
    );
    expect(contractDeployer.blockNumber).toEqual(12287507);
    console.log(contractDeployer);

    // ENS
    contractAddress = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';
    contractDeployer = await alchemy.findContractDeployer(contractAddress);
    expect(contractDeployer.deployerAddress).toEqual(
      '0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8'
    );
    expect(contractDeployer.blockNumber).toEqual(9380410);
    console.log(contractDeployer);
  });

  it('getNftMetadata', async () => {
    const provider = await alchemy.getProvider();
    console.log(await provider.getBlockNumber());
    const contractAddress = '0x0510745d2ca36729bed35c818527c4485912d99e';
    const tokenId = 403;
    const response = await alchemy.getNftMetadata(
      contractAddress,
      tokenId,
      NftTokenType.UNKNOWN
    );

    console.log('res', response);
  });

  it('getOwnersForNft', async () => {
    const tokenId =
      '0x00000000000000000000000000000000000000000000000000000000008b57f0';
    const response = await alchemy.getOwnersForNft(contractAddress, tokenId);
    console.log('res', response);
  });

  it('getOwnersForNft from NFT', async () => {
    const nfts = await alchemy.getNftsForOwner(ownerAddress, {
      excludeFilters: [NftExcludeFilters.SPAM],
      omitMetadata: true
    });
    console.log('nfts', nfts);
    const owners = await alchemy.getOwnersForNft(nfts.ownedNfts[0]);
    console.log('owner', owners);
  });

  it('getNftsForOwner()', async () => {
    const nfts = await alchemy.getNftsForOwner('vitalik.eth');
    console.log('owner', nfts);
  });

  it('getNftsForOwner() spam check', async () => {
    const withSpam = await alchemy.getNftsForOwner('vitalik.eth');
    const noSpam = await alchemy.getNftsForOwner('vitalik.eth', {
      excludeFilters: [NftExcludeFilters.SPAM]
    });
    expect(withSpam.totalCount).not.toEqual(noSpam.totalCount);
  });

  it('getOwnersForNftContract', async () => {
    const owners = await alchemy.getOwnersForNftContract(contractAddress);
    console.log('owners', owners);
  });

  it('getNftsForNftContract with pageKey', async () => {
    let nftsForNftContract = await alchemy.getNftsForNftContract(
      contractAddress
    );

    console.log(
      'nftsForNftContract: ',
      nftsForNftContract.pageKey,
      nftsForNftContract.nfts.length
    );
    nftsForNftContract = await alchemy.getNftsForNftContract(contractAddress, {
      pageKey: nftsForNftContract.pageKey
    });
    console.log(
      'nftsForNftContract: ',
      nftsForNftContract.pageKey,
      nftsForNftContract.nfts.length
    );
  });

  it('getIterator', async () => {
    jest.setTimeout(15000);
    console.log('lets paginate');
    const allNfts = [];
    let totalCount = 0;
    for await (const nft of alchemy.getNftsForOwnerIterator(ownerAddress)) {
      if (totalCount === 10) {
        break;
      }
      allNfts.push(nft);
      totalCount += 1;
    }

    for await (const nft of alchemy.getNftsForOwnerIterator(ownerAddress, {
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

  it('getNftsForNftContractIterator', async () => {
    jest.setTimeout(15000);
    console.log('lets paginate');
    const allNfts = [];
    let totalCount = 0;
    for await (const nft of alchemy.getNftsForNftContractIterator(
      contractAddress,
      {
        omitMetadata: false
      }
    )) {
      if (totalCount === 150) {
        break;
      }
      allNfts.push(nft);
      totalCount += 1;
    }
    console.log('done', allNfts.length, allNfts[100], totalCount);
  });

  it('refreshNftMetadata()', async () => {
    const contractAddress = '0x0510745d2ca36729bed35c818527c4485912d99e';
    const tokenId = '404';
    await alchemy.refreshNftMetadata(contractAddress, tokenId);

    const nft = await alchemy.getNftMetadata(contractAddress, tokenId);
    await alchemy.refreshNftMetadata(nft);
  });

  describe('README examples', () => {
    it('Example 1: Getting the Nfts owned by an address', async () => {
      void alchemy.getNftsForOwner('0xshah.eth').then(nfts => {
        console.log(nfts.totalCount);
      });

      // Get all the image urls for all the NFTs an address owns.
      for await (const nft of alchemy.getNftsForOwnerIterator('0xshah.eth')) {
        console.log(nft.media);
        console.log('done', nft);
      }

      // Filter out spam NFTs.
      for await (const nft of alchemy.getNftsForOwnerIterator('0xshah.eth', {
        excludeFilters: [NftExcludeFilters.SPAM]
      })) {
        console.log(nft.media);
      }
    });

    it('Example 2: BAYC NFTs', async () => {
      // Bored Ape Yacht Club contract address.
      const baycAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';

      for await (const nft of alchemy.getNftsForNftContractIterator(
        baycAddress,
        {
          // Omit the NFT metadata for smaller payloads.
          omitMetadata: true
        }
      )) {
        await alchemy
          .getOwnersForNft(nft)
          .then(response =>
            console.log('owners:', response.owners, 'tokenId:', nft.tokenId)
          );
      }
    });

    it('Example 3: Token balances', async () => {
      await alchemy.getTokenBalances(ownerAddress).then(console.log);
    });
  });
});
