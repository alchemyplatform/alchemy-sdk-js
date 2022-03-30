import {
  BaseNft,
  GetNftMetadataResponse,
  GetNftsForCollectionParams,
  GetNftsForCollectionResponse,
  GetNftsForCollectionWithoutMetadataParams,
  GetNftsForCollectionWithoutMetadataResponse,
  GetNftsParams,
  GetNftsParamsWithoutMetadata,
  GetNftsResponse,
  GetNftsResponseWithoutMetadata,
  GetOwnersForTokenResponse,
  Nft,
  NftTokenType
} from '../types/types';
import { Alchemy } from './alchemy';
import { paginateEndpoint, requestHttpWithBackoff } from '../internal/dispatch';

/**
 *
 * @param alchemy
 * @param contractAddress
 * @param tokenId
 * @param tokenType
 * @public
 */
export function getNftMetadata(
  alchemy: Alchemy,
  contractAddress: string,
  tokenId: string,
  tokenType?: NftTokenType
): Promise<GetNftMetadataResponse> {
  return requestHttpWithBackoff(alchemy, 'getNFTMetadata', {
    contractAddress,
    tokenId,
    tokenType
  });
}

/**
 * Fetches all NFTs for a given owner and yields them in an async iterable.
 *
 * This method pages through all page keys until all NFTs have been fetched.
 */
export function getNftsPaginated(
  alchemy: Alchemy,
  params: GetNftsParamsWithoutMetadata
): AsyncIterable<BaseNft>;
export function getNftsPaginated(
  alchemy: Alchemy,
  params: GetNftsParams
): AsyncIterable<Nft>;
export async function* getNftsPaginated(
  alchemy: Alchemy,
  params: GetNftsParams | GetNftsParamsWithoutMetadata
): AsyncIterable<Nft | BaseNft> {
  for await (const response of paginateEndpoint(
    alchemy,
    'getNFTs',
    'pageKey',
    params
  )) {
    for (const nft of response.ownedNfts) {
      yield nft;
    }
  }
}

/**
 * Get all NFTs for an owner.
 *
 * @param alchemy
 * @param params
 * @public
 */
export function getNfts(
  alchemy: Alchemy,
  params: GetNftsParamsWithoutMetadata
): Promise<GetNftsResponseWithoutMetadata>;
export function getNfts(
  alchemy: Alchemy,
  params: GetNftsParams
): Promise<GetNftsResponse>;
export function getNfts(
  alchemy: Alchemy,
  params: GetNftsParams | GetNftsParamsWithoutMetadata
): Promise<GetNftsResponse | GetNftsResponseWithoutMetadata> {
  return requestHttpWithBackoff(alchemy, 'getNFTs', params);
}

/**
 * Get all NFTs for a given contract address.
 *
 * @param alchemy
 * @param params
 * @beta
 */
export function getNftsForCollection(
  alchemy: Alchemy,
  params: GetNftsForCollectionParams
): Promise<GetNftsForCollectionResponse>;
export function getNftsForCollection(
  alchemy: Alchemy,
  params: GetNftsForCollectionWithoutMetadataParams
): Promise<GetNftsForCollectionWithoutMetadataResponse>;
export function getNftsForCollection(
  alchemy: Alchemy,
  params: GetNftsForCollectionParams | GetNftsForCollectionWithoutMetadataParams
): Promise<
  GetNftsForCollectionResponse | GetNftsForCollectionWithoutMetadataResponse
> {
  return requestHttpWithBackoff(alchemy, 'getNFTsForCollection', params);
}

/**
 * Gets all the owners for a given NFT contract address and token ID.
 *
 * @param alchemy
 * @param contractAddress
 * @param tokenId
 * @beta
 */
export function getOwnersForToken(
  alchemy: Alchemy,
  contractAddress: string,
  tokenId: string
): Promise<GetOwnersForTokenResponse> {
  return requestHttpWithBackoff(alchemy, 'getOwnersForToken', {
    contractAddress,
    tokenId
  });
}
