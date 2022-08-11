import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import {
  GetBaseNftsForContractOptions,
  GetBaseNftsForOwnerOptions,
  GetFloorPriceResponse,
  GetNftsForContractOptions,
  GetNftsForOwnerOptions,
  GetOwnersForContractResponse,
  GetOwnersForNftResponse,
  NftContractBaseNftsResponse,
  NftContractNftsResponse,
  NftTokenType,
  OwnedBaseNft,
  OwnedBaseNftsResponse,
  OwnedNft,
  OwnedNftsResponse,
  RefreshContractResult,
  RefreshState
} from '../types/types';
import { BaseNft, Nft, NftContract } from '../api/nft';
import { paginateEndpoint, requestHttpWithBackoff } from './dispatch';
import {
  RawBaseNft,
  RawContractBaseNft,
  RawContractNft,
  RawGetBaseNftsForContractResponse,
  RawGetBaseNftsResponse,
  RawGetNftsForContractResponse,
  RawGetNftsResponse,
  RawGetOwnersForContractResponse,
  RawNft,
  RawNftContract,
  RawOwnedBaseNft,
  RawOwnedNft,
  RawReingestContractResponse
} from './raw-interfaces';
import { AlchemyApiType } from '../util/const';
import {
  getBaseNftFromRaw,
  getNftContractFromRaw,
  getNftFromRaw
} from '../util/util';
import { AlchemyConfig } from '../api/alchemy-config';

export async function getNftMetadata(
  config: AlchemyConfig,
  contractAddress: string,
  tokenId: BigNumberish,
  tokenType?: NftTokenType,
  srcMethod = 'getNftMetadata'
): Promise<Nft> {
  const response = await requestHttpWithBackoff<GetNftMetadataParams, RawNft>(
    config,
    AlchemyApiType.NFT,
    'getNFTMetadata',
    srcMethod,
    {
      contractAddress,
      tokenId: BigNumber.from(tokenId!).toString(),
      tokenType: tokenType !== NftTokenType.UNKNOWN ? tokenType : undefined
    }
  );
  return getNftFromRaw(response, contractAddress);
}

export async function getContractMetadata(
  config: AlchemyConfig,
  contractAddress: string,
  srcMethod = 'getContractMetadata'
): Promise<NftContract> {
  const response = await requestHttpWithBackoff<
    GetContractMetadataParams,
    RawNftContract
  >(config, AlchemyApiType.NFT, 'getContractMetadata', srcMethod, {
    contractAddress
  });

  return getNftContractFromRaw(response);
}

export async function* getNftsForOwnerIterator(
  config: AlchemyConfig,
  owner: string,
  options?: GetNftsForOwnerOptions | GetBaseNftsForOwnerOptions,
  srcMethod = 'getNftsForOwnerIterator'
): AsyncIterable<OwnedBaseNft | OwnedNft> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  for await (const response of paginateEndpoint(
    config,
    AlchemyApiType.NFT,
    'getNFTs',
    srcMethod,
    'pageKey',
    'pageKey',
    {
      contractAddresses: options?.contractAddresses,
      pageKey: options?.pageKey,
      filters: options?.excludeFilters,
      owner,
      withMetadata
    }
  )) {
    for (const ownedNft of response.ownedNfts as
      | RawOwnedNft[]
      | RawOwnedBaseNft[]) {
      yield {
        ...nftFromGetNftResponse(ownedNft),
        balance: parseInt(ownedNft.balance)
      };
    }
  }
}

export async function getNftsForOwner(
  config: AlchemyConfig,
  owner: string,
  options?: GetNftsForOwnerOptions | GetBaseNftsForOwnerOptions,
  srcMethod = 'getNftsForOwner'
): Promise<OwnedNftsResponse | OwnedBaseNftsResponse> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  const response = await requestHttpWithBackoff<
    GetNftsAlchemyParams,
    RawGetBaseNftsResponse | RawGetNftsResponse
  >(config, AlchemyApiType.NFT, 'getNFTs', srcMethod, {
    contractAddresses: options?.contractAddresses,
    pageKey: options?.pageKey,
    filters: options?.excludeFilters,
    owner,
    pageSize: options?.pageSize,
    withMetadata
  });
  return {
    ownedNfts: response.ownedNfts.map(res => ({
      ...nftFromGetNftResponse(res),
      balance: parseInt(res.balance)
    })),
    pageKey: response.pageKey,
    totalCount: response.totalCount
  };
}

export async function getNftsForContract(
  config: AlchemyConfig,
  contractAddress: string,
  options?: GetBaseNftsForContractOptions | GetNftsForContractOptions,
  srcMethod = 'getNftsForContract'
): Promise<NftContractNftsResponse | NftContractBaseNftsResponse> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  const response = await requestHttpWithBackoff<
    GetNftsForNftContractAlchemyParams,
    RawGetBaseNftsForContractResponse | RawGetNftsForContractResponse
  >(config, AlchemyApiType.NFT, 'getNFTsForCollection', srcMethod, {
    contractAddress,
    startToken: options?.pageKey,
    withMetadata,
    limit: options?.pageSize ?? undefined
  });

  return {
    nfts: response.nfts.map(res =>
      nftFromGetNftNftContractResponse(res, contractAddress)
    ),
    pageKey: response.nextToken
  };
}

export async function* getNftsForContractIterator(
  config: AlchemyConfig,
  contractAddress: string,
  options?: GetBaseNftsForContractOptions | GetNftsForContractOptions,
  srcMethod = 'getNftsForContractIterator'
): AsyncIterable<BaseNft | Nft> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  for await (const response of paginateEndpoint(
    config,
    AlchemyApiType.NFT,
    'getNFTsForCollection',
    srcMethod,
    'startToken',
    'nextToken',
    {
      contractAddress,
      startToken: options?.pageKey,
      withMetadata
    }
  )) {
    for (const nft of response.nfts as
      | RawContractBaseNft[]
      | RawContractNft[]) {
      yield nftFromGetNftNftContractResponse(nft, contractAddress);
    }
  }
}

export async function getOwnersForContract(
  config: AlchemyConfig,
  contractAddress: string,
  srcMethod = 'getOwnersForContract'
): Promise<GetOwnersForContractResponse> {
  const response = await requestHttpWithBackoff<
    GetOwnersForNftContractAlchemyParams,
    RawGetOwnersForContractResponse
  >(config, AlchemyApiType.NFT, 'getOwnersForCollection', srcMethod, {
    contractAddress
  });

  return {
    owners: response.ownerAddresses
  };
}

export async function getOwnersForNft(
  config: AlchemyConfig,
  contractAddress: string,
  tokenId: BigNumberish,
  srcMethod = 'getOwnersForNft'
): Promise<GetOwnersForNftResponse> {
  return requestHttpWithBackoff(
    config,
    AlchemyApiType.NFT,
    'getOwnersForToken',
    srcMethod,
    {
      contractAddress,
      tokenId: BigNumber.from(tokenId!).toString()
    }
  );
}

export async function checkNftOwnership(
  config: AlchemyConfig,
  owner: string,
  contractAddresses: string[],
  srcMethod = 'checkNftOwnership'
): Promise<boolean> {
  if (contractAddresses.length === 0) {
    throw new Error('Must provide at least one contract address');
  }
  const response = await getNftsForOwner(
    config,
    owner,
    {
      contractAddresses,
      omitMetadata: true
    },
    srcMethod
  );
  return response.ownedNfts.length > 0;
}

export async function isSpamContract(
  config: AlchemyConfig,
  contractAddress: string,
  srcMethod = 'isSpamContract'
): Promise<boolean> {
  return requestHttpWithBackoff<IsSpamContractParams, boolean>(
    config,
    AlchemyApiType.NFT,
    'isSpamContract',
    srcMethod,
    {
      contractAddress
    }
  );
}

export async function getSpamContracts(
  config: AlchemyConfig,
  srcMethod = 'getSpamContracts'
): Promise<string[]> {
  return requestHttpWithBackoff<undefined, string[]>(
    config,
    AlchemyApiType.NFT,
    'getSpamContracts',
    srcMethod,
    undefined
  );
}

export async function getFloorPrice(
  config: AlchemyConfig,
  contractAddress: string,
  srcMethod = 'getFloorPrice'
): Promise<GetFloorPriceResponse> {
  return requestHttpWithBackoff<GetFloorPriceParams, GetFloorPriceResponse>(
    config,
    AlchemyApiType.NFT,
    'getFloorPrice',
    srcMethod,
    {
      contractAddress
    }
  );
}

export async function refreshNftMetadata(
  config: AlchemyConfig,
  contractAddress: string,
  tokenId: BigNumberish,
  srcMethod = 'refreshNftMetadata'
): Promise<boolean> {
  const tokenIdString = BigNumber.from(tokenId!).toString();
  const first = await getNftMetadata(
    config,
    contractAddress,
    tokenIdString,
    undefined,
    srcMethod
  );
  const second = await refresh(
    config,
    contractAddress,
    tokenIdString,
    srcMethod
  );
  return first.timeLastUpdated !== second.timeLastUpdated;
}

export async function refreshContract(
  config: AlchemyConfig,
  contractAddress: string,
  srcMethod = 'refreshContract'
): Promise<RefreshContractResult> {
  const response = await requestHttpWithBackoff<
    ReingestContractParams,
    RawReingestContractResponse
  >(config, AlchemyApiType.NFT, 'reingestContract', srcMethod, {
    contractAddress
  });

  return {
    contractAddress: response.contractAddress,
    refreshState: parseReingestionState(response.reingestionState),
    progress: response.progress
  };
}

async function refresh(
  config: AlchemyConfig,
  contractAddress: string,
  tokenId: BigNumberish,
  srcMethod: string
): Promise<Nft> {
  const response = await requestHttpWithBackoff<GetNftMetadataParams, RawNft>(
    config,
    AlchemyApiType.NFT,
    'getNFTMetadata',
    srcMethod,
    {
      contractAddress,
      tokenId: BigNumber.from(tokenId!).toString(),
      refreshCache: true
    }
  );
  return getNftFromRaw(response, contractAddress);
}

/**
 * Helper method to convert a NFT response received from Alchemy backend to an
 * SDK NFT type.
 *
 * @internal
 */
function nftFromGetNftResponse(
  ownedNft: RawOwnedBaseNft | RawOwnedNft
): Nft | BaseNft {
  if (isNftWithMetadata(ownedNft)) {
    return getNftFromRaw(ownedNft, ownedNft.contract.address);
  } else {
    return getBaseNftFromRaw(ownedNft, ownedNft.contract.address);
  }
}

/**
 * Helper method to convert a NFT response received from Alchemy backend to an
 * SDK NFT type.
 *
 * @internal
 */
function nftFromGetNftNftContractResponse(
  ownedNft: RawContractBaseNft | RawContractNft,
  contractAddress: string
): Nft | BaseNft {
  if (isNftWithMetadata(ownedNft)) {
    return getNftFromRaw(ownedNft, contractAddress);
  } else {
    return getBaseNftFromRaw(ownedNft, contractAddress);
  }
}

/** @internal */
// TODO: more comprehensive type check
function isNftWithMetadata(response: RawBaseNft | RawNft): response is RawNft {
  return (response as RawNft).title !== undefined;
}

/**
 * Flips the `omitMetadata` SDK parameter type to the `withMetadata` parameter
 * required by the Alchemy API. If `omitMetadata` is undefined, the SDK defaults
 * to including metadata.
 *
 * @internal
 */
function omitMetadataToWithMetadata(
  omitMetadata: boolean | undefined
): boolean {
  return omitMetadata === undefined ? true : !omitMetadata;
}

function parseReingestionState(reingestionState: string): RefreshState {
  switch (reingestionState) {
    case 'does_not_exist':
      return RefreshState.DOES_NOT_EXIST;
    case 'already_queued':
      return RefreshState.ALREADY_QUEUED;
    case 'in_progress':
      return RefreshState.IN_PROGRESS;
    case 'finished':
      return RefreshState.FINISHED;
    case 'queued':
      return RefreshState.QUEUED;
    case 'queue_failed':
      return RefreshState.QUEUE_FAILED;
    default:
      throw new Error('Unknown reingestion state: ' + reingestionState);
  }
}

/**
 * Interface for the `getNftsForNftContract` endpoint. The main difference is
 * that the endpoint has a `startToken` parameter, but the SDK standardizes all
 * pagination parameters to `pageKey`.
 *
 * @internal
 */
interface GetNftsForNftContractAlchemyParams {
  contractAddress: string;
  startToken?: string;
  withMetadata: boolean;
  limit?: number;
}

/**
 * Interface for the `getNfts` endpoint. The main difference is that the
 * endpoint has a `withMetadata` parameter, but the SDK exposes the parameter as
 * `omitMetadata`.
 *
 * @internal
 */
interface GetNftsAlchemyParams {
  owner: string;
  pageKey?: string;
  contractAddresses?: string[];
  filters?: string[];
  pageSize?: number;
  withMetadata: boolean;
}

/**
 * Interface for the `getNftMetadata` endpoint.
 *
 * @internal
 */
interface GetNftMetadataParams {
  contractAddress: string;
  tokenId: string;
  tokenType?: NftTokenType;
  refreshCache?: boolean;
}

/**
 * Interface for the `isSpamContract` endpoint.
 *
 * @internal
 */
interface IsSpamContractParams {
  contractAddress: string;
}

/**
 * Interface for the `getNftContractMetadata` endpoint.
 *
 * @internal
 */
interface GetContractMetadataParams {
  contractAddress: string;
}

/**
 * Interface for the `getOwnersForNftContract` endpoint.
 *
 * @internal
 */
interface GetOwnersForNftContractAlchemyParams {
  contractAddress: string;
}

/**
 * Interface for the `getFloorPrice` endpoint.
 *
 * @internal
 */
interface GetFloorPriceParams {
  contractAddress: string;
}

interface ReingestContractParams {
  contractAddress: string;
}
