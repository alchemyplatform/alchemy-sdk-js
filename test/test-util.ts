import { BigNumber } from '@ethersproject/bignumber';

import {
  BaseNft,
  Nft,
  NftContract,
  NftSaleFeeData,
  NftTokenType,
  OwnedBaseNft,
  OwnedNft,
  TokenUri,
  toHex,
  NftSaleTakerType,
  NftSaleMarketplace,
  Media
} from '../src';
import {
  RawBaseNft,
  RawContractBaseNft,
  RawContractForOwner,
  RawNft,
  RawNftContract,
  RawNftContractMetadata,
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

/** Creates a dummy response for the `getContractMetadata` endpoint. */
export function createRawNftContract(
  address: string,
  tokenType: NftTokenType,
  name?: string,
  symbol?: string,
  totalSupply?: string,
  openSea?: RawOpenSeaCollectionMetadata
): RawNftContract {
  return {
    address,
    contractMetadata: {
      name,
      symbol,
      totalSupply,
      tokenType,
      openSea
    }
  };
}

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
  balance: string,
  tokenType?: NftTokenType
): RawOwnedBaseNft {
  const response: RawOwnedBaseNft = {
    balance,
    contract: {
      address
    },
    id: {
      tokenId
    }
  };
  if (tokenType) {
    response.id.tokenMetadata = { tokenType };
  }
  return response;
}

export function createOwnedBaseNft(
  address: string,
  tokenId: string,
  balance: number,
  tokenType = NftTokenType.UNKNOWN
): OwnedBaseNft {
  return {
    ...createBaseNft(address, tokenId, tokenType),
    balance
  };
}

export function createRawBaseNft(
  contractAddress: string,
  tokenId: string | number,
  tokenType = NftTokenType.UNKNOWN
): RawBaseNft {
  return {
    contract: { address: contractAddress },
    id: {
      tokenId: BigNumber.from(tokenId).toString(),
      tokenMetadata: { tokenType }
    }
  };
}

export function createBaseNft(
  address: string,
  tokenId: string | number,
  tokenType = NftTokenType.UNKNOWN
): BaseNft {
  return getBaseNftFromRaw(createRawBaseNft(address, tokenId, tokenType));
}

export function createNft(
  title: string,
  address: string,
  tokenId: string,
  tokenType = NftTokenType.UNKNOWN,
  tokenUri?: TokenUri,
  media?: TokenUri[] | undefined
): Nft {
  return getNftFromRaw(
    createRawNft(address, title, tokenId, tokenType, { tokenUri, media })
  );
}

interface RawNftOptions {
  tokenUri?: TokenUri;
  media?: TokenUri[] | undefined;
  timeLastUpdated?: string;
  description?: string | Array<string>;
  contractMetadata?: RawNftContractMetadata;
}

export function createRawNft(
  contractAddress: string,
  title: string,
  tokenId: string,
  tokenType = NftTokenType.UNKNOWN,
  options?: RawNftOptions
): RawNft {
  return {
    contract: { address: contractAddress },
    title,
    description: options?.description ?? `a truly unique NFT: ${title}`,
    timeLastUpdated: options?.timeLastUpdated ?? '2022-02-16T17:12:00.280Z',
    id: {
      tokenId,
      tokenMetadata: {
        tokenType
      }
    },
    tokenUri: options?.tokenUri,
    media: options?.media,
    contractMetadata: options?.contractMetadata
  };
}

export function createRawOwnedNft(
  title: string,
  address: string,
  tokenId: string,
  balance: string,
  tokenType = NftTokenType.UNKNOWN,
  contractMetadata?: RawNftContractMetadata
): RawOwnedNft {
  return {
    ...createRawNft(address, title, tokenId, tokenType, { contractMetadata }),
    balance
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
    id: {
      tokenId
    }
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
    marketplaceFee: feeData,
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

export function createRawGetContractsForOwner(
  address: string,
  tokenId: string,
  media: Media,
  isSpam?: boolean,
  name?: string,
  tokenType?: NftTokenType,
  symbol?: string,
  opensea?: RawOpenSeaCollectionMetadata
): RawContractForOwner {
  return {
    address,
    isSpam: isSpam ?? true,
    media,
    tokenId,
    totalBalance: 1,
    numDistinctTokensOwned: 1,
    name,
    opensea,
    symbol,
    tokenType
  };
}

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
    expect(actualNftContract.openSea?.floorPrice).toEqual(openSea.floorPrice);
    expect(actualNftContract.openSea?.collectionName).toEqual(
      openSea.collectionName
    );
    expect(actualNftContract.openSea?.safelistRequestStatus).toEqual(
      openSea.safelistRequestStatus
    );
    expect(actualNftContract.openSea?.imageUrl).toEqual(openSea.imageUrl);
    expect(actualNftContract.openSea?.description).toEqual(openSea.description);
    expect(actualNftContract.openSea?.externalUrl).toEqual(openSea.externalUrl);
    expect(actualNftContract.openSea?.twitterUsername).toEqual(
      openSea.twitterUsername
    );
    expect(actualNftContract.openSea?.discordUrl).toEqual(openSea.discordUrl);
    expect(actualNftContract.openSea?.lastIngestedAt).toEqual(
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
