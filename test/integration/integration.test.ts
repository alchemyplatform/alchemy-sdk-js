import {
  Alchemy,
  AssetTransfersCategory,
  NftExcludeFilters,
  NftTokenType
} from '../../src';

/** Temporary test */
// TODO: REMOVE these tests once we have more comprehensive unit testing.
describe('E2E integration tests', () => {
  let alchemy: Alchemy;
  const ownerAddress = '0x65d25E3F2696B73b850daA07Dd1E267dCfa67F2D';
  const contractAddress = '0x01234567bac6ff94d7e4f0ee23119cf848f93245';

  beforeAll(async () => {
    alchemy = await new Alchemy({
      apiKey: 'alch-demo'
    });

    // Skip all timeouts for testing.
    jest.setTimeout(50000);
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout').mockImplementation((f: any) => f());
  });

  it('test', async () => {
    const provider = await alchemy.config.getProvider();
    console.log(await provider.getBalance(ownerAddress, 'latest'));
  });

  // TODO: add unit test coverage. Integration tests are just sanity tests for now.
  it('findContractDeployer()', async () => {
    // BAYC
    let contractAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';
    let contractDeployer = await alchemy.core.findContractDeployer(
      contractAddress
    );
    expect(contractDeployer.deployerAddress).toEqual(
      '0xaba7161a7fb69c88e16ed9f455ce62b791ee4d03'
    );
    expect(contractDeployer.blockNumber).toEqual(12287507);
    console.log(contractDeployer);

    // ENS
    contractAddress = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';
    contractDeployer = await alchemy.core.findContractDeployer(contractAddress);
    expect(contractDeployer.deployerAddress).toEqual(
      '0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8'
    );
    expect(contractDeployer.blockNumber).toEqual(9380410);
    console.log(contractDeployer);
  });

  it('getAssetTransfers', async () => {
    // Replace with contract of your choosing
    const baycContract = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';

    const allTransfers = await alchemy.core.getAssetTransfers({
      fromBlock: '0x0',
      contractAddresses: [baycContract],
      excludeZeroValue: true,
      category: [AssetTransfersCategory.ERC721],
      withMetadata: true
    });
    const firstTransfer = allTransfers.transfers[0];
    console.log('firstTransfer', firstTransfer);

    // General checks
    expect(firstTransfer.category).toEqual(AssetTransfersCategory.ERC721);
    expect(firstTransfer.rawContract.address).toEqual(baycContract);

    // First transfer specific checks
    expect(firstTransfer.blockNum).toEqual('0xe99958');
    expect(firstTransfer.metadata?.blockTimestamp).toEqual(
      '2022-08-09T16:52:43.000Z'
    );
  });

  it('getNftMetadata', async () => {
    const provider = await alchemy.config.getProvider();
    console.log(await provider.getBlockNumber());
    const contractAddress = '0x0510745d2ca36729bed35c818527c4485912d99e';
    const tokenId = 403;
    const response = await alchemy.nft.getNftMetadata(
      contractAddress,
      tokenId,
      NftTokenType.UNKNOWN
    );

    console.log('res', response);
  });

  it('getOwnersForNft', async () => {
    const tokenId =
      '0x00000000000000000000000000000000000000000000000000000000008b57f0';
    const response = await alchemy.nft.getOwnersForNft(
      contractAddress,
      tokenId
    );
    console.log('res', response);
  });

  it('getOwnersForNft from NFT', async () => {
    const nfts = await alchemy.nft.getNftsForOwner(ownerAddress, {
      excludeFilters: [NftExcludeFilters.SPAM],
      omitMetadata: true
    });
    console.log('nfts', nfts);
    const owners = await alchemy.nft.getOwnersForNft(
      nfts.ownedNfts[0].contract.address,
      nfts.ownedNfts[0].tokenId
    );
    console.log('owner', owners);
  });

  it('getNftsForOwner()', async () => {
    const nfts = await alchemy.nft.getNftsForOwner('vitalik.eth');
    console.log('owner', nfts);
  });

  it('getNftsForOwner() spam check', async () => {
    const withSpam = await alchemy.nft.getNftsForOwner('vitalik.eth');
    const noSpam = await alchemy.nft.getNftsForOwner('vitalik.eth', {
      excludeFilters: [NftExcludeFilters.SPAM]
    });
    expect(withSpam.totalCount).not.toEqual(noSpam.totalCount);
  });

  it('getOwnersForNftContract', async () => {
    const owners = await alchemy.nft.getOwnersForContract(contractAddress);
    console.log('owners', owners);
  });

  it('getNftsForNftContract with pageKey', async () => {
    let nftsForNftContract = await alchemy.nft.getNftsForContract(
      contractAddress
    );

    console.log(
      'nftsForNftContract: ',
      nftsForNftContract.pageKey,
      nftsForNftContract.nfts.length
    );
    nftsForNftContract = await alchemy.nft.getNftsForContract(contractAddress, {
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
    for await (const nft of alchemy.nft.getNftsForOwnerIterator(ownerAddress)) {
      if (totalCount === 10) {
        break;
      }
      allNfts.push(nft);
      totalCount += 1;
    }

    for await (const nft of alchemy.nft.getNftsForOwnerIterator(ownerAddress, {
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
    for await (const nft of alchemy.nft.getNftsForContractIterator(
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
    await alchemy.nft.refreshNftMetadata(contractAddress, tokenId);

    const nft = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
    await alchemy.nft.refreshNftMetadata(nft.contract.address, nft.tokenId);
  });

  it('refreshNftContract()', async () => {
    const contractAddress = '0x0510745d2ca36729bed35c818527c4485912d99e';
    const result = await alchemy.nft.refreshContract(contractAddress);
    console.log('result', result);
  });

  describe('README examples', () => {
    it('Example 1: Getting the Nfts owned by an address', async () => {
      void alchemy.nft.getNftsForOwner('0xshah.eth').then(nfts => {
        console.log(nfts.totalCount);
      });

      // Get all the image urls for all the NFTs an address owns.
      for await (const nft of alchemy.nft.getNftsForOwnerIterator(
        '0xshah.eth'
      )) {
        console.log(nft.media);
        console.log('done', nft);
      }

      // Filter out spam NFTs.
      for await (const nft of alchemy.nft.getNftsForOwnerIterator(
        '0xshah.eth',
        {
          excludeFilters: [NftExcludeFilters.SPAM]
        }
      )) {
        console.log(nft.media);
      }
    });

    it('Example 2: BAYC NFTs', async () => {
      // Bored Ape Yacht Club contract address.
      const baycAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';

      for await (const nft of alchemy.nft.getNftsForContractIterator(
        baycAddress,
        {
          // Omit the NFT metadata for smaller payloads.
          omitMetadata: true
        }
      )) {
        await alchemy.nft
          .getOwnersForNft(nft.contract.address, nft.tokenId)
          .then(response =>
            console.log('owners:', response.owners, 'tokenId:', nft.tokenId)
          );
      }
    });

    it('Example 3: Token balances', async () => {
      await alchemy.core.getTokenBalances(ownerAddress).then(console.log);
      await alchemy.core.getBalance('0xshah.eth').then(console.log);
    });
  });
});
