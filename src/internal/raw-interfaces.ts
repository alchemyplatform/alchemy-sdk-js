import { Media, NftMetadata, NftTokenType, TokenUri } from '../types/types';

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
  media?: Media[];
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
export interface RawBaseNftContract {
  address: string;
}

/**
 * Represents the contract address and metadata of an NFT object received from
 * Alchemy. This field is separated out since not all NFT API endpoints return a
 * contract field.
 *
 * @internal
 */
export interface RawNftContract {
  address: string;
  contractMetadata: RawNftContractMetadata;
}

interface RawNftContractMetadata {
  name?: string;
  symbol?: string;
  totalSupply?: number;
  tokenType: NftTokenType;
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
  contract: RawBaseNftContract;
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
 * Represents Alchemy's HTTP response for `getNftsForNftContract` without metadata.
 *
 * @internal
 */
export interface RawGetBaseNftsForNftContractResponse {
  nfts: RawNftContractBaseNft[];
  nextToken?: string;
}

/**
 * Represents Alchemy's HTTP response for `getNftsForNftContract` with metadata.
 *
 * @internal
 */
export interface RawGetNftsForNftContractResponse {
  nfts: RawNftContractNft[];
  nextToken?: string;
}

/**
 * Represents the `nfts` field from the Alchemy HTTP response when calling the
 * `getNftsForNftContract` endpoint without metadata.
 *
 * @internal
 */
export interface RawNftContractBaseNft {
  id: RawNftId;
}

/**
 * Represents the `nfts` field from the Alchemy HTTP response when calling the
 * `getNftsForNftContract` endpoint with metadata.
 *
 * @internal
 */
export interface RawNftContractNft extends RawNft, RawNftContractBaseNft {}

/**
 * Represents Alchemy's HTTP response for `getOwnersForNftContract`.
 *
 * @internal
 */
export interface RawGetOwnersForNftContractResponse {
  ownerAddresses: string[];
}
