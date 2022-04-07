import { NftMetadata, NftTokenType, TokenUri } from '../types/types';

/**
 * This file contains the raw HTTP responses returned by the Alchemy endpoints.
 * These types are not exposed to the end user and are instead used interally
 * by the SDK to construct the SDK's returned types.
 */

/**
 * @internal
 */
interface RawNftContract {
  address: string;
}

/**
 * @internal
 */
interface RawNftId {
  tokenId: string;
  tokenMetadata?: RawNftTokenMetadata;
}

/**
 * @internal
 */
interface RawNftTokenMetadata {
  tokenType: NftTokenType;
}

/**
 * @internal
 */
export interface RawBaseNft {
  id: RawNftId;
}

/**
 * Represents an NFT object along with its metadata received from Alchemy.
 * @internal
 */
export interface RawNft extends RawBaseNft {
  title: string;
  description: string;
  tokenUri?: TokenUri;
  media?: TokenUri[];
  metadata?: NftMetadata;
  timeLastUpdated: string;
  error?: string;
}

/**
 * Internal representation of Alchemy's HTTP response for getNfts with metadata.
 *
 * @internal
 */
export interface RawGetNftsResponse {
  ownedNfts: RawOwnedNft[];
  pageKey?: string;
  totalCount: number;
}

/**
 * Internal representation of Alchemy's HTTP response for getNfts without
 * metadata.
 *
 * @internal
 */
export interface RawGetBaseNftsResponse {
  ownedNfts: RawOwnedBaseNft[];
  pageKey?: string;
  totalCount: number;
}

/**
 * NFT object representation of HTTP response from Alchemy.
 * @internal
 */
export interface RawOwnedBaseNft extends RawBaseNft {
  contract: RawNftContract;
  balance: string;
}

/**
 * @internal
 */
export interface RawOwnedNft extends RawNft, RawOwnedBaseNft {}

/**
 * @internal
 */
export interface RawCollectionBaseNft {
  id: RawNftId;
}

/**
 * @internal
 */
export interface RawCollectionNft extends RawNft, RawCollectionBaseNft {}

/**
 * @internal
 */
export interface RawGetNftsForCollectionResponse {
  nfts: RawCollectionNft[];
  nextToken: string;
}

/**
 * @internal
 */
export interface RawGetBaseNftsForCollectionResponse {
  nfts: RawCollectionBaseNft[];
  nextToken: string;
}
