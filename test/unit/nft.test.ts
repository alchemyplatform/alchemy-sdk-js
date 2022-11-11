import { NftTokenType, toHex } from '../../src';
import { getBaseNftFromRaw, getNftFromRaw } from '../../src/util/util';
import { createNft, createRawBaseNft, createRawNft } from '../test-util';

describe('BaseNft class', () => {
  const contractAddress = '0xCA1';
  const tokenId = '0x01';
  const tokenIdString = '1';
  it('fromResponse() defaults to UNKNOWN token type and normalizes capitalization', () => {
    let nft = getBaseNftFromRaw(createRawBaseNft(contractAddress, tokenId));
    expect(nft.tokenType).toEqual(NftTokenType.UNKNOWN);
    expect(nft.tokenId).toEqual(tokenIdString);
    expect(nft.contract.address).toEqual(contractAddress);

    nft = getBaseNftFromRaw(
      createRawBaseNft(contractAddress, tokenId, 'erc721' as NftTokenType)
    );
    expect(nft.tokenType).toEqual(NftTokenType.ERC721);

    nft = getBaseNftFromRaw(
      createRawBaseNft(contractAddress, tokenId, 'ERC721' as NftTokenType)
    );
    expect(nft.tokenType).toEqual(NftTokenType.ERC721);
  });

  it('fromResponse() normalizes tokenId fields', () => {
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
  it('fromResponse() defaults to UNKNOWN token type', () => {
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
        'erc721' as NftTokenType
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

  it('fromResponse() normalizes tokenId fields', () => {
    const tokenIdIntegerAsString = '42';
    const tokenIdHex = toHex(42);
    let nft = getNftFromRaw(createRawNft(contractAddress, 'title', tokenIdHex));
    expect(nft.tokenId).toEqual(tokenIdIntegerAsString);

    nft = getNftFromRaw(
      createRawNft(contractAddress, 'title', tokenIdIntegerAsString)
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
      '0xCA1',
      'title',
      tokenIdString,
      NftTokenType.ERC721,
      {
        tokenUri: { raw: '', gateway: '' },
        timeLastUpdated: '2022-02-16T17:12:00.280Z',
        description
      }
    );
    const nft = getNftFromRaw(rawNft);
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
