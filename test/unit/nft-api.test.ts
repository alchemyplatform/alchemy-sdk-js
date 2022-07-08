import {
  Alchemy,
  BaseNft,
  NftContractBaseNftsResponse,
  NftContractNftsResponse,
  fromHex,
  GetNftFloorPriceResponse,
  GetNftsForOwnerOptions,
  NftContract,
  NftExcludeFilters,
  NftTokenType,
  OwnedBaseNft,
  OwnedBaseNftsResponse,
  OwnedNft,
  OwnedNftsResponse,
  Nft
} from '../../src';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  createBaseNft,
  createBaseNftContract,
  createNft,
  createOwnedBaseNft,
  createOwnedNft,
  createRawNftContractBaseNft,
  createRawNft,
  createRawNftContract,
  createRawOwnedBaseNft,
  createRawOwnedNft
} from '../test-util';
import {
  RawGetBaseNftsForNftContractResponse,
  RawGetBaseNftsResponse,
  RawGetNftsForNftContractResponse,
  RawGetNftsResponse
} from '../../src/internal/raw-interfaces';
import { getNftContractFromRaw, getNftFromRaw } from '../../src/util/util';

describe('NFT module', () => {
  let alchemy: Alchemy;
  let mock: MockAdapter;

  beforeAll(async () => {
    alchemy = new Alchemy();
    mock = new MockAdapter(axios);

    // Skip all timeouts for testing.
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout').mockImplementation((f: any) => f());
  });

  afterEach(() => {
    mock.reset();
  });

  describe('getNftContractMetadata()', () => {
    const address = '0xABC';
    const name = 'NFT Contract Name';
    const symbol = 'NCN';
    const totalSupply = 9999;
    const tokenType = NftTokenType.ERC721;

    const rawNftContractResponse = createRawNftContract(
      address,
      tokenType,
      name,
      symbol,
      totalSupply
    );
    const expectedNftContract = getNftContractFromRaw(rawNftContractResponse);

    beforeEach(() => {
      mock.onGet().reply(200, rawNftContractResponse);
    });

    function verifyNftContractMetadata(
      actualNftContract: NftContract,
      expectedNftContract: NftContract,
      address: string,
      name: string,
      symbol: string,
      totalSupply: number,
      tokenType?: NftTokenType
    ) {
      expect(actualNftContract).toEqual(expectedNftContract);

      expect(actualNftContract.address).toEqual(address);
      expect(actualNftContract.name).toEqual(name);
      expect(actualNftContract.symbol).toEqual(symbol);
      expect(actualNftContract.totalSupply).toEqual(totalSupply);
      expect(actualNftContract.tokenType).toEqual(tokenType);

      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        address
      );
    }

    it('can be called with a BaseNftContract', async () => {
      const nftContract = createBaseNftContract(address);
      verifyNftContractMetadata(
        await alchemy.getNftContractMetadata(nftContract),
        expectedNftContract,
        address,
        name,
        symbol,
        totalSupply,
        tokenType
      );
    });

    it('can be called with raw parameters', async () => {
      verifyNftContractMetadata(
        await alchemy.getNftContractMetadata(address),
        expectedNftContract,
        address,
        name,
        symbol,
        totalSupply,
        tokenType
      );
    });

    it('surfaces errors', async () => {
      mock.reset();
      mock.onGet().reply(500, 'Internal Server Error');
      await expect(alchemy.getNftContractMetadata(address)).rejects.toThrow(
        'Internal Server Error'
      );
    });
  });

  describe('getNftMetadata()', () => {
    const contractAddress = '0xABC';
    const title = 'NFT Title';
    const tokenId = '42';
    // Special case token ID as an integer string, since that's what the NFT
    // API endpoint returns.
    const rawNftResponse = createRawNft(title, tokenId.toString());
    const expectedNft = getNftFromRaw(rawNftResponse, contractAddress);

    beforeEach(() => {
      mock.onGet().reply(200, rawNftResponse);
    });

    function verifyNftMetadata(
      actualNft: Nft,
      expectedNft: Nft,
      contractAddress: string,
      tokenId: string,
      tokenType?: NftTokenType
    ) {
      expect(actualNft).toEqual(expectedNft);
      expect(actualNft.tokenId).toEqual(tokenId);
      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );
      expect(mock.history.get[0].params).toHaveProperty('tokenId', tokenId);
      expect(mock.history.get[0].params).toHaveProperty(
        'tokenType',
        tokenType ?? undefined
      );
    }

    it('can be called with a BaseNft', async () => {
      const nft = createBaseNft(contractAddress, tokenId, NftTokenType.ERC721);
      verifyNftMetadata(
        await alchemy.getNftMetadata(nft),
        expectedNft,
        contractAddress,
        tokenId,
        NftTokenType.ERC721
      );
    });

    it('can be called with raw parameters', async () => {
      verifyNftMetadata(
        await alchemy.getNftMetadata(
          contractAddress,
          tokenId,
          NftTokenType.ERC1155
        ),
        expectedNft,
        contractAddress,
        tokenId,
        NftTokenType.ERC1155
      );
    });

    it('normalizes tokenId as a hex string', async () => {
      verifyNftMetadata(
        await alchemy.getNftMetadata(
          contractAddress,
          tokenId,
          NftTokenType.ERC1155
        ),
        expectedNft,
        contractAddress,
        tokenId,
        NftTokenType.ERC1155
      );
    });

    it('sets tokenType to undefined if tokenType is UNKNOWN', async () => {
      verifyNftMetadata(
        await alchemy.getNftMetadata(
          contractAddress,
          tokenId,
          NftTokenType.UNKNOWN
        ),
        expectedNft,
        contractAddress,
        tokenId
      );
    });

    it('surfaces errors', async () => {
      mock.reset();
      mock.onGet().reply(500, 'Internal Server Error');
      await expect(
        alchemy.getNftMetadata(contractAddress, tokenId)
      ).rejects.toThrow('Internal Server Error');
    });
  });

  describe('getNftsForOwner()', () => {
    const ownerAddress = '0xABC';
    const pageKey = 'page-key0';
    const contractAddresses = ['0xCA1', '0xCA2'];
    const excludeFilters = [NftExcludeFilters.SPAM];
    const expectedFilters = ['SPAM'];
    const getNftsParams: GetNftsForOwnerOptions = {
      pageKey,
      contractAddresses,
      excludeFilters
    };
    const baseNftResponse: RawGetBaseNftsResponse = {
      ownedNfts: [
        createRawOwnedBaseNft('0xCA1', '0x1', '1'),
        createRawOwnedBaseNft('0xCA2', '0x2', '2', NftTokenType.ERC721)
      ],
      pageKey: 'page-key1',
      totalCount: 3
    };

    const nftResponse: RawGetNftsResponse = {
      ownedNfts: [
        createRawOwnedNft('a', '0xCA1', '0x1', '1'),
        createRawOwnedNft('b', '0xCA2', '0x2', '2', NftTokenType.ERC1155)
      ],
      pageKey: 'page-key1',
      totalCount: 3
    };

    const paramCases = [
      [true, false],
      [false, true],
      [undefined, true]
    ];
    it.each(paramCases)(
      'called with the correct parameters',
      async (omitMetadata, expectedWithMetadata) => {
        mock.onGet().reply(200, nftResponse);
        await alchemy.getNftsForOwner(ownerAddress, {
          ...getNftsParams,
          omitMetadata
        });
        expect(mock.history.get.length).toEqual(1);
        expect(mock.history.get[0].params).toHaveProperty(
          'owner',
          ownerAddress
        );
        expect(mock.history.get[0].params).toHaveProperty(
          'contractAddresses',
          contractAddresses
        );
        expect(mock.history.get[0].params).toHaveProperty(
          'filters',
          expectedFilters
        );
        expect(mock.history.get[0].params).toHaveProperty('pageKey', pageKey);
        expect(mock.history.get[0].params).toHaveProperty(
          'withMetadata',
          expectedWithMetadata
        );
      }
    );

    const baseExpected: OwnedBaseNftsResponse = {
      ownedNfts: [
        createOwnedBaseNft('0xCA1', '0x1', 1),
        createOwnedBaseNft('0xCA2', '0x2', 2, NftTokenType.ERC721)
      ],
      pageKey: 'page-key1',
      totalCount: 3
    };
    const nftExpected: OwnedNftsResponse = {
      ownedNfts: [
        createOwnedNft('a', '0xCA1', '0x1', 1),
        createOwnedNft('b', '0xCA2', '0x2', 2, NftTokenType.ERC1155)
      ],
      pageKey: 'page-key1',
      totalCount: 3
    };
    const responseCases: Array<
      [
        boolean,
        RawGetBaseNftsResponse | RawGetNftsResponse,
        OwnedBaseNftsResponse | OwnedNftsResponse
      ]
    > = [
      [true, baseNftResponse, baseExpected],
      [false, nftResponse, nftExpected]
    ];
    it.each(responseCases)(
      'normalizes fields in response',
      async (omitMetadata, rawResponse, expected) => {
        mock.onGet().reply(200, rawResponse);
        const response = await alchemy.getNftsForOwner(ownerAddress, {
          ...getNftsParams,
          omitMetadata
        });
        expect(response).toEqual(expected);
      }
    );

    it.each(responseCases)('surfaces errors', async omitMetadata => {
      mock.reset();
      mock.onGet().reply(500, 'Internal Server Error');
      await expect(
        alchemy.getNftsForOwner(ownerAddress, {
          ...getNftsParams,
          omitMetadata
        })
      ).rejects.toThrow('Internal Server Error');
    });

    it('uses the correct overload with no options', async () => {
      mock.onGet().reply(200, nftResponse);
      const response = await alchemy.getNftsForOwner(ownerAddress);
      response.ownedNfts.forEach(nft => expect(nft.media).toBeDefined());
    });
  });

  describe('getNftsForOwnerIterator()', () => {
    const ownerAddress = '0xABC';
    const contractAddresses = ['0xCA1', '0xCA2'];
    const excludeFilters = [NftExcludeFilters.SPAM];
    const expectedFilters = ['SPAM'];
    const baseResponses: RawGetBaseNftsResponse[] = [
      {
        ownedNfts: [
          createRawOwnedBaseNft('0xCA1', '0x1', '1'),
          createRawOwnedBaseNft('0xCA2', '0x2', '2', NftTokenType.ERC721)
        ],
        pageKey: 'page-key1',
        totalCount: 3
      },
      {
        ownedNfts: [
          createRawOwnedBaseNft('0xCA2', '0x3', '1', NftTokenType.ERC721)
        ],
        totalCount: 3
      }
    ];
    const nftResponses: RawGetNftsResponse[] = [
      {
        ownedNfts: [
          createRawOwnedNft('a', '0xCA1', '0x1', '1'),
          createRawOwnedNft('b', '0xCA2', '0x2', '2', NftTokenType.ERC1155)
        ],
        pageKey: 'page-key1',
        totalCount: 3
      },
      {
        ownedNfts: [
          createRawOwnedNft('c', '0xCA2', '0x3', '1', NftTokenType.ERC1155)
        ],
        totalCount: 3
      }
    ];

    function setupMock(
      mockResponses: RawGetBaseNftsResponse[] | RawGetNftsResponse[]
    ): void {
      mock
        .onGet()
        .replyOnce(200, mockResponses[0])
        .onGet()
        .replyOnce(200, mockResponses[1]);
    }

    const paramCases: Array<
      [
        RawGetBaseNftsResponse[] | RawGetNftsResponse[],
        boolean | undefined,
        boolean
      ]
    > = [
      [baseResponses, true, false],
      [nftResponses, false, true],
      [nftResponses, undefined, true]
    ];
    it.each(paramCases)(
      'traverses all page keys and uses correct parameters',
      async (mockResponses, omitMetadata, expectedWithMetadata) => {
        setupMock(mockResponses);
        const ownedNfts = [];
        for await (const ownedNft of alchemy.getNftsForOwnerIterator(
          ownerAddress,
          {
            excludeFilters,
            contractAddresses,
            omitMetadata
          }
        )) {
          ownedNfts.push(ownedNft);
        }

        expect(mock.history.get.length).toEqual(2);
        expect(mock.history.get[0].params).toHaveProperty('pageKey', undefined);
        expect(mock.history.get[0].params).toHaveProperty(
          'owner',
          ownerAddress
        );
        expect(mock.history.get[0].params).toHaveProperty(
          'contractAddresses',
          contractAddresses
        );
        expect(mock.history.get[0].params).toHaveProperty(
          'withMetadata',
          expectedWithMetadata
        );
        expect(mock.history.get[0].params).toHaveProperty(
          'filters',
          expectedFilters
        );
        expect(mock.history.get[1].params).toHaveProperty(
          'pageKey',
          'page-key1'
        );
        expect(mock.history.get[1].params).toHaveProperty(
          'owner',
          ownerAddress
        );
        expect(mock.history.get[1].params).toHaveProperty(
          'contractAddresses',
          contractAddresses
        );
        expect(mock.history.get[1].params).toHaveProperty(
          'withMetadata',
          expectedWithMetadata
        );
      }
    );

    it.each(paramCases)(
      'can paginate starting from a given page key',
      async (mockResponses, omitMetadata) => {
        setupMock(mockResponses);
        const ownedNfts = [];
        for await (const ownedNft of alchemy.getNftsForOwnerIterator(
          ownerAddress,
          {
            pageKey: 'page-key0',
            omitMetadata
          }
        )) {
          ownedNfts.push(ownedNft);
        }

        expect(mock.history.get.length).toEqual(2);
        expect(mock.history.get[0].params).toHaveProperty(
          'pageKey',
          'page-key0'
        );
        expect(mock.history.get[1].params).toHaveProperty(
          'pageKey',
          'page-key1'
        );
      }
    );

    const baseExpected = [
      createOwnedBaseNft('0xCA1', '0x1', 1),
      createOwnedBaseNft('0xCA2', '0x2', 2, NftTokenType.ERC721),
      createOwnedBaseNft('0xCA2', '0x3', 1, NftTokenType.ERC721)
    ];
    const nftExpected = [
      createOwnedNft('a', '0xCA1', '0x1', 1),
      createOwnedNft('b', '0xCA2', '0x2', 2, NftTokenType.ERC1155),
      createOwnedNft('c', '0xCA2', '0x3', 1, NftTokenType.ERC1155)
    ];
    const responseCases: Array<
      [
        boolean,
        RawGetBaseNftsResponse[] | RawGetNftsResponse[],
        OwnedBaseNft[] | OwnedNft[]
      ]
    > = [
      [true, baseResponses, baseExpected],
      [false, nftResponses, nftExpected]
    ];
    it.each(responseCases)(
      'normalizes responses',
      async (omitMetadata, mockResponses, expected) => {
        setupMock(mockResponses);
        const nfts = [];
        for await (const ownedNft of alchemy.getNftsForOwnerIterator(
          ownerAddress,
          {
            contractAddresses,
            omitMetadata
          }
        )) {
          nfts.push(ownedNft);
        }

        expect(nfts).toEqual(expected);
      }
    );

    it.each(responseCases)(
      'yields NFTs until an error is thrown',
      async (omitMetadata, mockResponses) => {
        mock
          .onGet()
          .replyOnce(200, mockResponses[0])
          .onGet()
          .replyOnce(500, 'Internal Server Error');

        const tokenIds: number[] = [];
        try {
          for await (const ownedNft of alchemy.getNftsForOwnerIterator(
            ownerAddress,
            {
              omitMetadata
            }
          )) {
            tokenIds.push(fromHex(ownedNft.tokenId));
          }
          fail('getNftsIterator should have surfaced error');
        } catch (e) {
          expect(tokenIds).toEqual([1, 2]);
          expect((e as Error).message).toContain('Internal Server Error');
        }
      }
    );

    it('uses the correct overload with no options', async () => {
      setupMock(nftResponses);
      for await (const ownedNft of alchemy.getNftsForOwnerIterator(
        ownerAddress
      )) {
        expect(ownedNft.media).toBeDefined();
      }
    });
  });

  describe('getNftsForNftContract()', () => {
    const contractAddress = '0xCA1';
    const pageKey = 'page-key0';
    const baseResponse: RawGetBaseNftsForNftContractResponse = {
      nfts: [
        createRawNftContractBaseNft('0x1'),
        createRawNftContractBaseNft('0x2')
      ],
      nextToken: 'page-key1'
    };

    const nftResponse: RawGetNftsForNftContractResponse = {
      nfts: [
        createRawNft('a', '0x1', NftTokenType.ERC1155),
        createRawNft('b', '0x2', NftTokenType.ERC1155)
      ],
      nextToken: 'page-key1'
    };

    beforeEach(() => {
      mock.onGet().reply(200, baseResponse);
    });

    const paramCases: Array<
      [
        RawGetBaseNftsForNftContractResponse | RawGetNftsForNftContractResponse,
        boolean | undefined,
        boolean
      ]
    > = [
      [baseResponse, true, false],
      [nftResponse, false, true],
      [nftResponse, undefined, true]
    ];
    it.each(paramCases)(
      'called with the correct parameters',
      async (mockResponse, omitMetadata, expectedWithMetadata) => {
        mock.onGet().reply(200, mockResponse);
        await alchemy.getNftsForNftContract(contractAddress, {
          pageKey,
          omitMetadata
        });
        expect(mock.history.get.length).toEqual(1);
        expect(mock.history.get[0].params).toHaveProperty(
          'contractAddress',
          contractAddress
        );
        expect(mock.history.get[0].params).toHaveProperty(
          'startToken',
          pageKey
        );
        expect(mock.history.get[0].params).toHaveProperty(
          'withMetadata',
          expectedWithMetadata
        );
      }
    );

    const baseExpected: NftContractBaseNftsResponse = {
      nfts: [createBaseNft('0xCA1', '0x1'), createBaseNft('0xCA1', '0x2')],
      pageKey: 'page-key1'
    };
    const nftExpected: NftContractNftsResponse = {
      nfts: [
        createNft('a', '0xCA1', '0x1', NftTokenType.ERC1155),
        createNft('b', '0xCA1', '0x2', NftTokenType.ERC1155)
      ],
      pageKey: 'page-key1'
    };
    const responseCases: Array<
      [
        boolean,
        RawGetBaseNftsForNftContractResponse | RawGetNftsForNftContractResponse,
        NftContractBaseNftsResponse | NftContractNftsResponse
      ]
    > = [
      [true, baseResponse, baseExpected],
      [false, nftResponse, nftExpected]
    ];
    it.each(responseCases)(
      'normalizes responses',
      async (omitMetadata, mockResponse, expected) => {
        mock.onGet().reply(200, mockResponse);
        const response = await alchemy.getNftsForNftContract(contractAddress, {
          pageKey,
          omitMetadata
        });
        expect(response).toEqual(expected);
      }
    );

    it.each(responseCases)('surfaces errors', async omitMetadata => {
      mock.reset();
      mock.onGet().reply(500, 'Internal Server Error');
      await expect(
        alchemy.getNftsForNftContract(contractAddress, {
          omitMetadata
        })
      ).rejects.toThrow('Internal Server Error');
    });

    it('uses the correct overload with no options', async () => {
      mock.onGet().reply(200, nftResponse);
      const response = await alchemy.getNftsForNftContract(contractAddress);
      response.nfts.forEach(nft => expect(nft.media).toBeDefined());
    });
  });

  describe('getNftsForNftContractIterator()', () => {
    const contractAddress = '0xCA1';
    const pageKey = 'page-key0';
    const baseResponses: RawGetBaseNftsForNftContractResponse[] = [
      {
        nfts: [
          createRawNftContractBaseNft('0x1'),
          createRawNftContractBaseNft('0x2')
        ],
        nextToken: 'page-key1'
      },
      {
        nfts: [createRawNftContractBaseNft('0x3')]
      }
    ];
    const nftResponses: RawGetNftsForNftContractResponse[] = [
      {
        nfts: [
          createRawNft('a', '0x1', NftTokenType.ERC721),
          createRawNft('b', '0x2', NftTokenType.ERC721)
        ],
        nextToken: 'page-key1'
      },
      {
        nfts: [createRawNft('c', '0x3', NftTokenType.ERC721)]
      }
    ];

    function setupMock(
      mockResponses:
        | RawGetBaseNftsForNftContractResponse[]
        | RawGetNftsForNftContractResponse[]
    ): void {
      mock
        .onGet()
        .replyOnce(200, mockResponses[0])
        .onGet()
        .replyOnce(200, mockResponses[1]);
    }

    const paramCases: Array<
      [
        (
          | RawGetBaseNftsForNftContractResponse[]
          | RawGetNftsForNftContractResponse[]
        ),
        boolean | undefined,
        boolean
      ]
    > = [
      [baseResponses, true, false],
      [nftResponses, false, true],
      [nftResponses, undefined, true]
    ];
    it.each(paramCases)(
      'traverses all page keys and uses correct parameters',
      async (mockResponses, omitMetadata, expectedWithMetadata) => {
        setupMock(mockResponses);
        const nfts = [];
        for await (const nft of alchemy.getNftsForNftContractIterator(
          contractAddress,
          {
            omitMetadata
          }
        )) {
          nfts.push(nft);
        }
        expect(mock.history.get.length).toEqual(2);
        expect(mock.history.get[0].params.startToken).toBeUndefined();
        expect(mock.history.get[0].params).toHaveProperty(
          'contractAddress',
          contractAddress
        );
        expect(mock.history.get[0].params).toHaveProperty(
          'withMetadata',
          expectedWithMetadata
        );
        expect(mock.history.get[1].params).toHaveProperty(
          'startToken',
          'page-key1'
        );
        expect(mock.history.get[1].params).toHaveProperty(
          'withMetadata',
          expectedWithMetadata
        );
      }
    );

    it.each(paramCases)(
      'can paginate starting from a given page key',
      async (mockResponses, omitMetadata) => {
        setupMock(mockResponses);
        const nfts = [];
        for await (const nft of alchemy.getNftsForNftContractIterator(
          contractAddress,
          {
            pageKey,
            omitMetadata
          }
        )) {
          nfts.push(nft);
        }
        expect(nfts.length).toEqual(3);
        expect(mock.history.get.length).toEqual(2);
        expect(mock.history.get[0].params).toHaveProperty(
          'startToken',
          'page-key0'
        );
        expect(mock.history.get[1].params).toHaveProperty(
          'startToken',
          'page-key1'
        );
      }
    );

    const baseExpected = [
      createBaseNft(contractAddress, '0x01'),
      createBaseNft(contractAddress, '0x02'),
      createBaseNft(contractAddress, '0x03')
    ];
    const nftExpected = [
      createNft('a', contractAddress, '0x01', NftTokenType.ERC721),
      createNft('b', contractAddress, '0x02', NftTokenType.ERC721),
      createNft('c', contractAddress, '0x03', NftTokenType.ERC721)
    ];
    const responseCases: Array<
      [
        boolean,
        (
          | RawGetBaseNftsForNftContractResponse[]
          | RawGetNftsForNftContractResponse[]
        ),
        BaseNft[] | Nft[]
      ]
    > = [
      [true, baseResponses, baseExpected],
      [false, nftResponses, nftExpected]
    ];
    it.each(responseCases)(
      'normalizes responses',
      async (omitMetadata, mockResponses, expected) => {
        setupMock(mockResponses);
        const nfts = [];
        for await (const ownedNft of alchemy.getNftsForNftContractIterator(
          contractAddress,
          {
            omitMetadata
          }
        )) {
          nfts.push(ownedNft);
        }

        expect(nfts).toEqual(expected);
      }
    );

    it.each(responseCases)(
      'yields NFTs until an error is thrown',
      async (omitMetadata, mockResponses) => {
        mock
          .onGet()
          .replyOnce(200, mockResponses[0])
          .onGet()
          .replyOnce(500, 'Internal Server Error');
        const tokenIds: string[] = [];
        try {
          for await (const nft of alchemy.getNftsForNftContractIterator(
            contractAddress,
            {
              omitMetadata
            }
          )) {
            tokenIds.push(nft.tokenId);
          }
          fail('getNftsForNftContractIterator() should have surfaced error');
        } catch (e) {
          expect(tokenIds).toEqual(['1', '2']);
          expect((e as Error).message).toContain('Internal Server Error');
        }
      }
    );

    it('uses the correct overload with no options', async () => {
      setupMock(nftResponses);
      for await (const nft of alchemy.getNftsForNftContractIterator(
        contractAddress
      )) {
        expect(nft.media).toBeDefined();
      }
    });
  });

  describe('getOwnersForNft()', () => {
    const contractAddress = '0xCA1';
    const tokenIdHex = '0x1b7';
    const tokenIdNumber = '439';
    const owners = ['0x1', '0x2', '0x3'];

    beforeEach(() => {
      mock.onGet().reply(200, {
        owners
      });
    });

    it('calls with the correct parameters', async () => {
      await alchemy.getOwnersForNft(contractAddress, tokenIdHex);
      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );
      expect(mock.history.get[0].params).toHaveProperty(
        'tokenId',
        tokenIdNumber
      );

      await alchemy.getOwnersForNft(contractAddress, tokenIdNumber);
      expect(mock.history.get[0].params).toHaveProperty(
        'tokenId',
        tokenIdNumber
      );
    });

    it('can be called with BaseNft', async () => {
      const response = await alchemy.getOwnersForNft(
        createBaseNft(contractAddress, tokenIdHex)
      );
      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );
      expect(mock.history.get[0].params).toHaveProperty(
        'tokenId',
        tokenIdNumber
      );

      expect(response).toEqual({ owners });
    });

    it('retries with maxAttempts', async () => {
      mock.reset();
      mock.onGet().reply(429, 'Too many requests');

      await expect(
        alchemy.getOwnersForNft(contractAddress, tokenIdHex)
      ).rejects.toThrow('Too many requests');
    });
  });

  describe('getOwnersForNftContract()', () => {
    const contractAddress = '0xCA1';
    const tokenIdHex = '0x1b7';
    const owners = ['0x1', '0x2', '0x3'];

    beforeEach(() => {
      mock.onGet().reply(200, {
        ownerAddresses: owners
      });
    });

    it('calls with the correct parameters', async () => {
      await alchemy.getOwnersForNftContract(contractAddress);
      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );
    });

    it('can be called with BaseNft', async () => {
      const response = await alchemy.getOwnersForNftContract(
        createBaseNft(contractAddress, tokenIdHex)
      );
      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );

      expect(response).toEqual({ owners });
    });

    it('retries with maxAttempts', async () => {
      mock.reset();
      mock.onGet().reply(429, 'Too many requests');

      await expect(
        alchemy.getOwnersForNft(contractAddress, tokenIdHex)
      ).rejects.toThrow('Too many requests');
    });
  });

  describe('checkNftOwnership', () => {
    const owner = '0xABC';
    const addresses = ['0xCA1', '0xCA2'];
    const emptyResponse: RawGetNftsResponse = {
      ownedNfts: [],
      totalCount: 0
    };
    const nftResponse: RawGetNftsResponse = {
      ownedNfts: [
        createRawOwnedNft('a', '0xCA1', '0x1', '1'),
        createRawOwnedNft('b', '0xCA2', '0x2', '2', NftTokenType.ERC1155)
      ],
      totalCount: 2
    };

    it('calls with the correct parameters', async () => {
      mock.onGet().reply(200, emptyResponse);
      await alchemy.checkNftOwnership(owner, addresses);
      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty('owner', owner);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddresses',
        addresses
      );
      expect(mock.history.get[0].params).toHaveProperty('withMetadata', false);
    });

    it('throws if no contract address is passed in', async () => {
      await expect(alchemy.checkNftOwnership(owner, [])).rejects.toThrow(
        'Must provide at least one contract address'
      );
    });

    const cases = [
      [emptyResponse, false],
      [nftResponse, true]
    ];
    it.each(cases)(
      'returns the correct response',
      async (response, expected) => {
        mock.onGet().reply(200, response);
        const result = await alchemy.checkNftOwnership(owner, addresses);
        expect(result).toEqual(expected);
      }
    );
    it('surfaces errors', async () => {
      mock.onGet().reply(500, 'Internal Server Error');
      await expect(alchemy.checkNftOwnership(owner, addresses)).rejects.toThrow(
        'Internal Server Error'
      );
    });
  });

  describe('isSpamNftContract', () => {
    const spamContract = '0x000440f08436a7b866d1ae42db5e0be801da722a';
    it('calls with the correct parameters', async () => {
      mock.onGet().reply(200, true);
      await alchemy.isSpamNftContract(spamContract);
      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        spamContract
      );
    });
  });

  describe('getSpamNftContracts', () => {
    it('calls with the correct parameters', async () => {
      mock.onGet().reply(200, ['0xABC', '0xABD']);
      await alchemy.getSpamNftContracts();
      expect(mock.history.get.length).toEqual(1);
    });
  });

  describe('getNftFloorPrice', () => {
    const contractAddress = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
    const templateResponse: GetNftFloorPriceResponse = {
      openSea: {
        floorPrice: 90.969,
        priceCurrency: 'ETH',
        retrievedAt: '2022-06-29T19:31:18.816Z',
        collectionUrl: 'https://opensea.io/collection/boredapeyachtclub'
      },
      looksRare: {
        floorPrice: 86.2828,
        priceCurrency: 'ETH',
        retrievedAt: '2022-06-29T19:33:18.280Z',
        collectionUrl:
          'https://looksrare.org/collections/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'
      }
    };

    beforeEach(() => {
      mock.onGet().reply(200, templateResponse);
    });

    it('calls with the correct parameters', async () => {
      await alchemy.getNftFloorPrice(contractAddress);
      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );
    });

    it('retries with maxAttempts', async () => {
      mock.reset();
      mock.onGet().reply(429, 'Too many requests');

      await expect(alchemy.getNftFloorPrice(contractAddress)).rejects.toThrow(
        'Too many requests'
      );
    });

    it('surfaces errors', async () => {
      mock.reset();
      mock.onGet().reply(500, 'Internal Server Error');
      await expect(alchemy.getNftFloorPrice(contractAddress)).rejects.toThrow(
        'Internal Server Error'
      );
    });
  });

  describe('refreshNftMetadata()', () => {
    const originalTimestamp = '2022-02-16T17:12:00.280Z';
    const updatedTimestamp = '2022-02-16T17:12:10.281Z';
    const contractAddress = '0xCA1';
    const tokenId = '66';
    const tokenIdHex = '0x42';
    const rawNftResponse = createRawNft(
      'title',
      tokenIdHex,
      NftTokenType.UNKNOWN,
      undefined,
      [],
      originalTimestamp
    );
    const rawNftResponseRefreshed = createRawNft(
      'title',
      tokenIdHex,
      NftTokenType.UNKNOWN,
      undefined,
      [],
      updatedTimestamp
    );

    function verifyCorrectParams(): void {
      expect(mock.history.get.length).toEqual(2);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );
      expect(mock.history.get[0].params).toHaveProperty('tokenId', tokenId);
      expect(mock.history.get[0].params).not.toHaveProperty('refreshCache');
      expect(mock.history.get[1].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );
      expect(mock.history.get[1].params).toHaveProperty('tokenId', tokenId);
      expect(mock.history.get[1].params).toHaveProperty('refreshCache', true);
    }

    function useRefreshTrue(): void {
      mock.reset();
      mock
        .onGet()
        .replyOnce(200, rawNftResponse)
        .onGet()
        .replyOnce(200, rawNftResponseRefreshed);
    }

    function useRefreshFalse(): void {
      mock.reset();
      mock
        .onGet()
        .replyOnce(200, rawNftResponse)
        .onGet()
        .replyOnce(200, rawNftResponse);
    }

    beforeEach(() => {
      useRefreshTrue();
    });

    it('can be called with a BaseNft', async () => {
      await alchemy.refreshNftMetadata(
        createBaseNft(contractAddress, tokenIdHex)
      );
      verifyCorrectParams();
    });

    it('can be called with raw parameters', async () => {
      const res = await alchemy.refreshNftMetadata(contractAddress, tokenId);
      expect(res).toBe(true);
      verifyCorrectParams();
    });

    it('returns false if metadata was not refreshed', async () => {
      useRefreshFalse();
      const res = await alchemy.refreshNftMetadata(contractAddress, tokenId);
      expect(res).toBe(false);
      verifyCorrectParams();
    });

    it('normalizes tokenId as a hex string', async () => {
      const res = await alchemy.refreshNftMetadata(contractAddress, tokenIdHex);
      expect(res).toBe(true);
      verifyCorrectParams();
    });

    it('surfaces errors', async () => {
      mock.reset();
      mock.onGet().reply(500, 'Internal Server Error');
      await expect(
        alchemy.refreshNftMetadata(contractAddress, tokenId)
      ).rejects.toThrow('Internal Server Error');
    });
  });

  // TODO: add unit test coverage for the endpoint after overriding the ethers.js
  // AlchemyProvider class, which would make mocking returns much easier.
  describe('findContractDeployer()', () => {
    it('binary search works', async () => {});
    it('validates that the address is a contract', async () => {});
    it('handles upper case input', async () => {});
    it('handles errors', async () => {});
  });
});
