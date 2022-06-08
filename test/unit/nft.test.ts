import { BaseNft, Nft, NftTokenType, toHex } from '../../src';
import { createNft, createRawBaseNft, createRawNft } from '../test-util';

describe('BaseNft class', () => {
  const contractAddress = '0xCA1';
  const tokenId = '0x01';
  const tokenIdString = '1';
  it('fromResponse() defaults to UNKNOWN token type', () => {
    const nft = BaseNft.fromResponse(
      createRawBaseNft(tokenId),
      contractAddress
    );
    expect(nft.tokenType).toEqual(NftTokenType.UNKNOWN);
    expect(nft.tokenId).toEqual(tokenIdString);
    expect(nft.contract.address).toEqual(contractAddress);
  });

  it('fromResponse() normalizes tokenId fields', () => {
    const tokenIdIntegerAsString = '42';
    const tokenIdHex = toHex(42);
    let nft = BaseNft.fromResponse(
      createRawBaseNft(tokenIdHex),
      contractAddress
    );
    expect(nft.tokenId).toEqual(tokenIdIntegerAsString);

    nft = BaseNft.fromResponse(
      createRawBaseNft(tokenIdIntegerAsString),
      contractAddress
    );
    expect(nft.tokenId).toEqual(tokenIdIntegerAsString);
  });
});

describe('Nft class', () => {
  const contractAddress = '0xCA1';
  const tokenId = 1;
  const tokenIdString = '1';
  it('fromResponse() defaults to UNKNOWN token type', () => {
    const nft = Nft.fromResponse(
      createRawNft('title', toHex(tokenId)),
      contractAddress
    );
    expect(nft.tokenType).toEqual(NftTokenType.UNKNOWN);
    expect(nft.tokenId).toEqual(tokenIdString);
    expect(nft.contract.address).toEqual(contractAddress);
  });

  it('fromResponse() normalizes tokenId fields', () => {
    const tokenIdIntegerAsString = '42';
    const tokenIdHex = toHex(42);
    let nft = Nft.fromResponse(
      createRawNft('title', tokenIdHex),
      contractAddress
    );
    expect(nft.tokenId).toEqual(tokenIdIntegerAsString);

    nft = Nft.fromResponse(
      createRawNft('title', tokenIdIntegerAsString),
      contractAddress
    );
    expect(nft.tokenId).toEqual(tokenIdIntegerAsString);
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

  it('constructor merges descriptions when it is an array', () => {
    const description = ['very', 'special', 'and unique', 'description'];

    const rawNft = createRawNft(
      'title',
      tokenIdString,
      NftTokenType.ERC721,
      { raw: '', gateway: '' },
      [],
      '2022-02-16T17:12:00.280Z',
      description
    );
    const nft = Nft.fromResponse(rawNft, '0xCA1');
    expect(nft.description).toEqual('very special and unique description');
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
