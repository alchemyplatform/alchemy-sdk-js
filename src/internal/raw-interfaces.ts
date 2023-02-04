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
  contract: RawBaseNftContract;
  tokenId: string;
}

/**
 * Represents an NFT object along with its metadata received from Alchemy.
 *
 * @internal
 */
export interface RawNft extends RawBaseNft {
  contract: RawNftContract;
  name: string | null;
  tokenType: string;
  // TODO(v3): verify we no longer return objects/ arrays
  description: string | null;
  tokenUri: string | null;
  timeLastUpdated: string;
  // TODO(v3): move this field into `raw` after change.
  error: string | null;
  raw: RawNftMetadata;
  image: RawNftImage;
}

export interface RawNftMetadata {
  tokenUri: string | null;
  metadata: Record<string, any>;
}

export interface RawNftImage {
  originalUrl: string | null;
  cachedUrl: string | null;
  thumbnailUrl: string | null;
  pngUrl: string | null;
  contentType: string | null;
  size: number | null;
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
  name: string | null;
  symbol: string | null;
  totalSupply: string | null;
  tokenType: string;
  openSeaMetadata: RawOpenSeaCollectionMetadata;
  contractDeployer: string | null;
  deployedBlockNumber: number | null;
  isSpam: boolean | null;
  classifications: string[];
  image: RawNftImage;
}

/** OpenSea's metadata for an NFT collection. */
export interface RawOpenSeaCollectionMetadata {
  floorPrice: number | null;
  collectionName: string | null;
  safelistRequestStatus: string | null;
  imageUrl: string | null;
  description: string | null;
  externalUrl: string | null;
  twitterUsername: string | null;
  discordUrl: string | null;
  lastIngestedAt: string | null;
}

/**
 * Represents Alchemy's HTTP response for `getNfts` without metadata.
 *
 * @internal
 */
export interface RawGetBaseNftsResponse {
  ownedNfts: RawOwnedBaseNft[];
  totalCount: number;
  blockHash: string;
  pageKey: string | null;
}

/**
 * Represents Alchemy's HTTP response for `getNfts` with metadata.
 *
 * @internal
 */
export interface RawGetNftsResponse extends RawGetBaseNftsResponse {
  ownedNfts: RawOwnedNft[];
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
export interface RawOwnedNft extends RawNft {
  balance: string;
}

/**
 * Represents Alchemy's HTTP response for `getNftsForNftContract` without metadata.
 *
 * @internal
 */
export interface RawGetBaseNftsForContractResponse {
  nfts: RawContractBaseNft[];
  // TODO(v3): change to pagekey on backend.
  nextToken?: string;
}

/**
 * Represents Alchemy's HTTP response for `getNftsForNftContract` with metadata.
 *
 * @internal
 */
export interface RawGetNftsForContractResponse {
  nfts: RawNft[];
  // TODO(v3): change to pagekey on backend.
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
  tokenId: string;
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
  pageKey: string | null;
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
  sellerFee: RawNftSaleFeeData;
  protocolFee: RawNftSaleFeeData;
  royaltyFee: RawNftSaleFeeData;
  blockNumber: number;
  logIndex: number;
  bundleIndex: number;
  transactionHash: string;
}

export interface RawGetContractsForOwnerResponse {
  contracts: RawContractForOwner[];
  pageKey: string | null;
  totalCount: number;
}

export interface RawContractForOwner extends RawNftContract {
  totalBalance: number;
  numDistinctTokensOwned: number;
  tokenId: string;
}

export interface RawNftSaleFeeData {
  amount: string | null;
  symbol: string | null;
  decimal: number | null;
}
