import { BaseNftContract } from '../api/nft';
import {
  Media,
  NftMetadata,
  NftSaleFeeData,
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
  contract: BaseNftContract;
  id: RawNftId;
}

export interface RawSpamInfo {
  isSpam: string;

  /** A list of reasons why an NFT contract was marked as spam. */
  classifications: NftSpamClassification[];
}

// Information on the time at which an NFT was last acquired.
export interface RawAcquiredAt {
  // Timestamp of the block at which an NFT was last acquired.
  blockTimestamp: string;

  // Block number of the block at which an NFT was last acquired.
  blockNumber: number;
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
  acquiredAt?: RawAcquiredAt;
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
  contractDeployer?: string;
  deployedBlockNumber?: number;
}

/** OpenSea's metadata for an NFT collection. */
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
  blockHash: string;
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
  blockHash: string;
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
  nfts: RawNft[];
  nextToken?: string;
}

/**
 * Represents the `nfts` field from the Alchemy HTTP response when calling the
 * `getNftsForNftContract` endpoint without metadata.
 *
 * The main difference between {@link RawContractBaseNft} and {@link RawBaseNft}
 * is that `RawContractBaseNft` omits the `contract` field in the payload since
 * the method takes in a contract address param.
 *
 * @internal
 */
export interface RawContractBaseNft {
  id: RawNftId;
}

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

export interface RawCustomGraphqlWebhookConfig {
  data: {
    webhook_id: string;
    graphql_query: string;
  };
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
  token_id?: string;
}

export interface RawNftAttributeRarity {
  value: string;
  trait_type: string;
  prevalence: number;
}

export interface RawGetNftSalesResponse {
  pageKey?: string;
  nftSales: RawNftSale[];
}

export interface RawNftSale {
  marketplace: string;
  contractAddress: string;
  tokenId: string;
  quantity: string;
  buyerAddress: string;
  sellerAddress: string;
  taker: string;
  sellerFee: NftSaleFeeData;
  protocolFee?: NftSaleFeeData;
  royaltyFee?: NftSaleFeeData;
  blockNumber: number;
  logIndex: number;
  bundleIndex: number;
  transactionHash: string;
}

export interface RawGetContractsForOwnerResponse {
  contracts: RawContractForOwner[];
  pageKey?: string;
  totalCount: number;
}

export interface RawContractForOwner
  extends Omit<RawNftContractMetadata, 'openSea'> {
  address: string;
  totalBalance: number;
  numDistinctTokensOwned: number;
  title: string;
  isSpam: boolean;
  tokenId: string;
  media: Media[];
  opensea?: RawOpenSeaCollectionMetadata;
}
