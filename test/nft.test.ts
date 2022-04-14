import { BaseNft, Nft, NftTokenType, toHex } from '../src';
import { createNft, createRawBaseNft, createRawNft } from './test-util';

describe('BaseNft class', () => {
  const contractAddress = '0xCA1';
  const tokenId = '0x01';
  it('fromResponse() defaults to UNKNOWN token type', () => {
    const nft = BaseNft.fromResponse(
      createRawBaseNft(tokenId),
      contractAddress
    );
    expect(nft.tokenType).toEqual(NftTokenType.UNKNOWN);
    expect(nft.tokenId).toEqual(tokenId);
    expect(nft.address).toEqual(contractAddress);
  });

  it('fromResponse() normalizes tokenId fields', () => {
    const tokenIdIntegerAsString = '42';
    const tokenIdHex = toHex(42);
    let nft = BaseNft.fromResponse(
      createRawBaseNft(tokenIdHex),
      contractAddress
    );
    expect(nft.tokenId).toEqual(tokenIdHex);

    nft = BaseNft.fromResponse(
      createRawBaseNft(tokenIdIntegerAsString),
      contractAddress
    );
    expect(nft.tokenId).toEqual(tokenIdHex);
  });
});

describe('Nft class', () => {
  const contractAddress = '0xCA1';
  const tokenId = 1;
  it('fromResponse() defaults to UNKNOWN token type', () => {
    const nft = Nft.fromResponse(
      createRawNft('title', toHex(tokenId)),
      contractAddress
    );
    expect(nft.tokenType).toEqual(NftTokenType.UNKNOWN);
    expect(nft.tokenId).toEqual(toHex(tokenId));
    expect(nft.address).toEqual(contractAddress);
  });

  it('fromResponse() normalizes tokenId fields', () => {
    const tokenIdIntegerAsString = '42';
    const tokenIdHex = toHex(42);
    let nft = Nft.fromResponse(
      createRawNft('title', tokenIdHex),
      contractAddress
    );
    expect(nft.tokenId).toEqual(tokenIdHex);

    nft = Nft.fromResponse(
      createRawNft('title', tokenIdIntegerAsString),
      contractAddress
    );
    expect(nft.tokenId).toEqual(tokenIdHex);
  });

  it('constructor parses token uri and media fields', () => {
    const rawTokenUri = {
      raw: '',
      gateway: ''
    };
    const rawMedia = [
      { raw: '', gateway: '' },
      { raw: 'raw', gateway: 'gateway' },
      { raw: '', gateway: 'gateway' },
      { raw: 'raw', gateway: '' }
    ];
    const nft = createNft(
      'title',
      contractAddress,
      toHex(tokenId),
      NftTokenType.UNKNOWN,
      rawTokenUri,
      rawMedia
    );
    expect(nft.tokenUri).toBeUndefined();
    expect(nft.media.length).toEqual(3);
    expect(nft.media[0]).toEqual(rawMedia[1]);
    expect(nft.media[1]).toEqual(rawMedia[2]);
    expect(nft.media[2]).toEqual(rawMedia[3]);
  });

  it('media field is set to empty array even if undefined ', () => {
    const nft = createNft(
      'title',
      contractAddress,
      toHex(tokenId),
      NftTokenType.ERC721,
      undefined,
      undefined
    );
    expect(nft.tokenUri).toBeUndefined();
    expect(nft.media.length).toEqual(0);
  });
});
