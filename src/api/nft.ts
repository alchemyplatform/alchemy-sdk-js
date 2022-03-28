import {
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
  NftTokenType
} from '../types/types';
import { Alchemy } from './alchemy';
import { requestHttp } from '../internal/dispatch';

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
  return requestHttp(alchemy, 'getNFTMetadata', {
    contractAddress,
    tokenId,
    tokenType
  });
}

/**
 * Get all NFTs for a given contract address.
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
  return requestHttp(alchemy, 'getNFTs', params);
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
  return requestHttp(alchemy, 'getNFTsForCollection', params);
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
  return requestHttp(alchemy, 'getOwnersForToken', {
    contractAddress,
    tokenId
  });
}
