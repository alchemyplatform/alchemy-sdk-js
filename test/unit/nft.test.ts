import { NftTokenType, toHex } from '../../src';
import { getBaseNftFromRaw, getNftFromRaw } from '../../src/util/util';
import { createRawBaseNft, createRawNft } from '../test-util';

describe('BaseNft', () => {
  const contractAddress = '0xCA1';
  const tokenId = '0x01';
  const tokenIdString = '1';
  it('getBaseNftFromRaw() defaults to UNKNOWN token type and normalizes capitalization', () => {
    const nft = getBaseNftFromRaw(createRawBaseNft(contractAddress, tokenId));
    expect(nft.tokenType).toEqual(NftTokenType.UNKNOWN);
    expect(nft.tokenId).toEqual(tokenIdString);
    expect(nft.contract.address).toEqual(contractAddress);
  });

  it('normalizes tokenId fields', () => {
    const tokenIdIntegerAsString = '42';
    const tokenIdHex = toHex(42);
    let nft = getBaseNftFromRaw(createRawBaseNft(contractAddress, tokenIdHex));
    expect(nft.tokenId).toEqual(tokenIdIntegerAsString);

    nft = getBaseNftFromRaw(
      createRawBaseNft(contractAddress, tokenIdIntegerAsString)
    );
    expect(nft.tokenId).toEqual(tokenIdIntegerAsString);
  });
});

describe('Nft class', () => {
  const contractAddress = '0xCA1';
  const tokenId = 1;
  const tokenIdString = '1';
  it('geNftFromRaw() defaults to UNKNOWN token type', () => {
    let nft = getNftFromRaw(
      createRawNft(contractAddress, 'title', toHex(tokenId))
    );
    expect(nft.tokenType).toEqual(NftTokenType.UNKNOWN);
    expect(nft.tokenId).toEqual(tokenIdString);
    expect(nft.contract.address).toEqual(contractAddress);

    nft = getNftFromRaw(
      createRawNft(
        contractAddress,
        'title',
        toHex(tokenId),
        'ERC721' as NftTokenType
      )
    );
    expect(nft.tokenType).toEqual(NftTokenType.ERC721);

    nft = getNftFromRaw(
      createRawNft(
        contractAddress,
        'title',
        toHex(tokenId),
        'ERC721' as NftTokenType
      )
    );
    expect(nft.tokenType).toEqual(NftTokenType.ERC721);
  });

  it('getNftFromRaw() normalizes tokenId fields', () => {
    const tokenIdIntegerAsString = '42';
    const tokenIdHex = toHex(42);
    let nft = getNftFromRaw(createRawNft(contractAddress, 'title', tokenIdHex));
    expect(nft.tokenId).toEqual(tokenIdIntegerAsString);

    nft = getNftFromRaw(
      createRawNft(contractAddress, 'title', tokenIdIntegerAsString)
    );
    expect(nft.tokenId).toEqual(tokenIdIntegerAsString);
  });
});
