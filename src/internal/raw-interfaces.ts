import {
  Media,
  NftMetadata,
  NftSpamClassification,
  NftTokenType,
  TokenUri
} from '../types/types';

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

export interface RawSpamInfo {
  isSpam: string;

  /** A list of reasons why an NFT contract was marked as spam. */
  classifications: NftSpamClassification[];
}

/**
 * Represents an NFT object along with its metadata received from Alchemy.
 *
 * @internal
 */
export interface RawNft extends RawBaseNft {
  title: string;
  description?: string | Array<string>;
  tokenUri?: TokenUri;
  media?: Media[];
  metadata?: NftMetadata;
  timeLastUpdated: string;
  error?: string;
  contractMetadata?: RawNftContractMetadata;
  spamInfo?: RawSpamInfo;
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

/**
 * Represents the contract address and metadata of an NFT object received from
 * Alchemy. This field is separated out since not all NFT API endpoints return a
 * contract field.
 *
 * @internal
 */
export interface RawNftContractMetadata {
  name?: string;
  symbol?: string;
  totalSupply?: string;
  tokenType?: NftTokenType;
  openSea?: RawOpenSeaCollectionMetadata;
}

/**
 * OpenSea's metadata for an NFT collection.
 */
export interface RawOpenSeaCollectionMetadata {
  floorPrice?: number;
  collectionName?: string;
  safelistRequestStatus?: string;
  imageUrl?: string;
  description?: string;
  externalUrl?: string;
  twitterUsername?: string;
  discordUrl?: string;
  lastIngestedAt?: string;
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
export interface RawGetBaseNftsForContractResponse {
  nfts: RawContractBaseNft[];
  nextToken?: string;
}

/**
 * Represents Alchemy's HTTP response for `getNftsForNftContract` with metadata.
 *
 * @internal
 */
export interface RawGetNftsForContractResponse {
  nfts: RawContractNft[];
  nextToken?: string;
}

/**
 * Represents the `nfts` field from the Alchemy HTTP response when calling the
 * `getNftsForNftContract` endpoint without metadata.
 *
 * @internal
 */
export interface RawContractBaseNft {
  id: RawNftId;
}

/**
 * Represents the `nfts` field from the Alchemy HTTP response when calling the
 * `getNftsForNftContract` endpoint with metadata.
 *
 * @internal
 */
export interface RawContractNft extends RawNft, RawContractBaseNft {}

/**
 * Represents Alchemy's HTTP response for `getOwnersForNftContract`.
 *
 * @internal
 */
export interface RawGetOwnersForContractResponse {
  ownerAddresses: string[];
}

export interface RawGetOwnersForContractWithTokenBalancesResponse {
  ownerAddresses: RawOwnerAddress[];
  pageKey?: string;
}

export interface RawOwnerAddress {
  ownerAddress: string;
  tokenBalances: RawTokenBalances[];
}

export interface RawTokenBalances {
  tokenId: string;
  balance: number;
}

export interface RawReingestContractResponse {
  contractAddress: string;
  reingestionState: string;
  progress: string | null;
}

export interface RawWebhook {
  id: string;
  network: string;
  webhook_type: string;
  webhook_url: string;
  is_active: boolean;
  time_created: number;
  signing_key: string;
  version: string;
  app_id?: string;
}

export interface RawWebhookPagination {
  cursors: {
    after?: string;
  };
  total_count: number;
}

export interface RawGetAllWebhooksResponse {
  data: RawWebhook[];
}

export interface RawAddressActivityResponse {
  data: string[];
  pagination: RawWebhookPagination;
}

export interface RawNftFilter {
  contract_address: string;
  token_id: string;
}

export interface RawNftFiltersResponse {
  data: RawNftFilter[];
  pagination: RawWebhookPagination;
}

export interface RawCreateWebhookResponse {
  data: RawWebhook;
}

export interface RawNftFilterParam {
  contract_address: string;
  token_id: string;
}

export interface RawNftAttributeRarity {
  value: string;
  trait_type: string;
  prevalence: number;
}
