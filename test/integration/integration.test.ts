import {
  Alchemy,
  AssetTransfersCategory,
  Network,
  NftExcludeFilters,
  NftTokenType
} from '../../src';
import { Deferred } from '../test-util';

/** Temporary test */
// TODO: REMOVE these tests once we have more comprehensive unit testing.
jest.setTimeout(50000);

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
  });

  it('test', async () => {
    const provider = await alchemy.config.getProvider();
    const res = await provider.getBalance(ownerAddress, 'latest');
    expect(res).toBeDefined();
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

    // ENS
    contractAddress = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';
    contractDeployer = await alchemy.core.findContractDeployer(contractAddress);
    expect(contractDeployer.deployerAddress).toEqual(
      '0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8'
    );
    expect(contractDeployer.blockNumber).toEqual(9380410);
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

    // General checks
    expect(firstTransfer.category).toEqual(AssetTransfersCategory.ERC721);
    expect(firstTransfer.rawContract.address).toEqual(baycContract);

    // First transfer specific checks
    expect(firstTransfer.blockNum).toEqual('0xbb933a');
    expect(firstTransfer.metadata.blockTimestamp).toEqual(
      '2021-04-22T23:13:40.000Z'
    );
  });

  it('getNftMetadata', async () => {
    const contractAddress = '0x0510745d2ca36729bed35c818527c4485912d99e';
    const tokenId = 403;
    const response = await alchemy.nft.getNftMetadata(
      contractAddress,
      tokenId,
      NftTokenType.UNKNOWN
    );
    expect(response.media).toBeDefined();
  });

  it('getOwnersForNft', async () => {
    const tokenId =
      '0x00000000000000000000000000000000000000000000000000000000008b57f0';
    const response = await alchemy.nft.getOwnersForNft(
      contractAddress,
      tokenId
    );
    expect(response.owners.length).toBeGreaterThan(0);
  });

  it('getNftForOwners with pageSize', async () => {
    const response = await alchemy.nft.getNftsForOwner('0xshah.eth', {
      pageSize: 51
    });
    expect(response.ownedNfts.length).toEqual(51);
  });

  it('getOwnersForNft from NFT', async () => {
    const nfts = await alchemy.nft.getNftsForOwner(ownerAddress, {
      excludeFilters: [NftExcludeFilters.SPAM],
      omitMetadata: true
    });
    expect(nfts.ownedNfts.length).toBeGreaterThan(0);
    const response = await alchemy.nft.getOwnersForNft(
      nfts.ownedNfts[0].contract.address,
      nfts.ownedNfts[0].tokenId
    );
    expect(response.owners.length).toBeGreaterThan(0);
  });

  it('getNftsForOwner() spam check', async () => {
    const withSpam = await alchemy.nft.getNftsForOwner('vitalik.eth');
    const noSpam = await alchemy.nft.getNftsForOwner('vitalik.eth', {
      excludeFilters: [NftExcludeFilters.SPAM]
    });
    expect(withSpam.totalCount).not.toEqual(noSpam.totalCount);
  });

  it('getNftsForOwner() contract metadata check', async () => {
    const nfts = await alchemy.nft.getNftsForOwner('0xshah.eth');
    expect(
      nfts.ownedNfts.filter(
        nft =>
          nft.contract.symbol !== undefined &&
          nft.contract.totalSupply !== undefined
      ).length
    ).toBeGreaterThan(0);
  });

  it('getOwnersForNftContract', async () => {
    const response = await alchemy.nft.getOwnersForContract(contractAddress);
    expect(response.owners.length).toBeGreaterThan(0);
  });

  it('getNftsForNftContract with pageKey', async () => {
    const nftsForNftContract = await alchemy.nft.getNftsForContract(
      contractAddress
    );

    const nextPage = await alchemy.nft.getNftsForContract(contractAddress, {
      pageKey: nftsForNftContract.pageKey
    });
    expect(nftsForNftContract.nfts).not.toEqual(nextPage.nfts);
  });

  it('getNftsForContract with limit', async () => {
    const nftsForNftContract = await alchemy.nft.getNftsForContract(
      contractAddress,
      { pageSize: 10 }
    );
    expect(nftsForNftContract.nfts.length).toEqual(10);
  });

  it('getNftsForContract() contract metadata check', async () => {
    const response = await alchemy.nft.getNftsForContract(
      '0x246e29ef6987637e48e7509f91521ce64eb8c831',
      { omitMetadata: false }
    );
    expect(
      response.nfts.filter(
        nft =>
          nft.contract.symbol !== undefined &&
          nft.contract.totalSupply !== undefined
      ).length
    ).toBeGreaterThan(0);
  });

  it('getIterator', async () => {
    jest.setTimeout(15000);
    let allNfts = [];
    let totalCount = 0;
    for await (const nft of alchemy.nft.getNftsForOwnerIterator(ownerAddress)) {
      if (totalCount === 10) {
        break;
      }
      allNfts.push(nft);
      totalCount += 1;
    }
    expect(allNfts.length).toEqual(totalCount);
    allNfts = [];
    totalCount = 0;

    for await (const nft of alchemy.nft.getNftsForOwnerIterator(ownerAddress, {
      omitMetadata: false
    })) {
      if (totalCount === 10) {
        break;
      }
      allNfts.push(nft);
      totalCount += 1;
    }
    expect(allNfts.length).toEqual(totalCount);
  });

  it('getNftsForNftContractIterator', async () => {
    jest.setTimeout(15000);
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
    expect(allNfts.length).toEqual(totalCount);
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
    expect(result.contractAddress).toBeDefined();
  });

  describe('README examples', () => {
    it('Example 1: Getting the Nfts owned by an address', async () => {
      void alchemy.nft.getNftsForOwner('0xshah.eth').then(nfts => {
        expect(nfts.totalCount).toBeDefined();
      });

      // Get all the image urls for all the NFTs an address owns.
      let totalCount = 0;
      for await (const nft of alchemy.nft.getNftsForOwnerIterator(
        '0xshah.eth'
      )) {
        if (totalCount === 10) {
          break;
        }
        totalCount++;
        expect(nft.media).toBeDefined();
      }
      totalCount = 0;

      // Filter out spam NFTs.
      for await (const nft of alchemy.nft.getNftsForOwnerIterator(
        '0xshah.eth',
        {
          excludeFilters: [NftExcludeFilters.SPAM]
        }
      )) {
        if (totalCount === 10) {
          break;
        }
        totalCount++;
        expect(nft.media).toBeDefined();
      }
    });

    it('Example 2: BAYC NFTs', async () => {
      // Bored Ape Yacht Club contract address.
      const baycAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';

      let count = 0;

      for await (const nft of alchemy.nft.getNftsForContractIterator(
        baycAddress,
        {
          // Omit the NFT metadata for smaller payloads.
          omitMetadata: true
        }
      )) {
        if (count === 5) {
          break;
        }
        count++;
        await alchemy.nft
          .getOwnersForNft(nft.contract.address, nft.tokenId)
          .then(response => {
            expect(response.owners).toBeDefined();
            expect(nft.tokenId).toBeDefined();
          });
      }
    });

    it('Example 3: Token balances', async () => {
      await alchemy.core.getTokenBalances(ownerAddress);
      await alchemy.core.getBalance('0xshah.eth');
    });
  });

  describe('handles networks', () => {
    describe('AlchemyProvider', () => {
      function testNetwork(network: Network) {
        it(`block subscription for ${network}`, async () => {
          const alchemy = new Alchemy({
            network
          });
          const block = await alchemy.core.getBlockNumber();
          expect(block).toBeDefined();
        });
      }

      for (const network of Object.values(Network)) {
        testNetwork(network);
      }
    });

    describe('AlchemyWebSocketProvider', () => {
      function testNetwork(network: Network) {
        it(`block subscription for ${network}`, () => {
          const alchemy = new Alchemy({
            network
          });
          const done = new Deferred<void>();
          alchemy.ws.once('block', () => {
            alchemy.ws.removeAllListeners();
            done.resolve();
          });
          return done.promise;
        });
      }

      for (const network of Object.values(Network)) {
        testNetwork(network);
      }
    });
  });
});
