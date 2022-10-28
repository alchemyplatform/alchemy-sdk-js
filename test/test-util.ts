import { BigNumber } from '@ethersproject/bignumber';

import {
  BaseNft,
  BaseNftContract,
  Nft,
  NftTokenType,
  OwnedBaseNft,
  OwnedNft,
  TokenUri,
  toHex
} from '../src';
import {
  RawBaseNft,
  RawBaseNftContract,
  RawContractBaseNft,
  RawNft,
  RawNftContract,
  RawNftContractMetadata,
  RawOpenSeaCollectionMetadata,
  RawOwnedBaseNft,
  RawOwnedNft
} from '../src/internal/raw-interfaces';
import { BlockHead, LogsEvent } from '../src/internal/websocket-backfiller';
import {
  getBaseNftContractFromRaw,
  getBaseNftFromRaw,
  getNftFromRaw
} from '../src/util/util';

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

export function createRawBaseNftContract(address: string): RawBaseNftContract {
  return { address };
}

export function createBaseNftContract(address: string): BaseNftContract {
  return getBaseNftContractFromRaw(createRawBaseNftContract(address));
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
  tokenId: string | number,
  tokenType = NftTokenType.UNKNOWN
): RawBaseNft {
  return {
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
  return getBaseNftFromRaw(createRawBaseNft(tokenId, tokenType), address);
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
    createRawNft(title, tokenId, tokenType, { tokenUri, media }),
    address
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
  title: string,
  tokenId: string,
  tokenType = NftTokenType.UNKNOWN,
  options?: RawNftOptions
): RawNft {
  return {
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
    ...createRawNft(title, tokenId, tokenType),
    contract: {
      address
    },
    id: {
      tokenId,
      tokenMetadata: {
        tokenType
      }
    },
    contractMetadata,
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
