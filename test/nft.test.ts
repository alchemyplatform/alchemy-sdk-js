import { BaseNft, Nft, NftTokenType } from '../src';
import { createRawBaseNft, createRawNft } from './test-util';

describe('BaseNft class', () => {
  const contractAddress = '0xCA1';
  const tokenId = '0x1';
  it('fromResponse() defaults to UNKNOWN token type', () => {
    const nft = BaseNft.fromResponse(
      createRawBaseNft(tokenId),
      contractAddress
    );
    expect(nft.tokenType).toEqual(NftTokenType.UNKNOWN);
    expect(nft.tokenId).toEqual(tokenId);
    expect(nft.address).toEqual(contractAddress);
  });
});

describe('Nft class', () => {
  const contractAddress = '0xCA1';
  const tokenId = '0x1';
  it('fromResponse() defaults to UNKNOWN token type', () => {
    const nft = Nft.fromResponse(
      createRawNft('title', tokenId),
      contractAddress
    );
    expect(nft.tokenType).toEqual(NftTokenType.UNKNOWN);
    expect(nft.tokenId).toEqual(tokenId);
    expect(nft.address).toEqual(contractAddress);
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
    const nft = new Nft(
      'address',
      tokenId,
      NftTokenType.UNKNOWN,
      'title',
      'description',
      '2022-02-16T17:12:00.280Z',
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
    const nft = new Nft(
      'address',
      tokenId,
      NftTokenType.UNKNOWN,
      'title',
      'description',
      '2022-02-16T17:12:00.280Z',
      undefined,
      undefined
    );
    expect(nft.tokenUri).toBeUndefined();
    expect(nft.media.length).toEqual(0);
  });
});
