import {
  RawBaseNft,
  RawCollectionBaseNft,
  RawNft,
  RawOwnedBaseNft,
  RawOwnedNft
} from '../src/internal/raw-interfaces';
import {
  BaseNft,
  Nft,
  NftTokenType,
  OwnedBaseNft,
  OwnedNft,
  TokenUri
} from '../src';
import { BigNumber } from 'ethers';

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
  return BaseNft.fromResponse(createRawBaseNft(tokenId, tokenType), address);
}

export function createNft(
  title: string,
  address: string,
  tokenId: string,
  tokenType = NftTokenType.UNKNOWN,
  tokenUri?: TokenUri,
  media?: TokenUri[] | undefined
): Nft {
  return Nft.fromResponse(
    createRawNft(title, tokenId, tokenType, tokenUri, media),
    address
  );
}

export function createRawNft(
  title: string,
  tokenId: string,
  tokenType = NftTokenType.UNKNOWN,
  tokenUri?: TokenUri,
  media?: TokenUri[] | undefined,
  timeLastUpdated?: string
): RawNft {
  return {
    title,
    description: `a truly unique NFT: ${title}`,
    timeLastUpdated: timeLastUpdated ?? '2022-02-16T17:12:00.280Z',
    id: {
      tokenId,
      tokenMetadata: {
        tokenType
      }
    },
    tokenUri,
    media
  };
}

export function createRawOwnedNft(
  title: string,
  address: string,
  tokenId: string,
  balance: string,
  tokenType = NftTokenType.UNKNOWN
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

export function createRawCollectionBaseNft(
  tokenId: string
): RawCollectionBaseNft {
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
