import {
  Alchemy,
  GetNftSalesResponse,
  NftContract,
  NftFilters,
  NftSaleMarketplace,
  NftTokenType,
  OpenSeaSafelistRequestStatus,
  fromHex
} from '../../src';
import { loadAlchemyEnv } from '../test-util';

jest.setTimeout(50000);

// These integration tests check for valid response types and protect against
// regressions in the backend.
describe('E2E integration tests', () => {
  let alchemy: Alchemy;
  const ownerEns = 'vitalik.eth';
  const ownerAddress = '0x65d25E3F2696B73b850daA07Dd1E267dCfa67F2D';
  const contractAddress = '0x01234567bac6ff94d7e4f0ee23119cf848f93245';

  beforeAll(async () => {
    await loadAlchemyEnv();
    alchemy = await new Alchemy({
      apiKey: process.env.ALCHEMY_API_KEY
    });

    // Skip all timeouts for testing.
    jest.setTimeout(50000);
  });

  function verifyNftContractMetadata(metadata: NftContract): void {
    expect(typeof metadata.totalSupply).toEqual('string');
    expect(typeof metadata.symbol).toEqual('string');
    expect(metadata.tokenType).toEqual(NftTokenType.ERC721);
    expect(typeof metadata.name).toEqual('string');
    expect(metadata.openSea).toBeDefined();
    expect(metadata.openSea?.safelistRequestStatus).toBeDefined();
    expect(
      Object.values(OpenSeaSafelistRequestStatus).includes(
        metadata.openSea?.safelistRequestStatus!
      )
    ).toEqual(true);
    expect(typeof metadata.contractDeployer).toEqual('string');
    expect(typeof metadata.deployedBlockNumber).toEqual('number');
  }

  function verifyNftSalesData(response: GetNftSalesResponse): void {
    expect(response.nftSales.length).toBeGreaterThan(0);
    expect(response.nftSales[0].bundleIndex).toBeDefined();
    expect(typeof response.nftSales[0].bundleIndex).toEqual('number');
    expect(response.nftSales[0].buyerAddress).toBeDefined();
    expect(typeof response.nftSales[0].buyerAddress).toEqual('string');
    expect(response.nftSales[0].contractAddress).toBeDefined();
    expect(typeof response.nftSales[0].contractAddress).toEqual('string');
    expect(response.nftSales[0].logIndex).toBeDefined();
    expect(typeof response.nftSales[0].logIndex).toEqual('number');
    expect(response.nftSales[0].marketplace).toBeDefined();
    expect(typeof response.nftSales[0].logIndex).toEqual('number');
    expect(response.nftSales[0].quantity).toBeDefined();
    expect(typeof response.nftSales[0].quantity).toEqual('string');
    expect(response.nftSales[0].sellerAddress).toBeDefined();
    expect(typeof response.nftSales[0].sellerAddress).toEqual('string');
    expect(response.nftSales[0].taker).toBeDefined();
    expect(typeof response.nftSales[0].taker).toEqual('string');
    expect(response.nftSales[0].tokenId).toBeDefined();
    expect(typeof response.nftSales[0].tokenId).toEqual('string');
    expect(response.nftSales[0].transactionHash).toBeDefined();
    expect(typeof response.nftSales[0].transactionHash).toEqual('string');
  }

  it('getNftMetadata()', async () => {
    const contractAddress = '0x0510745d2ca36729bed35c818527c4485912d99e';
    const tokenId = 403;
    const response = await alchemy.nft.getNftMetadata(
      contractAddress,
      tokenId,
      {
        tokenType: NftTokenType.UNKNOWN
      }
    );
    expect(response.media).toBeDefined();
    verifyNftContractMetadata(response.contract);
  });

  it('getNftMetadataBatch()', async () => {
    const response = await alchemy.nft.getNftMetadataBatch([
      {
        contractAddress,
        tokenId: '0x8b57f0',
        tokenType: NftTokenType.ERC721
      },
      { contractAddress, tokenId: 13596716 }
    ]);
    expect(response.length).toEqual(2);
    expect(response[0].tokenId).toEqual(fromHex('0x8b57f0').toString());
    expect(response[1].tokenId).toEqual('13596716');
  });

  it('getContractMetadata()', async () => {
    const response = await alchemy.nft.getContractMetadata(contractAddress);
    verifyNftContractMetadata(response);
  });

  it('getOwnersForNft()', async () => {
    const tokenId =
      '0x00000000000000000000000000000000000000000000000000000000008b57f0';
    const response = await alchemy.nft.getOwnersForNft(
      contractAddress,
      tokenId
    );
    expect(response.owners.length).toBeGreaterThan(0);
  });

  it('getNftForOwners() with pageSize', async () => {
    const response = await alchemy.nft.getNftsForOwner('0xshah.eth', {
      pageSize: 51
    });
    expect(
      response.ownedNfts.filter(nft => nft.contract.openSea !== undefined)
        .length
    ).toBeGreaterThan(0);
    expect(response.ownedNfts.length).toEqual(51);
  });

  it('getOwnersForNft() from NFT', async () => {
    const nfts = await alchemy.nft.getNftsForOwner(ownerAddress, {
      excludeFilters: [NftFilters.SPAM],
      omitMetadata: true
    });
    expect(nfts.ownedNfts.length).toBeGreaterThan(0);

    const nfts2 = await alchemy.nft.getNftsForOwner(ownerAddress, {
      excludeFilters: [NftFilters.AIRDROPS],
      omitMetadata: true
    });

    expect(nfts.ownedNfts.length).not.toEqual(nfts2.totalCount);
    const response = await alchemy.nft.getOwnersForNft(
      nfts.ownedNfts[0].contract.address,
      nfts.ownedNfts[0].tokenId
    );
    expect(response.owners.length).toBeGreaterThan(0);
  });

  it('getNftsForOwner() spam check', async () => {
    const withSpam = await alchemy.nft.getNftsForOwner('vitalik.eth');
    const noSpam = await alchemy.nft.getNftsForOwner('vitalik.eth', {
      excludeFilters: [NftFilters.SPAM]
    });
    expect(withSpam.totalCount).not.toEqual(noSpam.totalCount);
  });

  it('getNftsForOwner() spam info check', async () => {
    const response = await alchemy.nft.getNftsForOwner('vitalik.eth');
    const spamNfts = response.ownedNfts.filter(
      nft => nft.spamInfo !== undefined
    );
    expect(spamNfts[0].spamInfo!.isSpam).toEqual(true);
    expect(spamNfts[0].spamInfo!.classifications.length).toBeGreaterThan(0);
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

  it('getOwnersForContract()', async () => {
    const response = await alchemy.nft.getOwnersForContract(contractAddress);
    expect(response.owners.length).toBeGreaterThan(0);
  });

  it('getOwnersForContract()', async () => {
    const address = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';
    const response = await alchemy.nft.getOwnersForContract(address, {
      withTokenBalances: true
    });

    expect(response.owners.length).toBeGreaterThan(0);
    expect(response.owners[0].tokenBalances.length).toBeGreaterThan(0);
    expect(typeof response.owners[0].tokenBalances[0].balance).toEqual(
      'number'
    );
  });

  it('getContractsForOwner()', async () => {
    const response = await alchemy.nft.getContractsForOwner(ownerAddress);

    expect(response.contracts.length).toBeGreaterThan(0);
    verifyNftContractMetadata(response.contracts[0]);
  });

  it('getContractsForOwner() with pageKey', async () => {
    const firstPage = await alchemy.nft.getContractsForOwner(ownerEns);

    expect(firstPage.pageKey).toBeDefined();
    expect(typeof firstPage.pageKey).toEqual('string');

    const response = await alchemy.nft.getContractsForOwner(ownerEns, {
      pageKey: firstPage?.pageKey
    });

    expect(response.contracts[0]).not.toEqual(firstPage.contracts[0]);
  });

  it.each(Object.values(NftFilters))(
    `getContractsForOwner() with includeFilters=[%s]`,
    async includeFilter => {
      const expectedIsSpam = includeFilter === NftFilters.SPAM;

      const response = await alchemy.nft.getContractsForOwner(ownerAddress, {
        includeFilters: [includeFilter]
      });

      response.contracts.forEach(nftSale => {
        expect(nftSale.isSpam).toBe(expectedIsSpam);
      });
    }
  );

  it(`getContractsForOwner() with excludeFilter=[${NftFilters.SPAM}]`, async () => {
    const response = await alchemy.nft.getContractsForOwner(ownerAddress, {
      excludeFilters: [NftFilters.SPAM]
    });

    response.contracts.forEach(nftSale => {
      expect(nftSale.isSpam).toBe(false);
    });
  });

  it('getNftsForContract() with pageKey', async () => {
    const nftsForNftContract = await alchemy.nft.getNftsForContract(
      contractAddress
    );

    expect(nftsForNftContract).not.toBeUndefined();
    const nextPage = await alchemy.nft.getNftsForContract(contractAddress, {
      pageKey: nftsForNftContract.pageKey
    });
    expect(nftsForNftContract.nfts[0]).not.toEqual(nextPage.nfts[0]);
  });

  it('getNftsForContract() with limit', async () => {
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

  it('getNftsForOwnerIterator()', async () => {
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

  it('getNftsForContractIterator()', async () => {
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

  it('getMintedNfts()', async () => {
    // Handles paging
    const response = await alchemy.nft.getMintedNfts('vitalik.eth');
    expect(response.pageKey).toBeDefined();
    expect(response.nfts.length).toBeGreaterThan(0);
    const responseWithPageKey = await alchemy.nft.getMintedNfts('vitalik.eth', {
      pageKey: response.pageKey
    });
    expect(responseWithPageKey.nfts.length).toBeGreaterThan(0);
    expect(response).not.toEqual(responseWithPageKey);

    // Handles ERC1155 NFT mints.
    const response3 = await alchemy.nft.getMintedNfts('vitalik.eth', {
      tokenType: NftTokenType.ERC1155
    });
    const nfts1155 = response3.nfts.filter(
      nft => nft.tokenType === NftTokenType.ERC1155
    );
    expect(nfts1155.length).toEqual(response3.nfts.length);

    // // Handles ERC721 NFT mints.
    const response4 = await alchemy.nft.getMintedNfts('vitalik.eth', {
      tokenType: NftTokenType.ERC721
    });
    const nfts721 = response4.nfts.filter(
      // Some 721 transfers are ingested as NftTokenType.UNKNOWN.
      nft => nft.tokenType !== NftTokenType.ERC1155
    );
    expect(nfts721.length).toEqual(response4.nfts.length);

    // Handles contract address specifying.
    const contractAddresses = [
      '0xa1eb40c284c5b44419425c4202fa8dabff31006b',
      '0x8442864d6ab62a9193be2f16580c08e0d7bcda2f'
    ];
    const response5 = await alchemy.nft.getMintedNfts('vitalik.eth', {
      contractAddresses
    });
    const nftsWithAddress = response5.nfts.filter(nft =>
      contractAddresses.includes(nft.contract.address)
    );
    expect(nftsWithAddress.length).toEqual(response5.nfts.length);
  });

  it('verifyNftOwnership() boolean', async () => {
    const response = await alchemy.nft.verifyNftOwnership(
      ownerAddress,
      contractAddress
    );
    expect(typeof response).toEqual('boolean');
  });

  it('verifyNftOwnership() map', async () => {
    const response = await alchemy.nft.verifyNftOwnership(ownerAddress, [
      contractAddress
    ]);
    expect(response[contractAddress]).toBeDefined();
    expect(typeof response[contractAddress]).toEqual('boolean');
  });

  it('refreshNftMetadata()', async () => {
    const contractAddress = '0x0510745d2ca36729bed35c818527c4485912d99e';
    const tokenId = '404';
    await alchemy.nft.refreshNftMetadata(contractAddress, tokenId);

    const nft = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
    await alchemy.nft.refreshNftMetadata(nft.contract.address, nft.tokenId);
  });

  it('isSpamContract()', async () => {
    const response = await alchemy.nft.isSpamContract(contractAddress);
    expect(typeof response).toEqual('boolean');
  });

  it('getSpamContracts()', async () => {
    const response = await alchemy.nft.getSpamContracts();
    expect(response.length).toBeGreaterThan(0);
    expect(typeof response[0]).toEqual('string');
  });

  it('getFloorPrice()', async () => {
    const response = await alchemy.nft.getFloorPrice(contractAddress);
    expect(response.openSea).toBeDefined();
    expect(response.looksRare).toBeDefined();
  });

  it('getNftSales()', async () => {
    const response = await alchemy.nft.getNftSales({
      contractAddress: '0xe785E82358879F061BC3dcAC6f0444462D4b5330',
      tokenId: 44
    });

    expect(response.pageKey).toBeDefined();
    verifyNftSalesData(response);
  });

  it('getNftSales() with token', async () => {
    const response = await alchemy.nft.getNftSales({
      contractAddress: '0xe785E82358879F061BC3dcAC6f0444462D4b5330',
      tokenId: 44
    });

    verifyNftSalesData(response);
    expect(response.nftSales[0].royaltyFee).toBeDefined();
    expect(response.nftSales[0].marketplaceFee).toBeDefined();
    expect(response.nftSales[0].protocolFee).toBeDefined();
    expect(response.nftSales[0].sellerFee).toBeDefined();
  });

  it('getNftSales() with pageKey', async () => {
    const firstPage = await alchemy.nft.getNftSales();

    expect(firstPage.pageKey).not.toBeUndefined();
    const response = await alchemy.nft.getNftSales({
      pageKey: firstPage?.pageKey
    });

    expect(response.nftSales[0]).not.toEqual(firstPage.nftSales[0]);
  });

  it('getNftSales() with contractAddress', async () => {
    const contractAddress = '0xaf1cfc6b4104c797149fb7a294f7d46f7ec27b80';

    const response = await alchemy.nft.getNftSales({ contractAddress });

    expect(response.nftSales.length).toBeGreaterThan(0);
    expect(response.nftSales[0].contractAddress).toEqual(contractAddress);
  });

  it.each(
    Object.values(NftSaleMarketplace).filter(
      v => v !== NftSaleMarketplace.UNKNOWN
    )
  )(`getNftSales() with marketplace=%s`, async marketplace => {
    const response = await alchemy.nft.getNftSales({
      marketplace,
      limit: 10
    });

    response.nftSales.forEach(nftSale => {
      expect(nftSale.marketplace).toEqual(marketplace);
    });
  });

  it('computeRarity()', async () => {
    const contractAddress = '0x0510745d2ca36729bed35c818527c4485912d99e';
    const tokenId = '403';

    const response = await alchemy.nft.computeRarity(contractAddress, tokenId);

    expect(response).toBeDefined();
    expect(response.length).toBeGreaterThan(0);
    expect(response[0].prevalence).toBeDefined();
    expect(response[0].traitType).toBeDefined();
    expect(response[0].value).toBeDefined();
  });

  it('searchContractMetadata()', async () => {
    const query = 'meta alchemy';

    const response = await alchemy.nft.searchContractMetadata(query);

    expect(response).toBeDefined();
    expect(response.length).toBeGreaterThan(0);
    expect(response[0].address).toBeDefined();
    expect(typeof response[0].address).toEqual('string');
    expect(response[0].tokenType).toBeDefined();
    expect(response[0].tokenType).toEqual(NftTokenType.ERC1155);
  });

  it('summarizeNftAttributes()', async () => {
    const contractAddress = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';

    const response = await alchemy.nft.summarizeNftAttributes(contractAddress);

    expect(response).toBeDefined();
    expect(response.contractAddress).toBeDefined();
    expect(response.contractAddress).toEqual(contractAddress);
    expect(response.totalSupply).toBeDefined();
    expect(typeof response.totalSupply).toEqual('number');
    expect(response.summary).toBeDefined();
  });

  it('refreshNftContract()', async () => {
    const contractAddress = '0x0510745d2ca36729bed35c818527c4485912d99e';
    const result = await alchemy.nft.refreshContract(contractAddress);
    expect(result.contractAddress).toBeDefined();
  });
});
