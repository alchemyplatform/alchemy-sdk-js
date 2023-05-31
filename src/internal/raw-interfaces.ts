/**
 * This file contains the raw HTTP responses returned by the Alchemy endpoints.
 * These types are not exposed to the end user and are instead used internally
 * by the SDK to construct the SDK's returned types.
 */

/**
 * Represents an NFT object along with its metadata received from Alchemy.
 *
 * @internal
 */
export interface RawNft {
  contract: RawNftContractForNft;
  tokenId: string;
  tokenType: string;
  name: string | null;
  description: string | null;
  image: RawNftImage;
  raw: RawNftData;
  tokenUri: string | null;
  timeLastUpdated: string;
}

export interface RawNftData {
  tokenUri: string | null;
  metadata: Record<string, any>;
  error: string | null;
}

export interface RawNftContract {
  address: string;
  tokenType: string;
  name: string | null;
  symbol: string | null;
  totalSupply: string | null;
  contractDeployer: string | null;
  deployedBlockNumber: number | null;
  openSeaMetadata: RawOpenSeaCollectionMetadata;
}

/**
 * Represents the contract address and metadata of an NFT object received from
 * Alchemy. This field is separated out since not all NFT API endpoints return a
 * contract field.
 *
 * @internal
 */
export interface RawNftContractForNft extends RawNftContract {
  isSpam: boolean | null;
  spamClassifications: string[];
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
  lastIngestedAt: string;
}

/**
 * Represents Alchemy's HTTP response for `getNfts` without metadata.
 *
 * @internal
 */
export interface RawGetBaseNftsResponse {
  ownedNfts: RawOwnedBaseNft[];
  totalCount: number;
  validAt: RawNftsForOwnerValidAt;
  pageKey: string | null;
}

/**
 * Represents Alchemy's HTTP response for `getNfts` with metadata.
 *
 * @internal
 */
export interface RawGetNftsForOwnerResponse {
  ownedNfts: RawOwnedNft[];
  totalCount: number;
  validAt: RawNftsForOwnerValidAt;
  pageKey: string | null;
}

/**
 * Represents the `ownedNfts` field from the Alchemy HTTP response when calling
 * the `getNfts` endpoint without metadata.
 *
 * @internal
 */
export interface RawOwnedBaseNft {
  contractAddress: string;
  tokenId: string;
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

export interface RawNftsForOwnerValidAt {
  blockNumber: number | null;
  blockHash: string;
  blockTimestamp: string | null;
}
/**
 * Represents Alchemy's HTTP response for `getNftsForNftContract` without metadata.
 *
 * @internal
 */
export interface RawGetBaseNftsForContractResponse {
  nfts: RawContractBaseNft[];
  pageKey: string | null;
}

/**
 * Represents Alchemy's HTTP response for `getNftsForNftContract` with metadata.
 *
 * @internal
 */
export interface RawGetNftsForContractResponse {
  nfts: RawNft[];
  pageKey: string | null;
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
  owners: string[];
  pageKey: string | null;
}

export interface RawGetOwnersForContractWithTokenBalancesResponse {
  owners: RawOwnerAddress[];
  pageKey: string | null;
}

export interface RawOwnerAddress {
  ownerAddress: string;
  tokenBalances: RawTokenBalances[];
}

export interface RawTokenBalances {
  tokenId: string;
  balance: string;
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

export interface RawSearchContractMetadataResponse {
  contracts: RawNftContract[];
}

export interface RawComputeRarityResponse {
  rarities: RawNftAttributeRarity[];
}

export interface RawNftAttributeRarity {
  value: string;
  traitType: string;
  prevalence: number;
}

export interface RawNftAttributesResponse {
  summary: Record<string, Record<string, number>>;
  totalSupply: string;
  contractAddress: string;
}

export interface RawGetNftSalesResponse {
  nftSales: RawNftSale[];
  validAt: RawNftSaleValidAt;
  pageKey: string | null;
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

export interface RawNftSaleValidAt {
  blockNumber: number;
  blockHash: string | null;
  blockTimestamp: string | null;
}

export interface RawNftSaleFeeData {
  amount: string | null;
  tokenAddress: string | null;
  symbol: string | null;
  decimals: number | null;
}

export interface RawGetContractsForOwnerResponse {
  contracts: RawNftContractForOwner[];
  pageKey: string | null;
  totalCount: number;
}

export interface RawNftContractForOwner
  extends RawNftContract,
    RawNftContractOwnershipInfo {
  displayNft: RawDisplayNftForContract;
  image: RawNftImage;
}

export interface RawGetNftMetadataBatchResponse {
  nfts: Array<RawNft>;
}

export interface RawGetContractMetadataBatchResponse {
  contracts: RawNftContract[];
}

export interface RawIsSpamContractResponse {
  isSpamContract: boolean;
}

export interface RawGetSpamContractsResponse {
  contractAddresses: string[];
}

export interface RawDisplayNftForContract {
  tokenId: string;
  name: string | null;
}

export interface RawNftImage {
  cachedUrl: string | null;
  thumbnailUrl: string | null;
  pngUrl: string | null;
  contentType: string | null;
  size: number | null;
  originalUrl: string | null;
}

export interface RawNftContractOwnershipInfo {
  totalBalance: string;
  numDistinctTokensOwned: string;
  isSpam: boolean;
}
