import { NftMetadata, NftTokenType, TokenUri } from '../types/types';

/**
 * This file contains the raw HTTP responses returned by the Alchemy endpoints.
 * These types are not exposed to the end user and are instead used internally
 * by the SDK to construct the SDK's returned types.
 */

/**
 * Represents an NFT object without metadata received from Alchemy.
 *
 * @internal
 */
export interface RawBaseNft {
  id: RawNftId;
}

/**
 * Represents an NFT object along with its metadata received from Alchemy.
 *
 * @internal
 */
export interface RawNft extends RawBaseNft {
  title: string;
  description: string | Array<string>;
  tokenUri?: TokenUri;
  media?: TokenUri[];
  metadata?: NftMetadata;
  timeLastUpdated: string;
  error?: string;
}

/**
 * Represents the contract address of an NFT object received from Alchemy. This
 * field is separated out since not all NFT API endpoints return a contract field.
 *
 * @internal
 */
interface RawNftContract {
  address: string;
}

/**
 * Represents the ID information of an NFT object received from Alchemy.
 *
 * @internal
 */
interface RawNftId {
  tokenId: string;
  tokenMetadata?: RawNftTokenMetadata;
}

/**
 * Represents the token metadata information of an NFT object received from Alchemy.
 *
 * @internal
 */
interface RawNftTokenMetadata {
  tokenType: NftTokenType;
}

/**
 * Represents Alchemy's HTTP response for `getNfts` without metadata.
 *
 * @internal
 */
export interface RawGetBaseNftsResponse {
  ownedNfts: RawOwnedBaseNft[];
  pageKey?: string;
  totalCount: number;
}

/**
 * Represents Alchemy's HTTP response for `getNfts` with metadata.
 *
 * @internal
 */
export interface RawGetNftsResponse {
  ownedNfts: RawOwnedNft[];
  pageKey?: string;
  totalCount: number;
}

/**
 * Represents the `ownedNfts` field from the Alchemy HTTP response when calling
 * the `getNfts` endpoint without metadata.
 *
 * @internal
 */
export interface RawOwnedBaseNft extends RawBaseNft {
  contract: RawNftContract;
  balance: string;
}

/**
 * Represents the `ownedNfts` field from the Alchemy HTTP response when calling
 * the `getNfts` endpoint with metadata.
 *
 * @internal
 */
export interface RawOwnedNft extends RawNft, RawOwnedBaseNft {}

/**
 * Represents Alchemy's HTTP response for `getNftsForCollection` without metadata.
 *
 * @internal
 */
export interface RawGetBaseNftsForCollectionResponse {
  nfts: RawCollectionBaseNft[];
  nextToken?: string;
}

/**
 * Represents Alchemy's HTTP response for `getNftsForCollection` with metadata.
 *
 * @internal
 */
export interface RawGetNftsForCollectionResponse {
  nfts: RawCollectionNft[];
  nextToken?: string;
}

/**
 * Represents the `nfts` field from the Alchemy HTTP response when calling the
 * `getNftsForCollection` endpoint without metadata.
 *
 * @internal
 */
export interface RawCollectionBaseNft {
  id: RawNftId;
}

/**
 * Represents the `nfts` field from the Alchemy HTTP response when calling the
 * `getNftsForCollection` endpoint with metadata.
 *
 * @internal
 */
export interface RawCollectionNft extends RawNft, RawCollectionBaseNft {}
