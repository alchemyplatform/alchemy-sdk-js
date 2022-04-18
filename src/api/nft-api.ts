import {
  CollectionBaseNftsResponse,
  CollectionNftsResponse,
  GetBaseNftsForCollectionParams,
  GetBaseNftsParams,
  GetNftsForCollectionParams,
  GetNftsParams,
  GetOwnersForTokenResponse,
  NftTokenType,
  OwnedBaseNft,
  OwnedBaseNftsResponse,
  OwnedNft,
  OwnedNftsResponse
} from '../types/types';
import { Alchemy } from './alchemy';
import { paginateEndpoint, requestHttpWithBackoff } from '../internal/dispatch';
import { BaseNft, Nft, normalizeTokenIdToHex } from './nft';
import {
  RawBaseNft,
  RawCollectionBaseNft,
  RawCollectionNft,
  RawGetBaseNftsForCollectionResponse,
  RawGetBaseNftsResponse,
  RawGetNftsForCollectionResponse,
  RawGetNftsResponse,
  RawNft,
  RawOwnedBaseNft,
  RawOwnedNft
} from '../internal/raw-interfaces';

/**
 * Get the NFT metadata associated with the provided Base NFT.
 *
 * @param alchemy The Alchemy SDK instance.
 * @param baseNft The base NFT object to be used for the request.
 * @public
 */
export function getNftMetadata(
  alchemy: Alchemy,
  baseNft: BaseNft
): Promise<Nft>;

/**
 * Get the NFT metadata associated with the provided parameters.
 *
 * @param alchemy The Alchemy SDK instance.
 * @param contractAddress The contract address of the NFT.
 * @param tokenId Token id of the NFT as a hex string or integer.
 * @param tokenType Optionally specify the type of token to speed up the query.
 * @public
 */
export function getNftMetadata(
  alchemy: Alchemy,
  contractAddress: string,
  tokenId: number | string,
  tokenType?: NftTokenType
): Promise<Nft>;
export async function getNftMetadata(
  alchemy: Alchemy,
  contractAddressOrBaseNft: string | BaseNft,
  tokenId?: string | number,
  tokenType?: NftTokenType
): Promise<Nft> {
  let response;
  let contractAddress: string;
  if (typeof contractAddressOrBaseNft === 'string') {
    validateContractAddress(contractAddressOrBaseNft);
    contractAddress = contractAddressOrBaseNft;
    response = await requestHttpWithBackoff<GetNftMetadataParams, RawNft>(
      alchemy,
      'getNFTMetadata',
      {
        contractAddress: contractAddressOrBaseNft,
        tokenId: normalizeTokenIdToHex(tokenId!),
        tokenType: tokenType !== NftTokenType.UNKNOWN ? tokenType : undefined
      }
    );
  } else {
    contractAddress = contractAddressOrBaseNft.contract.address;
    response = await requestHttpWithBackoff<GetNftMetadataParams, RawNft>(
      alchemy,
      'getNFTMetadata',
      {
        contractAddress: contractAddressOrBaseNft.contract.address,
        tokenId: normalizeTokenIdToHex(contractAddressOrBaseNft.tokenId),
        tokenType:
          contractAddressOrBaseNft.tokenType !== NftTokenType.UNKNOWN
            ? contractAddressOrBaseNft.tokenType
            : undefined
      }
    );
  }
  return Nft.fromResponse(response, contractAddress);
}

/**
 * Fetches all NFTs for a given owner and yields them in an async iterable.
 *
 * This method returns the base NFTs that omit the associated metadata and pages
 * through all page keys until all NFTs have been fetched.
 *
 * @param alchemy The Alchemy SDK instance.
 * @param params The parameters to use for the request.
 */
export function getNftsPaginated(
  alchemy: Alchemy,
  params: GetBaseNftsParams
): AsyncIterable<OwnedBaseNft>;

/**
 * Fetches all NFTs for a given owner and yields them in an async iterable.
 *
 * This method returns the full NFT for the owner and pages through all page
 * keys until all NFTs have been fetched.
 *
 * @param alchemy The Alchemy SDK instance.
 * @param params The parameters to use for the request.
 */
export function getNftsPaginated(
  alchemy: Alchemy,
  params: GetNftsParams
): AsyncIterable<OwnedNft>;
export async function* getNftsPaginated(
  alchemy: Alchemy,
  params: GetNftsParams | GetBaseNftsParams
): AsyncIterable<OwnedBaseNft | OwnedNft> {
  const withMetadata = omitMetadataToWithMetadata(params.omitMetadata);
  for await (const response of paginateEndpoint(
    alchemy,
    'getNFTs',
    'pageKey',
    'pageKey',
    {
      ...params,
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

/**
 * Get all NFTs for an owner.
 *
 * This method returns the base NFTs that omit the associated metadata. To get
 * all NFTs with their associated metadata, use {@link getNfts}.
 *
 * @param alchemy The Alchemy SDK instance.
 * @param params The parameters to use for the request.
 * @public
 */
export async function getNfts(
  alchemy: Alchemy,
  params: GetBaseNftsParams
): Promise<OwnedBaseNftsResponse>;

/**
 * Get all NFTs for an owner.
 *
 * @param alchemy The Alchemy SDK instance.
 * @param params The parameters to use for the request.
 * @public
 */
export async function getNfts(
  alchemy: Alchemy,
  params: GetNftsParams
): Promise<OwnedNftsResponse>;
export async function getNfts(
  alchemy: Alchemy,
  params: GetNftsParams | GetBaseNftsParams
): Promise<OwnedNftsResponse | OwnedBaseNftsResponse> {
  const withMetadata = omitMetadataToWithMetadata(params.omitMetadata);
  const response = await requestHttpWithBackoff<
    GetNftsAlchemyParams,
    RawGetBaseNftsResponse | RawGetNftsResponse
  >(alchemy, 'getNFTs', {
    ...params,
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

/**
 * Get all base NFTs for a given contract address.
 *
 * This method returns the base NFTs that omit the associated metadata. To get
 * all NFTs with their associated metadata, use {@link GetNftsForCollectionParams}.
 *
 * @param alchemy The Alchemy SDK instance.
 * @param params The parameters to use for the request.
 * @beta
 */
export async function getNftsForCollection(
  alchemy: Alchemy,
  params: GetBaseNftsForCollectionParams
): Promise<CollectionBaseNftsResponse>;

/**
 * Get all NFTs for a given contract address.
 *
 * This method returns the full NFTs in the contract. To get all NFTs without
 * their associated metadata, use {@link GetBaseNftsForCollectionParams}.
 *
 * @param alchemy The Alchemy SDK instance.
 * @param params The parameters to use for the request. or
 *   {@link CollectionNftsResponse} response.
 * @beta
 */
export async function getNftsForCollection(
  alchemy: Alchemy,
  params: GetNftsForCollectionParams
): Promise<CollectionNftsResponse>;
export async function getNftsForCollection(
  alchemy: Alchemy,
  params: GetBaseNftsForCollectionParams | GetNftsForCollectionParams
): Promise<CollectionNftsResponse | CollectionBaseNftsResponse> {
  const withMetadata = omitMetadataToWithMetadata(params.omitMetadata);
  const response = await requestHttpWithBackoff<
    GetNftsForCollectionAlchemyParams,
    RawGetBaseNftsForCollectionResponse | RawGetNftsForCollectionResponse
  >(alchemy, 'getNFTsForCollection', {
    contractAddress: params.contractAddress,
    startToken: params.pageKey,
    withMetadata
  });

  return {
    nfts: response.nfts.map(res =>
      nftFromGetNftCollectionResponse(res, params.contractAddress)
    ),
    pageKey: response.nextToken
  };
}

/**
 * Gets all the owners for a given NFT contract address and token ID.
 *
 * @param alchemy The Alchemy SDK instance.
 * @param contractAddress The NFT contract address.
 * @param tokenId Token id of the NFT as a hex string or integer.
 * @beta
 */
export function getOwnersForToken(
  alchemy: Alchemy,
  contractAddress: string,
  tokenId: number | string
): Promise<GetOwnersForTokenResponse>;

/**
 * Gets all the owners for a given NFT.
 *
 * @param alchemy The Alchemy SDK instance.
 * @param nft The NFT object to get the owners for.
 * @beta
 */
export function getOwnersForToken(
  alchemy: Alchemy,
  nft: BaseNft
): Promise<GetOwnersForTokenResponse>;
export function getOwnersForToken(
  alchemy: Alchemy,
  contractAddressOrNft: string | BaseNft,
  tokenId?: number | string
): Promise<GetOwnersForTokenResponse> {
  if (typeof contractAddressOrNft === 'string') {
    validateContractAddress(contractAddressOrNft);
    return requestHttpWithBackoff(alchemy, 'getOwnersForToken', {
      contractAddress: contractAddressOrNft,
      tokenId: normalizeTokenIdToHex(tokenId!)
    });
  } else {
    return requestHttpWithBackoff(alchemy, 'getOwnersForToken', {
      contractAddress: contractAddressOrNft.contract.address,
      tokenId: normalizeTokenIdToHex(contractAddressOrNft.tokenId)
    });
  }
}

/**
 * Fetches all base NFTs for a given contract address and yields them in an
 * async iterable.
 *
 * This method returns the base NFTs that omit the associated metadata and pages
 * through all page keys until all NFTs have been fetched. To get all NFTs with
 * their associated metadata, use {@link GetNftsForCollectionParams}.
 *
 * @param alchemy The Alchemy SDK instance.
 * @param params The parameters to use for the request.
 * @beta
 */
export function getNftsForCollectionPaginated(
  alchemy: Alchemy,
  params: GetBaseNftsForCollectionParams
): AsyncIterable<BaseNft>;

/**
 * Fetches all NFTs for a given contract address and yields them in an async iterable.
 *
 * This method returns the full NFTs in the contract and pages through all page
 * keys until all NFTs have been fetched. To get all NFTs without their
 * associated metadata, use {@link GetBaseNftsForCollectionParams}.
 *
 * @param alchemy The Alchemy SDK instance.
 * @param params The parameters to use for the request.
 * @beta
 */
export function getNftsForCollectionPaginated(
  alchemy: Alchemy,
  params: GetNftsForCollectionParams
): AsyncIterable<Nft>;
export async function* getNftsForCollectionPaginated(
  alchemy: Alchemy,
  params: GetBaseNftsForCollectionParams | GetNftsForCollectionParams
): AsyncIterable<BaseNft | Nft> {
  const withMetadata = omitMetadataToWithMetadata(params.omitMetadata);
  for await (const response of paginateEndpoint(
    alchemy,
    'getNFTsForCollection',
    'startToken',
    'nextToken',
    {
      contractAddress: params.contractAddress,
      startToken: params.pageKey,
      withMetadata
    }
  )) {
    for (const nft of response.nfts as
      | RawCollectionBaseNft[]
      | RawCollectionNft[]) {
      yield nftFromGetNftCollectionResponse(nft, params.contractAddress);
    }
  }
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
    return Nft.fromResponse(ownedNft, ownedNft.contract.address);
  } else {
    return BaseNft.fromResponse(ownedNft, ownedNft.contract.address);
  }
}

/**
 * Helper method to convert a NFT response received from Alchemy backend to an
 * SDK NFT type.
 *
 * @internal
 */
function nftFromGetNftCollectionResponse(
  ownedNft: RawCollectionBaseNft | RawCollectionNft,
  contractAddress: string
): Nft | BaseNft {
  if (isNftWithMetadata(ownedNft)) {
    return Nft.fromResponse(ownedNft, contractAddress);
  } else {
    return BaseNft.fromResponse(ownedNft, contractAddress);
  }
}

/** @internal */
// TODO: more comprehensive type check
function isNftWithMetadata(response: RawBaseNft | RawNft): response is RawNft {
  return (response as RawNft).title !== undefined;
}

// TODO: Port over validation from NFT API code, since backend error validation
// doesn't always get surfaced properly.
function validateContractAddress(contractAddress: string) {
  console.log('validating contract address', contractAddress);
}

/**
 * Flips the `omitMetadata` SDK parameter type to the `withMetadata` parameter
 * required by the Alchemy API. If `omitMetadata` is undefined, the SDK defaults
 * to including metadata.
 */
function omitMetadataToWithMetadata(
  omitMetadata: boolean | undefined
): boolean {
  return omitMetadata === undefined ? true : !omitMetadata;
}

/**
 * Interface for the `getNftsForCollection` endpoint. The main difference is
 * that the endpoint has a `startToken` parameter, but the SDK standardizes all
 * pagination parameters to `pageKey`.
 *
 * @internal
 */
interface GetNftsForCollectionAlchemyParams {
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
  withMetadata: boolean;
}

interface GetNftMetadataParams {
  contractAddress: string;
  tokenId: string;
  tokenType?: NftTokenType;
}
