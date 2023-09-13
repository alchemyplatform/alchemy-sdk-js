import {
  BaseNft,
  Nft,
  NftContract,
  NftSaleMarketplace,
  NftSaleTakerType,
  NftTokenType,
  OwnedBaseNft,
  OwnedNft,
  toHex
} from '../src';
import {
  RawNft,
  RawNftContractForNft,
  RawNftContractForOwner,
  RawNftImage,
  RawNftSale,
  RawNftSaleFeeData,
  RawOpenSeaCollectionMetadata,
  RawOwnedBaseNft,
  RawOwnedNft
} from '../src/internal/raw-interfaces';
import { BlockHead, LogsEvent } from '../src/internal/websocket-backfiller';
import { getNftFromRaw } from '../src/util/util';

export const TEST_WALLET_PRIVATE_KEY =
  'dd5bdf09397b1fdf98e4f72c66047d5104b1511fa7dc1b8fdddd61a150f732c9';
export const TEST_WALLET_PUBLIC_ADDRESS =
  '0x4b9007B0BcE78cfB634032ec31Ed56adB464287b';

export function createRawOpenSeaCollectionMetadata(): RawOpenSeaCollectionMetadata {
  return {
    floorPrice: 2.2998,
    collectionName: 'Collection Name',
    safelistRequestStatus: 'verified',
    imageUrl: 'http://image.url',
    description: 'A sample description',
    externalUrl: 'http://external.url',
    twitterUsername: 'twitter-handle',
    discordUrl: 'https://discord.gg/example',
    lastIngestedAt: '2022-10-26T22:24:49.000Z'
  };
}

export function createRawOwnedBaseNft(
  address: string,
  tokenId: string,
  balance: string
): RawOwnedBaseNft {
  return {
    contractAddress: address,
    tokenId,
    balance
  };
}

export function createOwnedBaseNft(
  address: string,
  tokenId: string,
  balance: string
): OwnedBaseNft {
  return {
    ...createBaseNft(address, tokenId),
    balance
  };
}

export function createBaseNft(
  contractAddress: string,
  tokenId: string
): BaseNft {
  return {
    contractAddress,
    tokenId
  };
}

export function createNft(
  title: string,
  address: string,
  tokenId: string,
  tokenType = NftTokenType.UNKNOWN,
  tokenUri?: string
): Nft {
  return getNftFromRaw(
    createRawNft(address, title, tokenId, tokenType, {
      ...(tokenUri && { tokenUri })
    })
  );
}

export function createRawNftContract(
  address: string,
  overrides: Partial<RawNftContractForNft> = {}
): RawNftContractForNft {
  return {
    address,
    tokenType: NftTokenType.ERC721,
    name: 'NFT Contract',
    symbol: 'NFT',
    totalSupply: '100',
    contractDeployer: '0x000',
    deployedBlockNumber: 1,
    openSeaMetadata: createRawOpenSeaCollectionMetadata(),
    isSpam: false,
    spamClassifications: [],
    ...overrides
  };
}

export function createRawNft(
  contractAddress: string,
  name: string,
  tokenId: string,
  tokenType = NftTokenType.UNKNOWN,
  overrides?: Partial<RawNft>
): RawNft {
  return {
    contract: {
      ...createRawNftContract(contractAddress),
      ...overrides?.contract
    },
    name,
    description: `a truly unique NFT: ${name}`,
    timeLastUpdated: '2022-02-16T17:12:00.280Z',
    tokenId,
    tokenType: tokenType.toString(),
    tokenUri: 'https://token.uri',
    image: emptyNftImage,
    raw: {
      tokenUri: 'https://token.uri',
      metadata: {},
      error: null
    },
    collection: {
      name: 'Collection Name',
      slug: 'collection-name-slug',
      externalUrl: 'https://external.url',
      bannerImageUrl: 'https://banner.image.url'
    },
    ...overrides
  };
}

export function createRawOwnedNft(
  title: string,
  address: string,
  tokenId: string,
  balance: string,
  tokenType = NftTokenType.UNKNOWN,
  contract?: Partial<RawNftContractForNft>
): RawOwnedNft {
  return {
    ...createRawNft(address, title, tokenId, tokenType, {
      contract: {
        ...createRawNftContract(address),
        ...contract
      }
    }),
    balance
  };
}

export function createOwnedNft(
  title: string,
  address: string,
  tokenId: string,
  balance: string,
  tokenType = NftTokenType.UNKNOWN
): OwnedNft {
  return {
    ...createNft(title, address, tokenId, tokenType),
    balance
  };
}

export function createRawNftSale(
  contractAddress: string,
  tokenId: string,
  marketplace: NftSaleMarketplace,
  taker: NftSaleTakerType,
  buyerAddress: string,
  sellerAddress: string
): RawNftSale {
  const feeData: RawNftSaleFeeData = {
    amount: '100',
    tokenAddress: '0x423',
    decimals: 18,
    symbol: 'ETH'
  };

  return {
    blockNumber: 15948091,
    bundleIndex: 0,
    buyerAddress,
    contractAddress,
    logIndex: 392,
    marketplace,
    protocolFee: feeData,
    quantity: '2',
    royaltyFee: feeData,
    sellerFee: feeData,
    sellerAddress,
    taker,
    tokenId,
    transactionHash:
      '0xacad756c9094473a72f042e47cededcd11398333bbc64445f70266b85a929435'
  };
}

const emptyNftImage: RawNftImage = {
  cachedUrl: null,
  thumbnailUrl: null,
  pngUrl: null,
  contentType: null,
  size: null,
  originalUrl: null
};

export function createRawContractForOwner(
  address: string,
  overrides?: Partial<RawNftContractForOwner>
): RawNftContractForOwner {
  return {
    address,
    displayNft: {
      tokenId: '0x0',
      name: null
    },
    image: emptyNftImage,
    openSeaMetadata: createRawOpenSeaCollectionMetadata(),
    isSpam: false,
    totalBalance: '1',
    numDistinctTokensOwned: '1',
    name: 'NFT Name' ?? null,
    totalSupply: '12345' ?? null,
    symbol: 'SYM' ?? null,
    tokenType: NftTokenType.UNKNOWN,
    contractDeployer: '0xabcdef' ?? null,
    deployedBlockNumber: 42 ?? null,
    ...overrides
  };
}

export function verifyNftContractMetadata(
  actualNftContract: NftContract,
  expectedNftContract: NftContract,
  address: string,
  name: string,
  symbol: string,
  totalSupply: string,
  tokenType?: NftTokenType,
  openSea?: RawOpenSeaCollectionMetadata
) {
  expect(actualNftContract).toEqual(expectedNftContract);
  expect(actualNftContract.address).toEqual(address);
  expect(actualNftContract.name).toEqual(name);
  expect(actualNftContract.symbol).toEqual(symbol);
  expect(actualNftContract.totalSupply).toEqual(totalSupply);
  expect(actualNftContract.tokenType).toEqual(tokenType);

  if (openSea) {
    expect(actualNftContract.openSeaMetadata?.floorPrice).toEqual(
      openSea.floorPrice
    );
    expect(actualNftContract.openSeaMetadata?.collectionName).toEqual(
      openSea.collectionName
    );
    expect(actualNftContract.openSeaMetadata?.safelistRequestStatus).toEqual(
      openSea.safelistRequestStatus
    );
    expect(actualNftContract.openSeaMetadata?.imageUrl).toEqual(
      openSea.imageUrl
    );
    expect(actualNftContract.openSeaMetadata?.description).toEqual(
      openSea.description
    );
    expect(actualNftContract.openSeaMetadata?.externalUrl).toEqual(
      openSea.externalUrl
    );
    expect(actualNftContract.openSeaMetadata?.twitterUsername).toEqual(
      openSea.twitterUsername
    );
    expect(actualNftContract.openSeaMetadata?.discordUrl).toEqual(
      openSea.discordUrl
    );
    expect(actualNftContract.openSeaMetadata?.lastIngestedAt).toEqual(
      openSea.lastIngestedAt
    );
  }
}

export type Mocked<T> = T & {
  [K in keyof T]: T[K] extends Function ? T[K] & jest.Mock : T[K];
};

/** A Promise implementation for deferred resolution. */
export class Deferred<R> {
  promise: Promise<R>;

  constructor() {
    this.promise = new Promise<R>(
      (
        resolve: (value: R | Promise<R>) => void,
        reject: (reason: Error) => void
      ) => {
        this.resolve = resolve;
        this.reject = reject;
      }
    );
  }

  resolve: (value: R | Promise<R>) => void = () => {};
  reject: (reason: Error) => void = () => {};
}

export function makeNewHeadsEvent(
  blockNumber: number,
  hash: string
): BlockHead {
  return { hash, number: toHex(blockNumber) } as any;
}

export function makeLogsEvent(
  blockNumber: number,
  blockHash: string,
  isRemoved = false,
  logIndex = 1
): LogsEvent {
  return {
    blockHash,
    blockNumber: toHex(blockNumber),
    logIndex: toHex(logIndex),
    removed: isRemoved
  } as any;
}

export const TESTING_PRIVATE_KEY =
  'dd5bdf09397b1fdf98e4f72c66047d5104b1511fa7dc1b8fdddd61a150f732c9';
export const TESTING_PUBLIC_ADDRESS =
  '0x4b9007B0BcE78cfB634032ec31Ed56adB464287b';

export async function loadAlchemyEnv(): Promise<void> {
  const dotenv = await import('dotenv');
  dotenv.config({ path: 'alchemy.env' });
}
