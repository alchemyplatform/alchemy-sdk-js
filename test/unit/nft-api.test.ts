import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  Alchemy,
  AssetTransfersCategory,
  AssetTransfersResult,
  BaseNft,
  GetContractsForOwnerOptions,
  GetFloorPriceResponse,
  GetNftSalesOptions,
  GetNftsForOwnerOptions,
  GetOwnersForContractWithTokenBalancesResponse,
  Nft,
  NftAttributesResponse,
  NftContractBaseNftsResponse,
  NftContractNftsResponse,
  NftFilters,
  NftMetadataBatchToken,
  NftOrdering,
  NftRefreshState,
  NftSaleMarketplace,
  NftSaleTakerType,
  NftSpamClassification,
  NftTokenType,
  OpenSeaSafelistRequestStatus,
  OwnedBaseNft,
  OwnedBaseNftsResponse,
  OwnedNft,
  OwnedNftsResponse,
  SortingOrder,
  fromHex,
  toHex
} from '../../src';
import { AlchemyConfig } from '../../src/api/alchemy-config';
import { getNftsForTransfers } from '../../src/internal/nft-api';
import {
  RawGetBaseNftsForContractResponse,
  RawGetBaseNftsResponse,
  RawGetContractsForOwnerResponse,
  RawGetNftSalesResponse,
  RawGetNftsForContractResponse,
  RawGetNftsForOwnerResponse,
  RawGetOwnersForContractWithTokenBalancesResponse,
  RawNftAttributeRarity,
  RawNftImage
} from '../../src/internal/raw-interfaces';
import { getNftContractFromRaw, getNftFromRaw } from '../../src/util/util';
import {
  createBaseNft,
  createNft,
  createOwnedBaseNft,
  createOwnedNft,
  createRawContractForOwner,
  createRawNft,
  createRawNftContract,
  createRawNftSale,
  createRawOpenSeaCollectionMetadata,
  createRawOwnedBaseNft,
  createRawOwnedNft,
  verifyNftContractMetadata
} from '../test-util';

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
    const totalSupply = '9999';
    const tokenType = NftTokenType.ERC721;
    const contractDeployer = '0xDEF';
    const deployedBlockNumber = 424242;
    const openSeaMetadata = createRawOpenSeaCollectionMetadata();

    const rawNftContractResponse = {
      address,
      tokenType,
      name,
      symbol,
      totalSupply,
      openSeaMetadata,
      contractDeployer,
      deployedBlockNumber
    };
    const expectedNftContract = getNftContractFromRaw(rawNftContractResponse);

    beforeEach(() => {
      mock.onGet().reply(200, rawNftContractResponse);
    });

    it('returns the api response in the expected format', async () => {
      verifyNftContractMetadata(
        await alchemy.nft.getContractMetadata(address),
        expectedNftContract,
        address,
        name,
        symbol,
        totalSupply,
        tokenType
      );

      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        address
      );
    });

    it('surfaces errors', async () => {
      mock.reset();
      mock.onGet().reply(500, 'Internal Server Error');
      await expect(alchemy.nft.getContractMetadata(address)).rejects.toThrow(
        'Internal Server Error'
      );
    });
  });

  describe('getNftMetadata()', () => {
    const contractAddress = '0xABC';
    const title = 'NFT Title';
    const tokenId = '42';
    const timeoutInMs = 50;
    const contract = {
      address: contractAddress,
      name: 'NFT Title',
      symbol: 'NCN',
      totalSupply: '9999',
      tokenType: NftTokenType.ERC721,
      contractDeployer: '0xDEF',
      deployedBlockNumber: 424242,
      openSeaMetadata: createRawOpenSeaCollectionMetadata(),
      isSpam: false,
      spamClassifications: [NftSpamClassification.Erc721DishonestTotalSupply]
    };
    // Special case token ID as an integer string, since that's what the NFT
    // API endpoint returns.
    const rawNftResponse = createRawNft(
      contractAddress,
      title,
      tokenId.toString(),
      NftTokenType.UNKNOWN,
      { contract }
    );
    const expectedNft = getNftFromRaw(rawNftResponse);

    beforeEach(() => {
      mock.onGet().reply(200, rawNftResponse);
    });

    function verifyNftMetadata(
      actualNft: Nft,
      expectedNft: Nft,
      contractAddress: string,
      tokenId: string,
      tokenType?: NftTokenType,
      timeoutInMs?: number,
      refreshCache?: boolean
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
      expect(mock.history.get[0].params).toHaveProperty(
        'tokenUriTimeoutInMs',
        timeoutInMs ?? undefined
      );
      expect(mock.history.get[0].params).toHaveProperty(
        'refreshCache',
        refreshCache ?? undefined
      );
    }

    it('can be called with raw parameters', async () => {
      verifyNftMetadata(
        await alchemy.nft.getNftMetadata(contractAddress, tokenId, {
          tokenType: NftTokenType.ERC1155,
          tokenUriTimeoutInMs: timeoutInMs,
          refreshCache: true
        }),
        expectedNft,
        contractAddress,
        tokenId,
        NftTokenType.ERC1155,
        timeoutInMs,
        true
      );
    });

    it('normalizes tokenId as a hex string', async () => {
      verifyNftMetadata(
        await alchemy.nft.getNftMetadata(contractAddress, tokenId, {
          tokenType: NftTokenType.ERC1155
        }),
        expectedNft,
        contractAddress,
        tokenId,
        NftTokenType.ERC1155
      );
    });

    it('sets tokenType to undefined if tokenType is UNKNOWN', async () => {
      verifyNftMetadata(
        await alchemy.nft.getNftMetadata(contractAddress, tokenId, {
          tokenType: NftTokenType.UNKNOWN
        }),
        expectedNft,
        contractAddress,
        tokenId
      );
    });

    it('sets tokenType to undefined if tokenType is NOT_A_CONTRACT', async () => {
      verifyNftMetadata(
        await alchemy.nft.getNftMetadata(contractAddress, tokenId, {
          tokenType: NftTokenType.NOT_A_CONTRACT
        }),
        expectedNft,
        contractAddress,
        tokenId
      );
    });

    it('surfaces errors', async () => {
      mock.reset();
      mock.onGet().reply(500, 'Internal Server Error');
      await expect(
        alchemy.nft.getNftMetadata(contractAddress, tokenId)
      ).rejects.toThrow('Internal Server Error');
    });
  });

  describe('getNftMetadataBatch()', () => {
    const contractAddress = '0xABC';
    const contractAddress2 = '0xDEF';
    const title = 'NFT Title';
    const tokenId = '42';
    const tokenId2 = 43;
    const timeoutInMs = 50;
    // Special case token ID as an integer string, since that's what the NFT
    // API endpoint returns.
    const rawNftsResponse = {
      nfts: [
        createRawNft(contractAddress, title, tokenId),
        createRawNft(contractAddress2, title, tokenId2.toString())
      ]
    };
    const expectedNfts = rawNftsResponse.nfts.map(getNftFromRaw);

    beforeEach(() => {
      mock.onPost().reply(200, rawNftsResponse);
    });

    it('can be called with raw parameters', async () => {
      const tokens: NftMetadataBatchToken[] = [
        { contractAddress, tokenId },
        {
          contractAddress: contractAddress2,
          tokenId: tokenId2,
          tokenType: NftTokenType.ERC1155
        }
      ];
      const response = await alchemy.nft.getNftMetadataBatch(tokens, {
        refreshCache: true,
        tokenUriTimeoutInMs: timeoutInMs
      });
      expect(response.nfts).toEqual(expectedNfts);
      expect(mock.history.post.length).toEqual(1);
      const parsedRequest = JSON.parse(mock.history.post[0].data);
      expect(parsedRequest).toHaveProperty('tokens', tokens);
      expect(parsedRequest).toHaveProperty('tokens', tokens);
      expect(parsedRequest).toHaveProperty('refreshCache', true);
    });

    it('surfaces errors', async () => {
      mock.reset();
      mock.onGet().reply(500, 'Internal Server Error');
      await expect(
        alchemy.nft.getNftMetadata(contractAddress, tokenId)
      ).rejects.toThrow('Internal Server Error');
    });
  });

  describe('getNftsForOwner()', () => {
    const ownerAddress = '0xABC';
    const pageKey = 'page-key0';
    const contractAddresses = ['0xCA1', '0xCA2'];
    const excludeFilters = [NftFilters.SPAM];
    const expectedFilters = ['SPAM'];
    const getNftsParams: GetNftsForOwnerOptions = {
      pageKey,
      contractAddresses,
      excludeFilters,
      pageSize: 3,
      tokenUriTimeoutInMs: 50,
      orderBy: NftOrdering.TRANSFERTIME
    };
    const rawValidAt = {
      blockHash: '0x123abc',
      blockNumber: 123,
      blockTimestamp: null
    };
    const baseNftResponse: RawGetBaseNftsResponse = {
      ownedNfts: [
        createRawOwnedBaseNft('0xCA1', '0x1', '1'),
        createRawOwnedBaseNft('0xCA2', '0x2', '2')
      ],
      pageKey: 'page-key1',
      totalCount: 3,
      validAt: rawValidAt
    };

    const nftResponse: RawGetNftsForOwnerResponse = {
      ownedNfts: [
        createRawOwnedNft('a', '0xCA1', '0x1', '1'),
        createRawOwnedNft('b', '0xCA2', '0x2', '2', NftTokenType.ERC1155)
      ],
      pageKey: 'page-key1',
      totalCount: 3,
      validAt: rawValidAt
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
        await alchemy.nft.getNftsForOwner(ownerAddress, {
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
          'excludeFilters',
          expectedFilters
        );
        expect(mock.history.get[0].params).toHaveProperty('pageKey', pageKey);
        expect(mock.history.get[0].params).toHaveProperty('pageSize', 3);
        expect(mock.history.get[0].params).toHaveProperty(
          'withMetadata',
          expectedWithMetadata
        );
        expect(mock.history.get[0].params).toHaveProperty(
          'tokenUriTimeoutInMs',
          50
        );
        expect(mock.history.get[0].params).toHaveProperty(
          'orderBy',
          'TRANSFERTIME'
        );
      }
    );

    const baseExpected: OwnedBaseNftsResponse = {
      ownedNfts: [
        createOwnedBaseNft('0xCA1', '0x1', '1'),
        createOwnedBaseNft('0xCA2', '0x2', '2')
      ],
      pageKey: 'page-key1',
      totalCount: 3,
      validAt: {
        blockHash: '0x123abc',
        blockNumber: 123,
        blockTimestamp: undefined
      }
    };
    const nftExpected: OwnedNftsResponse = {
      ownedNfts: [
        createOwnedNft('a', '0xCA1', '0x1', '1'),
        createOwnedNft('b', '0xCA2', '0x2', '2', NftTokenType.ERC1155)
      ],
      pageKey: 'page-key1',
      totalCount: 3,
      validAt: {
        blockHash: '0x123abc',
        blockNumber: 123,
        blockTimestamp: undefined
      }
    };
    const responseCases: Array<
      [
        boolean,
        RawGetBaseNftsResponse | RawGetNftsForOwnerResponse,
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
        const response = await alchemy.nft.getNftsForOwner(ownerAddress, {
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
        alchemy.nft.getNftsForOwner(ownerAddress, {
          ...getNftsParams,
          omitMetadata
        })
      ).rejects.toThrow('Internal Server Error');
    });

    it('uses the correct overload with no options', async () => {
      mock.onGet().reply(200, nftResponse);
      const response = await alchemy.nft.getNftsForOwner(ownerAddress);
      response.ownedNfts.forEach(nft => expect(nft.contract).toBeDefined());
    });
  });

  describe('getNftsForOwnerIterator()', () => {
    const ownerAddress = '0xABC';
    const contractAddresses = ['0xCA1', '0xCA2'];
    const excludeFilters = [NftFilters.SPAM];
    const expectedFilters = ['SPAM'];
    const rawValidAt = {
      blockHash: '0x123abc',
      blockNumber: 123,
      blockTimestamp: null
    };
    const baseResponses: RawGetBaseNftsResponse[] = [
      {
        ownedNfts: [
          createRawOwnedBaseNft('0xCA1', '0x1', '1'),
          createRawOwnedBaseNft('0xCA2', '0x2', '2')
        ],
        pageKey: 'page-key1',
        totalCount: 3,
        validAt: rawValidAt
      },
      {
        ownedNfts: [createRawOwnedBaseNft('0xCA2', '0x3', '1')],
        totalCount: 3,
        validAt: rawValidAt,
        pageKey: null
      }
    ];
    const nftResponses: RawGetNftsForOwnerResponse[] = [
      {
        ownedNfts: [
          createRawOwnedNft('a', '0xCA1', '0x1', '1'),
          createRawOwnedNft('b', '0xCA2', '0x2', '2', NftTokenType.ERC1155)
        ],
        pageKey: 'page-key1',
        totalCount: 3,
        validAt: rawValidAt
      },
      {
        ownedNfts: [
          createRawOwnedNft('c', '0xCA2', '0x3', '1', NftTokenType.ERC1155)
        ],
        totalCount: 3,
        validAt: rawValidAt,
        pageKey: null
      }
    ];

    function setupMock(
      mockResponses: RawGetBaseNftsResponse[] | RawGetNftsForOwnerResponse[]
    ): void {
      mock
        .onGet()
        .replyOnce(200, mockResponses[0])
        .onGet()
        .replyOnce(200, mockResponses[1]);
    }

    const paramCases: Array<
      [
        RawGetBaseNftsResponse[] | RawGetNftsForOwnerResponse[],
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
        for await (const ownedNft of alchemy.nft.getNftsForOwnerIterator(
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
          'excludeFilters',
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
        for await (const ownedNft of alchemy.nft.getNftsForOwnerIterator(
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
      createOwnedBaseNft('0xCA1', '0x1', '1'),
      createOwnedBaseNft('0xCA2', '0x2', '2'),
      createOwnedBaseNft('0xCA2', '0x3', '1')
    ];
    const nftExpected = [
      createOwnedNft('a', '0xCA1', '0x1', '1'),
      createOwnedNft('b', '0xCA2', '0x2', '2', NftTokenType.ERC1155),
      createOwnedNft('c', '0xCA2', '0x3', '1', NftTokenType.ERC1155)
    ];
    const responseCases: Array<
      [
        boolean,
        RawGetBaseNftsResponse[] | RawGetNftsForOwnerResponse[],
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
        for await (const ownedNft of alchemy.nft.getNftsForOwnerIterator(
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
          for await (const ownedNft of alchemy.nft.getNftsForOwnerIterator(
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
      for await (const ownedNft of alchemy.nft.getNftsForOwnerIterator(
        ownerAddress
      )) {
        expect(ownedNft.raw).toBeDefined();
      }
    });
  });

  describe('getNftsForContract()', () => {
    const contractAddress = '0xCA1';
    const pageKey = 'page-key0';
    const baseResponse: RawGetBaseNftsForContractResponse = {
      nfts: [{ tokenId: '1' }, { tokenId: '2' }],
      pageKey: 'page-key1'
    };

    const nftResponse: RawGetNftsForContractResponse = {
      nfts: [
        createRawNft(contractAddress, 'a', '1', NftTokenType.ERC1155),
        createRawNft(contractAddress, 'b', '2', NftTokenType.ERC1155)
      ],
      pageKey: 'page-key1'
    };

    beforeEach(() => {
      mock.onGet().reply(200, baseResponse);
    });

    const paramCases: Array<
      [
        RawGetBaseNftsForContractResponse | RawGetNftsForContractResponse,
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
        await alchemy.nft.getNftsForContract(contractAddress, {
          pageKey,
          omitMetadata,
          pageSize: 90,
          tokenUriTimeoutInMs: 50
        });
        expect(mock.history.get.length).toEqual(1);
        expect(mock.history.get[0].params).toHaveProperty(
          'contractAddress',
          contractAddress
        );
        expect(mock.history.get[0].params).toHaveProperty('pageKey', pageKey);
        expect(mock.history.get[0].params).toHaveProperty(
          'withMetadata',
          expectedWithMetadata
        );
        expect(mock.history.get[0].params).toHaveProperty('limit', 90);
        expect(mock.history.get[0].params).toHaveProperty(
          'tokenUriTimeoutInMs',
          50
        );
      }
    );

    const baseExpected: NftContractBaseNftsResponse = {
      nfts: [createBaseNft('0xCA1', '1'), createBaseNft('0xCA1', '2')],
      pageKey: 'page-key1'
    };
    const nftExpected: NftContractNftsResponse = {
      nfts: [
        createNft('a', '0xCA1', '1', NftTokenType.ERC1155),
        createNft('b', '0xCA1', '2', NftTokenType.ERC1155)
      ],
      pageKey: 'page-key1'
    };
    const responseCases: Array<
      [
        boolean,
        RawGetBaseNftsForContractResponse | RawGetNftsForContractResponse,
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
        const response = await alchemy.nft.getNftsForContract(contractAddress, {
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
        alchemy.nft.getNftsForContract(contractAddress, {
          omitMetadata
        })
      ).rejects.toThrow('Internal Server Error');
    });

    it('uses the correct overload with no options', async () => {
      mock.onGet().reply(200, nftResponse);
      const response = await alchemy.nft.getNftsForContract(contractAddress);
      response.nfts.forEach(nft => expect(nft.raw).toBeDefined());
    });
  });

  describe('getNftsForContractIterator()', () => {
    const contractAddress = '0xCA1';
    const pageKey = 'page-key0';
    const baseResponses: RawGetBaseNftsForContractResponse[] = [
      {
        nfts: [{ tokenId: '1' }, { tokenId: '2' }],
        pageKey: 'page-key1'
      },
      {
        nfts: [{ tokenId: '3' }],
        pageKey: null
      }
    ];
    const nftResponses: RawGetNftsForContractResponse[] = [
      {
        nfts: [
          createRawNft(contractAddress, 'a', '1', NftTokenType.ERC721),
          createRawNft(contractAddress, 'b', '2', NftTokenType.ERC721)
        ],
        pageKey: 'page-key1'
      },
      {
        nfts: [createRawNft(contractAddress, 'c', '3', NftTokenType.ERC721)],
        pageKey: null
      }
    ];

    function setupMock(
      mockResponses:
        | RawGetBaseNftsForContractResponse[]
        | RawGetNftsForContractResponse[]
    ): void {
      mock
        .onGet()
        .replyOnce(200, mockResponses[0])
        .onGet()
        .replyOnce(200, mockResponses[1]);
    }

    const paramCases: Array<
      [
        RawGetBaseNftsForContractResponse[] | RawGetNftsForContractResponse[],
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
        for await (const nft of alchemy.nft.getNftsForContractIterator(
          contractAddress,
          {
            omitMetadata
          }
        )) {
          nfts.push(nft);
        }
        expect(mock.history.get.length).toEqual(2);
        expect(mock.history.get[0].params.pageKey).toBeUndefined();
        expect(mock.history.get[0].params).toHaveProperty(
          'contractAddress',
          contractAddress
        );
        expect(mock.history.get[0].params).toHaveProperty(
          'withMetadata',
          expectedWithMetadata
        );
        expect(mock.history.get[1].params).toHaveProperty(
          'pageKey',
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
        for await (const nft of alchemy.nft.getNftsForContractIterator(
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
      createBaseNft(contractAddress, '1'),
      createBaseNft(contractAddress, '2'),
      createBaseNft(contractAddress, '3')
    ];
    const nftExpected = [
      createNft('a', contractAddress, '1', NftTokenType.ERC721),
      createNft('b', contractAddress, '2', NftTokenType.ERC721),
      createNft('c', contractAddress, '3', NftTokenType.ERC721)
    ];
    const responseCases: Array<
      [
        boolean,
        RawGetBaseNftsForContractResponse[] | RawGetNftsForContractResponse[],
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
        for await (const ownedNft of alchemy.nft.getNftsForContractIterator(
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
          for await (const nft of alchemy.nft.getNftsForContractIterator(
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
      for await (const nft of alchemy.nft.getNftsForContractIterator(
        contractAddress
      )) {
        expect(nft.raw).toBeDefined();
      }
    });
  });

  describe('getOwnersForNft()', () => {
    const contractAddress = '0xCA1';
    const tokenIdHex = '0x1b7';
    const tokenIdNumber = '439';
    const owners = ['0x1', '0x2', '0x3'];
    const pageKey = 'abcdefg';
    const pageSize = 500;

    beforeEach(() => {
      mock.onGet().reply(200, {
        owners
      });
    });

    it('calls with the correct parameters', async () => {
      await alchemy.nft.getOwnersForNft(contractAddress, tokenIdHex, {
        pageKey,
        pageSize
      });
      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );
      expect(mock.history.get[0].params).toHaveProperty(
        'tokenId',
        tokenIdNumber
      );
      expect(mock.history.get[0].params).toHaveProperty('pageKey', pageKey);
      expect(mock.history.get[0].params).toHaveProperty('pageSize', pageSize);

      const response = await alchemy.nft.getOwnersForNft(
        contractAddress,
        tokenIdNumber
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
        alchemy.nft.getOwnersForNft(contractAddress, tokenIdHex)
      ).rejects.toThrow('Too many requests');
    });
  });

  describe('getOwnersForContract()', () => {
    const contractAddress = '0xCA1';
    const tokenIdHex = '0x1b7';
    const owners = ['0x1', '0x2', '0x3'];

    beforeEach(() => {
      mock.onGet().reply(200, {
        owners,
        pageKey: null
      });
    });

    it('calls with the correct parameters', async () => {
      const response = await alchemy.nft.getOwnersForContract(contractAddress);
      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );
      expect(response).toEqual({ owners, pageKey: undefined });
    });

    it('handles withTokenBalances=true', async () => {
      const mockResponse: RawGetOwnersForContractWithTokenBalancesResponse = {
        owners: [
          {
            ownerAddress: '0xABC',
            tokenBalances: [
              {
                tokenId: '1',
                balance: '1'
              }
            ]
          },
          {
            ownerAddress: '0xDEF',
            tokenBalances: [
              {
                tokenId: '2',
                balance: '2'
              }
            ]
          }
        ],
        pageKey: 'page-key2'
      };
      const expected: GetOwnersForContractWithTokenBalancesResponse = {
        owners: [
          {
            ownerAddress: '0xABC',
            tokenBalances: [
              {
                tokenId: '1',
                balance: '1'
              }
            ]
          },
          {
            ownerAddress: '0xDEF',
            tokenBalances: [
              {
                tokenId: '2',
                balance: '2'
              }
            ]
          }
        ],
        pageKey: 'page-key2'
      };
      mock.reset();
      mock.onGet().reply(200, mockResponse);
      const response = await alchemy.nft.getOwnersForContract(contractAddress, {
        withTokenBalances: true,
        block: '0x0',
        pageKey: 'page-key1'
      });

      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );
      expect(mock.history.get[0].params).toHaveProperty(
        'withTokenBalances',
        true
      );
      expect(response).toEqual(expected);
    });

    it('retries with maxAttempts', async () => {
      mock.reset();
      mock.onGet().reply(429, 'Too many requests');

      await expect(
        alchemy.nft.getOwnersForNft(contractAddress, tokenIdHex)
      ).rejects.toThrow('Too many requests');
    });
  });

  describe('getContractsForOwner()', () => {
    const owner = 'vitalik.eth';
    const contractAddress = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
    const tokenId = '27';
    const name = 'NFT Contract Name';
    const displayName = 'NFT Display Name';
    const symbol = 'XNO';
    const totalContractCount = 3;
    const totalSupply = '1492';
    const contractDeployer = '0xABC';
    const deployedBlockNumber = 424242;
    const rawOpenSeaContractMetadata = createRawOpenSeaCollectionMetadata();
    const expectedOpenseaMetadata = {
      floorPrice: 2.2998,
      collectionName: 'Collection Name',
      safelistRequestStatus: OpenSeaSafelistRequestStatus.VERIFIED,
      imageUrl: 'http://image.url',
      description: 'A sample description',
      externalUrl: 'http://external.url',
      twitterUsername: 'twitter-handle',
      discordUrl: 'https://discord.gg/example',
      lastIngestedAt: '2022-10-26T22:24:49.000Z'
    };
    const image: RawNftImage = {
      cachedUrl: 'https://example.com/image.png',
      thumbnailUrl: null,
      pngUrl: null,
      contentType: null,
      size: null,
      originalUrl: null
    };

    const templateResponse: RawGetContractsForOwnerResponse = {
      pageKey: null,
      totalCount: totalContractCount,
      contracts: [
        createRawContractForOwner(contractAddress, {
          displayNft: { tokenId, name: displayName },
          totalSupply: null
        }),
        createRawContractForOwner(contractAddress, {
          displayNft: { tokenId, name: displayName },
          tokenType: NftTokenType.ERC721,
          symbol,
          image,
          name,
          totalSupply: null
        }),
        createRawContractForOwner(contractAddress, {
          displayNft: { tokenId, name: displayName },
          isSpam: true,
          tokenType: NftTokenType.ERC1155,
          symbol,
          name,
          totalSupply,
          openSeaMetadata: rawOpenSeaContractMetadata,
          contractDeployer,
          deployedBlockNumber,
          image
        })
      ]
    };

    beforeEach(() => {
      mock.onGet().reply(200, templateResponse);
    });

    it.each<[keyof GetContractsForOwnerOptions, any]>([
      ['excludeFilters', [NftFilters.AIRDROPS]],
      ['includeFilters', [NftFilters.SPAM]],
      ['pageKey', 'a-page-key'],
      ['pageSize', 50]
    ])('calls with the correct parameters', async (fieldName, value) => {
      await alchemy.nft.getContractsForOwner(owner, {
        [fieldName]: value
      });

      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(fieldName, value);
    });

    it('returns the api response in the expected format', async () => {
      const result = await alchemy.nft.getContractsForOwner(owner);

      expect(result.totalCount).toEqual(totalContractCount);
      expect(result.contracts.length).toEqual(totalContractCount);

      expect(result.contracts[0].address).toEqual(contractAddress);
      expect(result.contracts[0].displayNft.tokenId).toEqual(tokenId);
      expect(result.contracts[0].totalSupply).toBeUndefined();

      expect(result.contracts[1].address).toEqual(contractAddress);
      expect(result.contracts[1].displayNft.tokenId).toEqual(tokenId);
      expect(result.contracts[1].name).toEqual(name);
      expect(result.contracts[1].tokenType).toEqual(NftTokenType.ERC721);
      expect(result.contracts[1].symbol).toEqual(symbol);
      expect(result.contracts[1].totalSupply).toBeUndefined();

      expect(result.contracts[2].address).toEqual(contractAddress);
      expect(result.contracts[2].displayNft.tokenId).toEqual(tokenId);
      expect(result.contracts[2].name).toEqual(name);
      expect(result.contracts[2].tokenType).toEqual(NftTokenType.ERC1155);
      expect(result.contracts[2].symbol).toEqual(symbol);
      expect(result.contracts[2].openSeaMetadata).toEqual(
        expectedOpenseaMetadata
      );
      expect(result.contracts[2].totalSupply).toEqual(totalSupply);
    });

    it('surfaces errors', async () => {
      mock.reset();
      mock.onGet().reply(400, 'Invalid include filters: []');

      await expect(alchemy.nft.getContractsForOwner(owner)).rejects.toThrow(
        'Invalid include filters: []'
      );
    });
  });

  describe('verifyNftOwnership()', () => {
    const owner = '0xABC';
    const addresses = ['0xCA1', '0xCA2'];
    const rawValidAt = {
      blockHash: '0x123abc',
      blockNumber: 123,
      blockTimestamp: null
    };
    const emptyResponse: RawGetBaseNftsResponse = {
      ownedNfts: [],
      totalCount: 0,
      validAt: rawValidAt,
      pageKey: null
    };
    const partialResponse: RawGetBaseNftsResponse = {
      ownedNfts: [createRawOwnedBaseNft('0xCA2', '0x2', '2')],
      totalCount: 1,
      validAt: rawValidAt,
      pageKey: null
    };
    const nftResponse: RawGetBaseNftsResponse = {
      ownedNfts: [
        createRawOwnedBaseNft('0xCA1', '0x1', '1'),
        createRawOwnedBaseNft('0xCA2', '0x2', '2')
      ],
      totalCount: 2,
      validAt: rawValidAt,
      pageKey: null
    };

    it('calls with the correct parameters', async () => {
      mock.onGet().reply(200, emptyResponse);
      await alchemy.nft.verifyNftOwnership(owner, addresses);
      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty('owner', owner);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddresses',
        addresses
      );
      expect(mock.history.get[0].params).toHaveProperty('withMetadata', false);
    });

    it('throws if no contract address is passed in', async () => {
      await expect(alchemy.nft.verifyNftOwnership(owner, [])).rejects.toThrow(
        'Must provide at least one contract address'
      );
    });

    const cases = [
      [emptyResponse, { '0xCA1': false, '0xCA2': false }],
      [partialResponse, { '0xCA1': false, '0xCA2': true }],
      [nftResponse, { '0xCA1': true, '0xCA2': true }]
    ];
    it.each(cases)(
      'returns the correct response for array inputs',
      async (response, expected) => {
        mock.onGet().reply(200, response);
        const result = await alchemy.nft.verifyNftOwnership(owner, addresses);
        expect(result).toEqual(expected);
      }
    );

    const cases2 = [
      [emptyResponse, false],
      [partialResponse, true]
    ];
    it.each(cases2)(
      'returns the correct response for inputs',
      async (response, expected) => {
        const address = '0xCA2';
        mock.onGet().reply(200, response);
        const result = await alchemy.nft.verifyNftOwnership(owner, address);
        expect(result).toEqual(expected);
      }
    );

    it('surfaces errors', async () => {
      mock.onGet().reply(500, 'Internal Server Error');
      await expect(
        alchemy.nft.verifyNftOwnership(owner, addresses)
      ).rejects.toThrow('Internal Server Error');
    });
  });

  describe('isSpamNftContract', () => {
    const spamContract = '0x000440f08436a7b866d1ae42db5e0be801da722a';
    it('calls with the correct parameters', async () => {
      mock.onGet().reply(200, true);
      await alchemy.nft.isSpamContract(spamContract);
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
      await alchemy.nft.getSpamContracts();
      expect(mock.history.get.length).toEqual(1);
    });
  });

  describe('getNftFloorPrice', () => {
    const contractAddress = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
    const templateResponse: GetFloorPriceResponse = {
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
      await alchemy.nft.getFloorPrice(contractAddress);
      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );
    });

    it('retries with maxAttempts', async () => {
      mock.reset();
      mock.onGet().reply(429, 'Too many requests');

      await expect(alchemy.nft.getFloorPrice(contractAddress)).rejects.toThrow(
        'Too many requests'
      );
    });

    it('surfaces errors', async () => {
      mock.reset();
      mock.onGet().reply(500, 'Internal Server Error');
      await expect(alchemy.nft.getFloorPrice(contractAddress)).rejects.toThrow(
        'Internal Server Error'
      );
    });
  });

  describe('getNftSales', () => {
    const contractAddress = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
    const tokenId = '42';
    const buyerAddress = '0xa56c6b57127e8881fbe51046058d0ddc1bb9e24f';
    const sellerAddress = '0xb60653cc0acff21cdf59e57bcd5de99e305a4c1c';
    const templateResponse: RawGetNftSalesResponse = {
      nftSales: [
        createRawNftSale(
          contractAddress,
          tokenId,
          NftSaleMarketplace.LOOKSRARE,
          NftSaleTakerType.BUYER,
          buyerAddress,
          sellerAddress
        ),
        createRawNftSale(
          contractAddress,
          tokenId,
          NftSaleMarketplace.SEAPORT,
          NftSaleTakerType.SELLER,
          buyerAddress,
          sellerAddress
        ),
        createRawNftSale(
          contractAddress,
          tokenId,
          NftSaleMarketplace.X2Y2,
          NftSaleTakerType.SELLER,
          buyerAddress,
          sellerAddress
        )
      ],
      validAt: {
        blockNumber: 1337,
        blockTimestamp: null,
        blockHash: null
      },
      pageKey: null
    };

    beforeEach(() => {
      mock.onGet().reply(200, templateResponse);
    });

    it('calls with the correct parameters (GetNftSalesByContractAddress)', async () => {
      await alchemy.nft.getNftSales({ contractAddress, tokenId });

      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );
      expect(mock.history.get[0].params).toHaveProperty('tokenId', tokenId);
    });

    it.each<[keyof GetNftSalesOptions, any]>([
      ['buyerAddress', buyerAddress],
      ['fromBlock', 0],
      ['limit', 10],
      ['marketplace', NftSaleMarketplace.LOOKSRARE],
      ['order', SortingOrder.ASCENDING],
      ['pageKey', '2'],
      ['sellerAddress', sellerAddress],
      ['taker', NftSaleTakerType.BUYER],
      ['toBlock', 'latest']
    ])(
      'calls with the correct parameters (GetNftSales)',
      async (fieldName, value) => {
        await alchemy.nft.getNftSales({
          [fieldName]: value
        });

        expect(mock.history.get.length).toEqual(1);
        expect(mock.history.get[0].params).toHaveProperty(fieldName, value);
      }
    );

    it('returns the api response in the expected format', async () => {
      const result = await alchemy.nft.getNftSales({ contractAddress });

      expect(result.nftSales.length).toEqual(3);

      expect(result.nftSales[0].marketplace).toEqual(
        NftSaleMarketplace.LOOKSRARE
      );
      expect(result.nftSales[0].taker).toEqual(NftSaleTakerType.BUYER);

      expect(result.nftSales[1].marketplace).toEqual(
        NftSaleMarketplace.SEAPORT
      );
      expect(result.nftSales[1].taker).toEqual(NftSaleTakerType.SELLER);

      expect(result.nftSales[2].marketplace).toEqual(NftSaleMarketplace.X2Y2);
      expect(result.nftSales[2].taker).toEqual(NftSaleTakerType.SELLER);
    });

    it('surfaces errors', async () => {
      mock.reset();
      mock.onGet().reply(400, 'fromBlock should be a non-negative integer');

      await expect(
        alchemy.nft.getNftSales({ contractAddress })
      ).rejects.toThrow('fromBlock should be a non-negative integer');
    });
  });

  describe('computeRarity()', () => {
    const contractAddress = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
    const tokenId = 7495;
    const templateResponse: RawNftAttributeRarity[] = [
      {
        value: 'Aquamarine',
        traitType: 'Background',
        prevalence: 0.1266
      },
      {
        value: 'Cyborg',
        traitType: 'Eyes',
        prevalence: 0.0108
      }
    ];
    const expectedResult = templateResponse;

    beforeEach(() => {
      mock.onGet().reply(200, templateResponse);
    });

    it('calls with the correct parameters', async () => {
      await alchemy.nft.computeRarity(contractAddress, tokenId);

      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );
      expect(mock.history.get[0].params).toHaveProperty(
        'tokenId',
        tokenId.toString()
      );
    });

    it('returns the api response in the expected format', async () => {
      const result = await alchemy.nft.computeRarity(contractAddress, tokenId);

      expect(result).toEqual(expectedResult);
    });

    it('surfaces errors', async () => {
      mock.reset();
      mock.onGet().reply(400, 'Could not fetch metadata for that NFT');

      await expect(
        alchemy.nft.computeRarity(contractAddress, tokenId)
      ).rejects.toThrow('Could not fetch metadata for that NFT');
    });
  });

  describe('searchContractMetadata()', () => {
    const query = 'alchemy';
    const address = '0xf6e12a3b482c8d51a0f66e6d80c496c310833389';
    const name = 'NFT Contract Name';
    const symbol = 'AXN';
    const totalSupply = '1155';
    const tokenType = NftTokenType.ERC721;

    const rawNftContractResponse = createRawNftContract(address, {
      tokenType,
      name,
      symbol,
      totalSupply
    });
    const templateResponse = { contracts: [rawNftContractResponse] };
    const expectedNftContract = getNftContractFromRaw(rawNftContractResponse);

    beforeEach(() => {
      mock.onGet().reply(200, templateResponse);
    });

    it('calls with the correct parameters', async () => {
      await alchemy.nft.searchContractMetadata(query);

      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty('query', query);
    });

    it('returns the api response in the expected format', async () => {
      const response = await alchemy.nft.searchContractMetadata(query);

      expect(response.contracts.length).toEqual(1);
      verifyNftContractMetadata(
        response.contracts[0],
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
      mock
        .onGet()
        .reply(429, 'Your app has exceeded its concurrent requests capacity.');

      await expect(alchemy.nft.searchContractMetadata(query)).rejects.toThrow(
        'Your app has exceeded its concurrent requests capacity.'
      );
    });
  });

  describe('summarizeNftAttributes()', () => {
    const contractAddress = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
    const templateResponse: NftAttributesResponse = {
      contractAddress,
      totalSupply: '1000',
      summary: {
        Background: {
          Aquamarine: 3,
          'New Punk Blue': 5
        },
        Eyes: {
          Cyborg: 1,
          Zombie: 7
        }
      }
    };

    it('calls with the correct parameters', async () => {
      mock.onGet().reply(200, templateResponse);

      const response = await alchemy.nft.summarizeNftAttributes(
        contractAddress
      );

      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );
      expect(response.contractAddress).toBeDefined();
      expect(response.contractAddress).toEqual(contractAddress);
      expect(response.totalSupply).toEqual(templateResponse.totalSupply);
      expect(response.summary).toEqual(templateResponse.summary);
    });

    it('surfaces errors', async () => {
      mock.reset();
      mock.onGet().reply(400, 'No NFTs found for that contract!');

      await expect(
        alchemy.nft.summarizeNftAttributes(contractAddress)
      ).rejects.toThrow('No NFTs found for that contract!');
    });
  });

  describe('refreshNftMetadata()', () => {
    const originalTimestamp = '2022-02-16T17:12:00.280Z';
    const updatedTimestamp = '2022-02-16T17:12:10.281Z';
    const contractAddress = '0xCA1';
    const tokenId = '66';
    const tokenIdHex = '0x42';
    const rawNftResponse = createRawNft(
      contractAddress,
      'title',
      tokenIdHex,
      NftTokenType.UNKNOWN,
      { timeLastUpdated: originalTimestamp }
    );
    const rawNftResponseRefreshed = createRawNft(
      contractAddress,
      'title',
      tokenIdHex,
      NftTokenType.UNKNOWN,
      { timeLastUpdated: updatedTimestamp }
    );

    function verifyCorrectParams(): void {
      expect(mock.history.get.length).toEqual(2);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );
      expect(mock.history.get[0].params).toHaveProperty('tokenId', tokenId);
      expect(mock.history.get[0].params).toHaveProperty(
        'refreshCache',
        undefined
      );
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

    it('can be called with raw parameters', async () => {
      const res = await alchemy.nft.refreshNftMetadata(
        contractAddress,
        tokenId
      );
      expect(res).toBe(true);
      verifyCorrectParams();
    });

    it('returns false if metadata was not refreshed', async () => {
      useRefreshFalse();
      const res = await alchemy.nft.refreshNftMetadata(
        contractAddress,
        tokenId
      );
      expect(res).toBe(false);
      verifyCorrectParams();
    });

    it('normalizes tokenId as a hex string', async () => {
      const res = await alchemy.nft.refreshNftMetadata(
        contractAddress,
        tokenIdHex
      );
      expect(res).toBe(true);
      verifyCorrectParams();
    });

    it('surfaces errors', async () => {
      mock.reset();
      mock.onGet().reply(500, 'Internal Server Error');
      await expect(
        alchemy.nft.refreshNftMetadata(contractAddress, tokenId)
      ).rejects.toThrow('Internal Server Error');
    });
  });

  describe('refreshNftContract', () => {
    const contractAddress = '0xCA1';
    const refreshResponse = {
      contractAddress,
      reingestionState: 'queued',
      progress: '5'
    };
    beforeEach(() => {
      mock.onGet().reply(200, refreshResponse);
    });
    it('calls with the correct parameters', async () => {
      const response = await alchemy.nft.refreshContract(contractAddress);
      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );
      expect(response).toEqual({
        contractAddress,
        refreshState: NftRefreshState.QUEUED,
        progress: '5'
      });
    });

    it('retries with maxAttempts', async () => {
      mock.reset();
      mock.onGet().reply(429, 'Too many requests');

      await expect(
        alchemy.nft.refreshContract(contractAddress)
      ).rejects.toThrow('Too many requests');
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

  // TODO: Add unit tests once we've implemented MockProvider.
  describe('getMintedNfts()', () => {});
  describe('getTransfersForOwner()', () => {});

  describe('getNftsForTransfers() helper method', () => {
    let config: AlchemyConfig;

    function create721Transfer(
      contractAddress: string | null,
      tokenId: string
    ): AssetTransfersResult {
      return {
        uniqueId: 'mock-id',
        category: AssetTransfersCategory.ERC721,
        blockNum: '0xe4f5d',
        from: '0xabc',
        to: '0xdef',
        value: null,
        erc721TokenId: tokenId,
        erc1155Metadata: null,
        tokenId,
        asset: null,
        hash: '0xabcd',
        rawContract: {
          value: null,
          address: contractAddress,
          decimal: '0x0'
        }
      };
    }

    function create1155Transfer(
      contractAddress: string,
      tokenIds: string[]
    ): AssetTransfersResult {
      const metadata = tokenIds.map(id => ({
        tokenId: id,
        value: '0x1'
      }));
      return {
        uniqueId: 'mock-id',
        category: AssetTransfersCategory.ERC1155,
        blockNum: '0xe4f5d',
        from: '0xabc',
        to: '0xdef',
        value: null,
        erc721TokenId: null,
        erc1155Metadata: metadata,
        tokenId: null,
        asset: null,
        hash: '0xabcd',
        rawContract: {
          value: null,
          address: contractAddress,
          decimal: '0x0'
        }
      };
    }

    beforeEach(() => {
      config = new AlchemyConfig();
    });

    it('handles no transfers case', async () => {
      const response = await getNftsForTransfers(config, {
        transfers: []
      });
      expect(response.nfts).toEqual([]);
    });

    it('filters out transfers with no contract address', async () => {
      const response = await getNftsForTransfers(config, {
        transfers: [create721Transfer(null, '0x2')]
      });
      expect(response.nfts.length).toEqual(0);
    });

    it('flattens 1155 transfers', async () => {
      const nftMetadataBatchResponse = {
        nfts: [
          createRawNft('0xabc', 'NFT1', '1', NftTokenType.ERC721),
          createRawNft('0xdef', 'NFT2', '2', NftTokenType.ERC1155),
          createRawNft('0xdef', 'NFT2', '3', NftTokenType.ERC1155)
        ]
      };
      mock.onPost().reply(200, nftMetadataBatchResponse);
      const transfers = [
        create721Transfer('0xabc', '0x1'),
        create1155Transfer('0xdef', ['0x2', '0x3'])
      ];

      const response = await getNftsForTransfers(config, {
        transfers
      });
      expect(response.nfts.length).toEqual(3);
      expect(mock.history.post.length).toEqual(1);

      const expectedRequest = {
        tokens: [
          { contractAddress: '0xabc', tokenId: '0x1', tokenType: 'ERC721' },
          { contractAddress: '0xdef', tokenId: '0x2', tokenType: 'ERC1155' },
          { contractAddress: '0xdef', tokenId: '0x3', tokenType: 'ERC1155' }
        ]
      };
      expect(mock.history.post[0].data).toEqual(
        JSON.stringify(expectedRequest)
      );
    });

    it('batches NFT metadata calls', async () => {
      const nftMetadataBatchResponse1 = {
        nfts: Array.from({ length: 100 }, (_, i) =>
          createRawNft('0xdef', 'NFT', toHex(i), NftTokenType.ERC1155)
        )
      };
      const nftMetadataBatchResponse2 = {
        nfts: [createRawNft('0xdef', 'NFT', toHex(100), NftTokenType.ERC1155)]
      };
      mock
        .onPost()
        .reply(200, nftMetadataBatchResponse1)
        .onPost()
        .reply(200, nftMetadataBatchResponse2);

      const transfers = [
        create1155Transfer(
          '0xdef',
          Array.from({ length: 101 }, (_, i) => toHex(i))
        )
      ];
      const response = await getNftsForTransfers(config, {
        transfers
      });
      expect(response.nfts.length).toEqual(101);
      expect(mock.history.post.length).toEqual(2);

      const expectedRequest1 = {
        tokens: Array.from({ length: 100 }, (_, i) => ({
          contractAddress: '0xdef',
          tokenId: toHex(i),
          tokenType: 'ERC1155'
        }))
      };
      const expectedRequest2 = {
        tokens: [
          {
            contractAddress: '0xdef',
            tokenId: toHex(100),
            tokenType: 'ERC1155'
          }
        ]
      };
      expect(mock.history.post[0].data).toEqual(
        JSON.stringify(expectedRequest1)
      );
      expect(mock.history.post[1].data).toEqual(
        JSON.stringify(expectedRequest2)
      );
    });

    it('returns separate NFTs for duplicate transfers', async () => {
      const nftMetadataBatchResponse = {
        nfts: [
          createRawNft('0xabc', 'NFT1', '0x1', NftTokenType.ERC721),
          createRawNft('0xdef', 'NFT2', '0x1', NftTokenType.ERC1155)
        ]
      };
      mock.onPost().reply(200, nftMetadataBatchResponse);
      const transfers = [
        create721Transfer('0xabc', '0x1'),
        create721Transfer('0xabc', '0x1'),
        create1155Transfer('0xdef', ['0x2']),
        create1155Transfer('0xdef', ['0x2'])
      ];

      const response = await getNftsForTransfers(config, {
        transfers
      });

      // Should be 4 NFTs even though endpoint returned 2.
      expect(response.nfts.length).toEqual(4);
      expect(mock.history.post.length).toEqual(1);
      expect(mock.history);
    });
  });
});
