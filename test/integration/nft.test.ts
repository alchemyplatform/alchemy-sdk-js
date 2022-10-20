import { Alchemy, NftExcludeFilters, NftTokenType } from '../../src';

jest.setTimeout(50000);

// These integration tests check for valid response types and protect against
// regressions in the backend.
describe('E2E integration tests', () => {
  let alchemy: Alchemy;
  const ownerAddress = '0x65d25E3F2696B73b850daA07Dd1E267dCfa67F2D';
  const contractAddress = '0x01234567bac6ff94d7e4f0ee23119cf848f93245';

  beforeAll(async () => {
    alchemy = await new Alchemy();

    // Skip all timeouts for testing.
    jest.setTimeout(50000);
  });

  it('getNftMetadata()', async () => {
    const contractAddress = '0x0510745d2ca36729bed35c818527c4485912d99e';
    const tokenId = 403;
    const response = await alchemy.nft.getNftMetadata(
      contractAddress,
      tokenId,
      NftTokenType.UNKNOWN
    );
    expect(response.media).toBeDefined();
  });

  it('getContractMetadata()', async () => {
    const response = await alchemy.nft.getContractMetadata(contractAddress);
    expect(typeof response.totalSupply).toEqual('string');
    expect(typeof response.symbol).toEqual('string');
    expect(response.tokenType).toEqual(NftTokenType.ERC721);
    expect(response.address).toEqual(contractAddress);
    expect(typeof response.name).toEqual('string');
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
    expect(response.ownedNfts.length).toEqual(51);
  });

  it('getOwnersForNft() from NFT', async () => {
    const nfts = await alchemy.nft.getNftsForOwner(ownerAddress, {
      excludeFilters: [NftExcludeFilters.SPAM],
      omitMetadata: true
    });
    expect(nfts.ownedNfts.length).toBeGreaterThan(0);

    const nfts2 = await alchemy.nft.getNftsForOwner(ownerAddress, {
      excludeFilters: [NftExcludeFilters.AIRDROPS],
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
      excludeFilters: [NftExcludeFilters.SPAM]
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

  it('getNftsForContract() with pageKey', async () => {
    const nftsForNftContract = await alchemy.nft.getNftsForContract(
      contractAddress
    );

    const nextPage = await alchemy.nft.getNftsForContract(contractAddress, {
      pageKey: nftsForNftContract.pageKey
    });
    expect(nftsForNftContract.nfts).not.toEqual(nextPage.nfts);
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
