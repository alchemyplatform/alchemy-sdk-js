import { BigNumber } from '@ethersproject/bignumber';

import {
  BaseNft,
  Media,
  Nft,
  NftContract,
  NftSaleFeeData,
  NftSaleMarketplace,
  NftSaleTakerType,
  NftTokenType,
  OwnedBaseNft,
  OwnedNft,
  toHex
} from '../src';
import {
  RawBaseNft,
  RawContractBaseNft,
  RawContractForOwner,
  RawNft,
  RawNftContract,
  RawNftImage,
  RawNftSale,
  RawOpenSeaCollectionMetadata,
  RawOwnedBaseNft,
  RawOwnedNft
} from '../src/internal/raw-interfaces';
import { BlockHead, LogsEvent } from '../src/internal/websocket-backfiller';
import { getBaseNftFromRaw, getNftFromRaw } from '../src/util/util';

export const TEST_WALLET_PRIVATE_KEY =
  'dd5bdf09397b1fdf98e4f72c66047d5104b1511fa7dc1b8fdddd61a150f732c9';
export const TEST_WALLET_PUBLIC_ADDRESS =
  '0x4b9007B0BcE78cfB634032ec31Ed56adB464287b';

export function createRawNftContract(
  overrides?: Partial<RawNftContract>
): RawNftContract {
  return {
    address: '0x123',
    name: 'Test Contract',
    symbol: 'TEST',
    tokenType: 'ERC721',
    totalSupply: '9999',
    openSeaMetadata: {
      ...createRawOpenSeaCollectionMetadata(overrides?.openSeaMetadata)
    },
    image: {
      ...createRawNftImage(overrides?.image)
    },
    contractDeployer: '0x123',
    deployedBlockNumber: 424242,
    isSpam: true,
    classifications: ['Erc721TooManyOwners'],
    ...overrides
  };
}

export function createRawOpenSeaCollectionMetadata(
  overrides?: Partial<RawOpenSeaCollectionMetadata>
): RawOpenSeaCollectionMetadata {
  return {
    floorPrice: 2.2998,
    collectionName: 'Collection Name',
    safelistRequestStatus: 'verified',
    imageUrl: 'http://image.url',
    description: 'A sample description',
    externalUrl: 'http://external.url',
    twitterUsername: 'twitter-handle',
    discordUrl: 'https://discord.gg/example',
    lastIngestedAt: '2022-10-26T22:24:49.000Z',
    ...overrides
  };
}

export function createRawNftImage(
  overrides?: Partial<RawNftImage>
): RawNftImage {
  return {
    originalUrl: 'http://original.url',
    cachedUrl: 'http://cached.url',
    thumbnailUrl: 'http://thumbnail.url',
    pngUrl: 'http://png.url',
    contentType: 'image/png',
    size: 12345,
    ...overrides
  };
}

export function createRawOwnedBaseNft(
  address: string,
  tokenId: string,
  balance: string
): RawOwnedBaseNft {
  return {
    balance,
    contract: {
      address
    },
    tokenId
  };
}

export function createOwnedBaseNft(
  address: string,
  tokenId: string,
  balance: number
): OwnedBaseNft {
  return {
    ...createBaseNft(address, tokenId),
    balance,
    tokenType: NftTokenType.UNKNOWN
  };
}

export function createRawBaseNft(
  contractAddress: string,
  tokenId: string | number
): RawBaseNft {
  return {
    contract: { address: contractAddress },
    tokenId: BigNumber.from(tokenId).toString()
  };
}

export function createBaseNft(
  address: string,
  tokenId: string | number
): BaseNft {
  return getBaseNftFromRaw(createRawBaseNft(address, tokenId));
}

export function createNft(
  title: string,
  address: string,
  tokenId: string,
  tokenType = NftTokenType.UNKNOWN
): Nft {
  return getNftFromRaw(createRawNft(address, title, tokenId, tokenType));
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
      address: contractAddress,
      tokenType,
      name,
      symbol: 'SYM',
      totalSupply: '1',
      openSeaMetadata: overrides?.contract?.openSeaMetadata ?? nullOSC,
      contractDeployer: '0xDEF',
      deployedBlockNumber: 424242,
      isSpam: true,
      classifications: ['Erc721TooManyOwners'],
      image: createRawNftImage(),
      ...overrides?.contract
    },
    name,
    tokenType,
    tokenId,
    description: overrides?.description ?? `a truly unique NFT: ${name}`,
    timeLastUpdated: overrides?.timeLastUpdated ?? '2022-02-16T17:12:00.280Z',
    raw: {
      tokenUri: 'ipfs://token.uri',
      metadata: {},
      ...overrides?.raw
    },
    error: 'Mock error field',
    tokenUri: 'https://token.uri',
    image: createRawNftImage(),
    ...overrides
  };
}

export function createRawOwnedNft(
  title: string,
  address: string,
  tokenId: string,
  balance: string,
  tokenType = NftTokenType.UNKNOWN,
  overrides?: Partial<RawOwnedNft>
): RawOwnedNft {
  return {
    ...createRawNft(address, title, tokenId, tokenType),
    balance,
    ...overrides
  };
}

export function createOwnedNft(
  title: string,
  address: string,
  tokenId: string,
  balance: number,
  tokenType = NftTokenType.UNKNOWN
): OwnedNft {
  return {
    ...createNft(title, address, tokenId, tokenType),
    balance
  };
}

export function createRawNftContractBaseNft(
  tokenId: string
): RawContractBaseNft {
  return {
    tokenId
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
  const feeData: NftSaleFeeData = {
    amount: '100',
    decimal: 18,
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

export function createRawContractForOwner(
  address: string,
  tokenId: string,
  overrides?: Partial<RawContractForOwner>
): RawContractForOwner {
  return {
    tokenId,
    totalBalance: 1,
    numDistinctTokensOwned: 1,
    ...createRawNftContract({ address }),
    ...overrides
  };
}

export const nullOSC = {
  floorPrice: null,
  collectionName: null,
  safelistRequestStatus: null,
  imageUrl: null,
  description: null,
  externalUrl: null,
  twitterUsername: null,
  discordUrl: null,
  lastIngestedAt: null
};

export function createNftMediaData(
  bytes?: number,
  format?: string,
  thumbnail?: string
): Media {
  return {
    raw: 'http://api.nikeape.xyz/ipfs/nickbanc/1.jpg',
    gateway: 'http://api.nikeape.xyz/ipfs/nickbanc/1.jpg',
    bytes,
    format,
    thumbnail
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
