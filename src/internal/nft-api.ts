import { BaseNft, Nft, NftContract } from '../api/nft';
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
import { paginateEndpoint, requestHttpWithBackoff } from './dispatch';
import {
  RawBaseNft,
  RawGetBaseNftsForNftContractResponse,
  RawGetBaseNftsResponse,
  RawGetNftsForNftContractResponse,
  RawGetNftsResponse,
  RawGetOwnersForNftContractResponse,
  RawNft,
  RawNftContract,
  RawNftContractBaseNft,
  RawNftContractNft,
  RawOwnedBaseNft,
  RawOwnedNft,
  RawReingestContractResponse
} from './raw-interfaces';
import { AlchemyApiType  } from '../util/const';
import { getBaseNftFromRaw, getNftContractFromRaw, getNftFromRaw } from '../util/util';
import { AlchemyConfig } from '../api/alchemy-config';

export async function getNftMetadata(
  config: AlchemyConfig,
  contractAddress: string,
  tokenId: BigNumberish,
  tokenType?: NftTokenType
): Promise<Nft> {
  const response = await requestHttpWithBackoff<GetNftMetadataParams, RawNft>(
    config,
    AlchemyApiType.NFT,
    'getNFTMetadata',
    {
      contractAddress,
      tokenId: BigNumber.from(tokenId!).toString(),
      tokenType: tokenType !== NftTokenType.UNKNOWN ? tokenType : undefined
    }
  );
  return getNftFromRaw(response, contractAddress);
}

export async function getNftContractMetadata(
  config: AlchemyConfig,
  contractAddress: string
): Promise<NftContract> {
  const response = await requestHttpWithBackoff<
    GetNftContractMetadataParams,
    RawNftContract
  >(config, AlchemyApiType.NFT, 'getContractMetadata', {
    contractAddress
  });

  return getNftContractFromRaw(response);
}

export async function* getNftsForOwnerIterator(
  config: AlchemyConfig,
  owner: string,
  options?: GetNftsForOwnerOptions | GetBaseNftsForOwnerOptions
): AsyncIterable<OwnedBaseNft | OwnedNft> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  for await (const response of paginateEndpoint(
    config,
    AlchemyApiType.NFT,
    'getNFTs',
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
  options?: GetNftsForOwnerOptions | GetBaseNftsForOwnerOptions
): Promise<OwnedNftsResponse | OwnedBaseNftsResponse> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  const response = await requestHttpWithBackoff<
    GetNftsAlchemyParams,
    RawGetBaseNftsResponse | RawGetNftsResponse
  >(config, AlchemyApiType.NFT, 'getNFTs', {
    contractAddresses: options?.contractAddresses,
    pageKey: options?.pageKey,
    filters: options?.excludeFilters,
    owner,
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
  options?: GetBaseNftsForContractOptions | GetNftsForContractOptions
): Promise<NftContractNftsResponse | NftContractBaseNftsResponse> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  const response = await requestHttpWithBackoff<
    GetNftsForNftContractAlchemyParams,
    RawGetBaseNftsForNftContractResponse | RawGetNftsForNftContractResponse
  >(config, AlchemyApiType.NFT, 'getNFTsForCollection', {
    contractAddress,
    startToken: options?.pageKey,
    withMetadata
  });

  return {
    nfts: response.nfts.map(res =>
      nftFromGetNftNftContractResponse(res, contractAddress)
    ),
    pageKey: response.nextToken
  };
}

export async function getOwnersForContract(
  config: AlchemyConfig,
  contractAddress: string
): Promise<GetOwnersForContractResponse> {
  const response = await requestHttpWithBackoff<
    GetOwnersForNftContractAlchemyParams,
    RawGetOwnersForNftContractResponse
  >(config, AlchemyApiType.NFT, 'getOwnersForCollection', {
    contractAddress
  });

  return {
    owners: response.ownerAddresses
  };
}

export function getOwnersForNft(
  config: AlchemyConfig,
  contractAddress: string,
  tokenId?: BigNumberish
): Promise<GetOwnersForNftResponse> {
  return requestHttpWithBackoff(
    config,
    AlchemyApiType.NFT,
    'getOwnersForToken',
    {
      contractAddress,
      tokenId: BigNumber.from(tokenId!).toString()
    }
  );
}

export async function* getNftsForNftContractIterator(
  config: AlchemyConfig,
  contractAddress: string,
  options?: GetBaseNftsForContractOptions | GetNftsForContractOptions
): AsyncIterable<BaseNft | Nft> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  for await (const response of paginateEndpoint(
    config,
    AlchemyApiType.NFT,
    'getNFTsForCollection',
    'startToken',
    'nextToken',
    {
      contractAddress,
      startToken: options?.pageKey,
      withMetadata
    }
  )) {
    for (const nft of response.nfts as
      | RawNftContractBaseNft[]
      | RawNftContractNft[]) {
      yield nftFromGetNftNftContractResponse(nft, contractAddress);
    }
  }
}

export async function checkNftOwnership(
  config: AlchemyConfig,
  owner: string,
  contractAddresses: string[]
): Promise<boolean> {
  if (contractAddresses.length === 0) {
    throw new Error('Must provide at least one contract address');
  }
  const response = await getNftsForOwner(config, owner, {
    contractAddresses,
    omitMetadata: true
  });
  return response.ownedNfts.length > 0;
}

export async function isSpamContract(
  config: AlchemyConfig,
  contractAddress: string
): Promise<boolean> {
  return requestHttpWithBackoff<IsSpamContractParams, boolean>(
    config,
    AlchemyApiType.NFT,
    'isSpamContract',
    {
      contractAddress
    }
  );
}

/**
 * Returns a list of all spam contracts marked by Alchemy. For details on how
 * Alchemy marks spam contracts, go to
 * https://docs.config.com/config/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification.
 *
 * @param config - The Alchemy SDK instance.
 * @beta
 */
export async function getSpamContracts(
  config: AlchemyConfig
): Promise<string[]> {
  return requestHttpWithBackoff<undefined, string[]>(
    config,
    AlchemyApiType.NFT,
    'getSpamContracts',
    undefined
  );
}

export async function getFloorPrice(
  config: AlchemyConfig,
  contractAddress: string
): Promise<GetFloorPriceResponse> {
  return requestHttpWithBackoff<GetFloorPriceParams, GetFloorPriceResponse>(
    config,
    AlchemyApiType.NFT,
    'getFloorPrice',
    {
      contractAddress
    }
  );
}

export async function refreshNftMetadata(
  config: AlchemyConfig,
  contractAddress: string,
  tokenId?: BigNumberish
): Promise<boolean> {
  const tokenIdString = BigNumber.from(tokenId!).toString();
  const first = await getNftMetadata(config, contractAddress, tokenIdString);
  const second = await refresh(config, contractAddress, tokenIdString);
  return first.timeLastUpdated !== second.timeLastUpdated;
}

export async function refreshNftContract(
  config: AlchemyConfig,
  contractAddress: string
): Promise<RefreshContractResult> {
  const response = await requestHttpWithBackoff<
    ReingestContractParams,
    RawReingestContractResponse
  >(config, AlchemyApiType.NFT, 'reingestContract', {
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
  tokenId: BigNumberish
): Promise<Nft> {
  const response = await requestHttpWithBackoff<GetNftMetadataParams, RawNft>(
    config,
    AlchemyApiType.NFT,
    'getNFTMetadata',
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
  ownedNft: RawNftContractBaseNft | RawNftContractNft,
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
interface GetNftContractMetadataParams {
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
