import { BlockTag } from '@ethersproject/abstract-provider';
import { BigNumberish } from '@ethersproject/bignumber';

import { OpenSeaSafelistRequestStatus, SortingOrder } from './types';

/**
 * An enum for specifying the token type on NFTs.
 *
 * @public
 */
export enum NftTokenType {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
  NO_SUPPORTED_NFT_STANDARD = 'NO_SUPPORTED_NFT_STANDARD',
  NOT_A_CONTRACT = 'NOT_A_CONTRACT',
  UNKNOWN = 'UNKNOWN'
}

/**
 * Represents NFT metadata that holds fields. Note that since there is no
 * standard metadata format, the fields are not guaranteed to be present.
 *
 * @public
 */
export interface NftMetadata extends Record<string, any> {
  /** Name of the NFT asset. */
  name?: string;

  /** A human-readable description of the NFT asset. */
  description?: string;

  /** URL to the NFT asset image. */
  image?: string;
  /**
   * The image URL that appears along the top of the NFT asset page. This tends
   * to be the highest resolution image.
   */
  external_url?: string;

  /** Background color of the NFT item. Usually defined as a 6 character hex string. */
  background_color?: string;

  /** The traits, attributes, and characteristics for the NFT asset. */
  attributes?: Array<Record<string, any>>;
}

/** Media URLs and information for an NFT. */
export interface NftImage {
  /** URL of the image stored in Alchemy's cache. */
  cachedUrl?: string;
  /** URL of a thumbnail sized image. */
  thumbnailUrl?: string;
  /** URL of the image in png format */
  pngUrl?: string;
  /** The type of the media image. */
  contentType?: string;
  /** The size of the media asset in bytes. */
  size?: number;
  /** The original URL of the image as stored on the contract. */
  originalUrl?: string;
}

/** Potential reasons why an NFT contract was classified as spam. */
export enum NftSpamClassification {
  Erc721TooManyOwners = 'Erc721TooManyOwners',
  Erc721TooManyTokens = 'Erc721TooManyTokens',
  Erc721DishonestTotalSupply = 'Erc721DishonestTotalSupply',
  MostlyHoneyPotOwners = 'MostlyHoneyPotOwners',
  OwnedByMostHoneyPots = 'OwnedByMostHoneyPots',
  LowDistinctOwnersPercent = 'LowDistinctOwnersPercent',
  HighHoneyPotOwnerPercent = 'HighHoneyPotOwnerPercent',
  HighHoneyPotPercent = 'HighHoneyPotPercent',
  HoneyPotsOwnMultipleTokens = 'HoneyPotsOwnMultipleTokens',
  NoSalesActivity = 'NoSalesActivity',
  HighAirdropPercent = 'HighAirdropPercent',
  Unknown = 'Unknown'
}

/** Block time and number at which an NFT was acquired. */
export interface AcquiredAt {
  /** Timestamp of the block at which an NFT was last acquired. */
  blockTimestamp?: string;

  /** Block number of the block at which an NFT was last acquired. */
  blockNumber?: number;
}

/**
 * Optional parameters object for the {@link getNftsForOwner} and
 * {@link getNftsForOwnerIterator} functions.
 *
 * This interface is used to fetch NFTs with their associated metadata. To get
 * Nfts without their associated metadata, use {@link GetBaseNftsForOwnerOptions}.
 *
 * @public
 */
export interface GetNftsForOwnerOptions {
  /**
   * Optional page key from an existing {@link OwnedBaseNftsResponse} or
   * {@link OwnedNftsResponse}to use for pagination.
   */
  pageKey?: string;

  /** Optional list of contract addresses to filter the results by. Limit is 20. */
  contractAddresses?: string[];

  /**
   * Optional list of filters applied to the query. NFTs that match one or more
   * of these filters are excluded from the response.
   */
  excludeFilters?: NftFilters[];

  /**
   * Optional list of filters applied to the query. NFTs that match one or more
   * of these filters are included in the response.
   */
  includeFilters?: NftFilters[];

  /**
   * Sets the total number of NFTs to return in the response. Defaults to 100.
   * Maximum page size is 100.
   */
  pageSize?: number;

  /** Optional boolean flag to omit NFT metadata. Defaults to `false`. */
  omitMetadata?: boolean;

  /**
   * No set timeout by default - When metadata is requested, this parameter is
   * the timeout (in milliseconds) for the website hosting the metadata to
   * respond. If you want to only access the cache and not live fetch any
   * metadata for cache misses then set this value to 0.
   */
  tokenUriTimeoutInMs?: number;

  /**
   * Order in which to return results. By default, results are ordered by
   * contract address and token ID in lexicographic order.
   */
  orderBy?: NftOrdering;
}

/**
 * Optional parameters object for the {@link getNftsForOwner} and
 * {@link getNftsForOwnerIterator} functions.
 *
 * This interface is used to fetch NFTs without their associated metadata. To
 * get Nfts with their associated metadata, use {@link GetNftsForOwnerOptions}.
 *
 * @public
 */
export interface GetBaseNftsForOwnerOptions {
  /**
   * Optional page key from an existing {@link OwnedBaseNftsResponse} or
   * {@link OwnedNftsResponse}to use for pagination.
   */
  pageKey?: string;

  /** Optional list of contract addresses to filter the results by. Limit is 20. */
  contractAddresses?: string[];

  /**
   * Optional list of filters applied to the query. NFTs that match one or more
   * of these filters are excluded from the response.
   */
  excludeFilters?: NftFilters[];

  /**
   * Optional list of filters applied to the query. NFTs that match one or more
   * of these filters are included in the response.
   */
  includeFilters?: NftFilters[];

  /**
   * Sets the total number of NFTs to return in the response. Defaults to 100.
   * Maximum page size is 100.
   */
  pageSize?: number;

  /** Optional boolean flag to include NFT metadata. Defaults to `false`. */
  omitMetadata: true;

  /**
   * No set timeout by default - When metadata is requested, this parameter is
   * the timeout (in milliseconds) for the website hosting the metadata to
   * respond. If you want to only access the cache and not live fetch any
   * metadata for cache misses then set this value to 0.
   */
  tokenUriTimeoutInMs?: number;

  /**
   * Order in which to return results. By default, results are ordered by
   * contract address and token ID in lexicographic order.
   */
  orderBy?: NftOrdering;
}

/**
 * Enum of NFT filters that can be applied to a {@link getNftsForOwner} or a
 * {@link getContractsForOwner} request.
 *
 * @beta
 */
export enum NftFilters {
  /** NFTs that have been classified as spam. */
  SPAM = 'SPAM',

  /** NFTs that have been airdropped to a user. */
  AIRDROPS = 'AIRDROPS'
}

/**
 * Enum of ordering that can be applied to a {@link getNftsForOwner} or a
 * {@link getContractsForOwner} response.
 *
 * @beta
 */
export enum NftOrdering {
  TRANSFERTIME = 'TRANSFERTIME'
}

/**
 * The response object for the {@link getNftsForOwner} and
 * {@link getNftsForOwnerIterator} functions. The object contains the NFTs with
 * metadata owned by the provided address, along with pagination information and
 * the total count.
 *
 * @public
 */
export interface OwnedNftsResponse {
  /** The NFTs owned by the provided address. */
  ownedNfts: OwnedNft[];

  /**
   * Pagination token that can be passed into another request to fetch the next
   * NFTs. If there is no page key, then there are no more NFTs to fetch.
   */
  pageKey?: string;

  /** The total count of NFTs owned by the provided address. */
  totalCount: number;

  /**
   * Block Information of the block as of which the corresponding data is valid
   */
  validAt: OwnedNftsValidAt;
}

/**
 * The response object for the {@link getNftsForOwner} and
 * {@link getNftsForOwnerIterator} functions. The object contains the NFTs
 * without metadata owned by the provided address, along with pagination
 * information and the total count.
 *
 * @public
 */
export interface OwnedBaseNftsResponse {
  /** The NFTs owned by the provided address. */
  ownedNfts: OwnedBaseNft[];

  /**
   * Pagination token that can be passed into another request to fetch the next
   * NFTs. If there is no page key, then there are no more NFTs to fetch.
   */
  pageKey?: string;

  /** The total count of NFTs owned by the provided address. */
  totalCount: number;

  /**
   * Block Information of the block as of which the corresponding data is valid
   */
  validAt: OwnedNftsValidAt;
}

/**
 * Represents an NFT with metadata owned by an address.
 *
 * @public
 */
export interface OwnedNft extends Nft {
  /** The token balance of the NFT. */
  balance: string;
}

/**
 * Represents an NFT without metadata owned by an address.
 *
 * @public
 */
export interface OwnedBaseNft extends BaseNft {
  /** The token balance of the NFT. */
  balance: string;
}

/** The block information at which the NFT sale information is valid at. */
export interface OwnedNftsValidAt {
  /** The block number the sale information is valid at. */
  blockNumber?: number;
  /** The block hash. Used to detect reorgs. */
  blockHash: string;
  /** The timestamp for the block. */
  blockTimestamp?: string;
}

/**
 * The response object for the {@link getOwnersForNft}.
 *
 * @public
 */
export interface GetOwnersForNftResponse {
  /** An array of owner addresses for the provided token. */
  owners: string[];

  /** Optional The key for the next page of results, if applicable. */
  pageKey?: string;
}

/**
 * The response object for the {@link getOwnersForContract}.
 *
 * @public
 */
export interface GetOwnersForContractResponse {
  /** An array of owner addresses for the provided contract address */
  owners: string[];
  /**
   * Total count of unique owners. Only present if
   * {@link GetOwnersForContractOptions.includeCount} is true.
   */
  totalCount?: number;

  /** Optional page key that is returned when a collection has more than 50,000 owners. */
  pageKey?: string;
}

/**
 * The response object for the {@link getOwnersForContract}.
 *
 * @public
 */
export interface GetOwnersForContractWithTokenBalancesResponse {
  /** An array of owner addresses for the provided contract address */
  owners: NftContractOwner[];

  /** Optional page key that is returned when a collection has more than 50,000 owners. */
  pageKey?: string;
}

export interface GetNftMetadataBatchResponse {
  /** An array of NFT metadata objects. */
  nfts: Nft[];
}

export interface GetContractMetadataBatchResponse {
  contracts: NftContract[];
}

/**
 * An object representing the owner of an NFT and its corresponding token
 * balances in a {@link GetOwnersForContractWithTokenBalancesResponse} object.
 */
export interface NftContractOwner {
  /** The NFT's owner address. */
  ownerAddress: string;

  /** A list of objects containing token balances for the provided NFT contract. */
  tokenBalances: NftContractTokenBalance[];
}

/**
 * An object representing the owned token and balance values in a
 * {@link GetOwnersForContractWithTokenBalancesResponse} object.
 */
export interface NftContractTokenBalance {
  /** The token id owned in the NFT contract. */
  tokenId: string;
  /** The token id balance for the provided owner. */
  balance: string;
}

export interface IsSpamContractResponse {
  isSpamContract: boolean;
}

export interface IsAirdropNftResponse {
  isAirdrop: boolean;
}

export interface GetSpamContractsResponse {
  contractAddresses: string[];
}

/**
 * Additional options for the {@link NftNamespace.getNftMetadata} method.
 */
export interface GetNftMetadataOptions {
  /** Optional field to specify the type of token to speed up the query. */
  tokenType?: NftTokenType;
  /**
   * No set timeout by default - When metadata is requested, this parameter is
   * the timeout (in milliseconds) for the website hosting the metadata to
   * respond. If you want to only access the cache and not live fetch any
   * metadata for cache misses then set this value to 0.
   */
  tokenUriTimeoutInMs?: number;

  /**
   * Whether to refresh the metadata for the given NFT token before returning
   * the response. Defaults to false for faster response times.
   */
  refreshCache?: boolean;
}

/**
 * Represents an NFT token to fetch metadata for in a
 * {@link NftNamespace.getNftMetadataBatch} method.
 */
export interface NftMetadataBatchToken {
  /** The NFT contract address. Limited to ERC721 and ERC1155 tokens. */
  contractAddress: string;

  /** The id of the NFT. */
  tokenId: BigNumberish;

  /** Optional field to specify the type of token to speed up the query. */
  tokenType?: NftTokenType.ERC1155 | NftTokenType.ERC721;
}

/** Additional options for the {@link NftNamespace.getNftMetadataBatch} method. */
export interface NftMetadataBatchOptions {
  /**
   * No set timeout by default - When metadata is requested, this parameter is
   * the timeout (in milliseconds) for the website hosting the metadata to
   * respond. If you want to only access the cache and not live fetch any
   * metadata for cache misses then set this value to 0.
   */
  tokenUriTimeoutInMs?: number;

  /**
   * Whether to refresh the metadata for the given NFT token before returning
   * the response. Defaults to false for faster response times.
   */
  refreshCache?: boolean;
}

/**
 * The successful object returned by the {@link getFloorPrice} call for each
 * marketplace (e.g. looksRare).
 *
 * @public
 */
export interface FloorPriceMarketplace {
  /** The floor price of the collection on the given marketplace */
  floorPrice: number;
  /** The currency in which the floor price is denominated */
  priceCurrency: string;
  /** The link to the collection on the given marketplace */
  collectionUrl: string;
  /** UTC timestamp of when the floor price was retrieved from the marketplace */
  retrievedAt: string;
}

/**
 * The failing object returned by the {@link getFloorPrice} call for each
 * marketplace (e.g. looksRare).
 *
 * @public
 */
export interface FloorPriceError {
  /** Error fetching floor prices from the given marketplace */
  error: string;
}

/**
 * The response object for the {@link getFloorPrice} method.
 *
 * @public
 */
export interface GetFloorPriceResponse {
  /**
   * Name of the NFT marketplace where the collection is listed. Current
   * marketplaces supported: OpenSea, LooksRare
   */
  openSea: FloorPriceMarketplace | FloorPriceError;
  looksRare: FloorPriceMarketplace | FloorPriceError;
}

/**
 * Optional parameters object for the {@link getContractsForOwner} method
 *
 * @public
 */
export interface GetContractsForOwnerOptions {
  /** Key for pagination to use to fetch results from the next page if available. */
  pageKey?: string;

  /**
   * Configure the number of NFTs to return in each response. Maximum pages size
   * is 100. Defaults to 100.
   */
  pageSize?: number;

  /**
   * Optional list of filters applied to the query. NFTs that match one or more
   * of these filters are included in the response. May not be used in
   * conjunction with {@link excludeFilters}.
   */
  includeFilters?: NftFilters[];

  /**
   * Optional list of filters applied to the query. NFTs that match one or more
   * of these filters are excluded from the response. May not be used in
   * conjunction with {@link includeFilters}
   */
  excludeFilters?: NftFilters[];

  /**
   * Order in which to return results. By default, results are ordered by
   * contract address and token ID in lexicographic order.
   */
  orderBy?: NftOrdering;
}

/**
 * The response for the {@link NftNamespace.getContractsForOwner} method.
 *
 * @public
 */
export interface GetContractsForOwnerResponse {
  /** The list of contracts, that match the query, held by the given address. */
  contracts: NftContractForOwner[];

  /** Key for pagination to use to fetch results from the next page if available. */
  pageKey?: string;

  /** Total number of NFT contracts held by the given address. */
  totalCount: number;
}

/** Represents a single NFT contract data in the {@link GetContractsForOwnerResponse}. */
export interface NftContractForOwner extends NftContract {
  /**
   * Sum of NFT balances across all token IDs held by the owner. For
   * non-fungible tokens this will be equal to the numDistinctTokensOwned, but
   * it may be higher if the user holds some fungible ERC1155 tokens.
   */
  totalBalance: string;

  /**
   * Number of distinct token IDs held by the owner. For non-fungible tokens
   * this will be equal to the totalBalance, but it may be lower if the user
   * holds some fungible ERC1155 tokens.
   */
  numDistinctTokensOwned: string;

  /** Whether the NFT contract is considered spam. */
  isSpam: boolean;

  /**
   * Object containing an NFT owned by the owner for this particular contract.
   * Use this to display a sample NFT for the contract.
   */
  displayNft: DisplayNftForContract;

  /** Object containing different URLs for the NFT media. */
  image: NftImage;
}

/** Sample owned NFT on a {@link NftContract}, used to display placeholder info. */
export interface DisplayNftForContract {
  /** A token id of an NFT owned by the owner on the contract. */
  tokenId: string;
  /** The name of the NFT, if available. */
  name?: string;
}

/**
 * Optional parameters object for the {@link NftNamespace.getTransfersForOwner}
 * method.
 */
export interface GetTransfersForContractOptions {
  /** Starting block (inclusive) to get transfers from. */
  fromBlock?: BlockTag;
  /** Ending block (inclusive) to get transfers from. */
  toBlock?: BlockTag;
  /**
   * Whether to return results in ascending or descending order by block number.
   * Defaults to ascending if omitted.
   */
  order?: SortingOrder;
  /**
   * Optional page key from an existing {@link TransfersNftResponse} to use for
   * pagination.
   */
  pageKey?: string;
}

/**
 * Response object for NFT methods that fetch NFTs that were transferred or
 * minted (ex: {@link NftNamespace.getTransfersForOwner} or
 * {@link NftNamespace.getMintedNfts}).
 */
export interface TransfersNftResponse {
  /** An array of NFTs.*/
  nfts: TransferredNft[];
  /** Optional page key to use to fetch the next group of NFTs. */
  pageKey?: string;
}

/**
 * NFT with extra data for a single NFT that was transferred or minted.
 */
export interface TransferredNft extends Nft {
  /**
   * The address the NFT was from. For minted NFTs, this field is the set to
   * `0x0000000000000000000000000000000000000000`.
   **/
  from: string;
  /** The address the NFT was sent or minted to. */
  to?: string;
  /** The transaction hash where the transfer or mint occurred. */
  transactionHash: string;
  /** The block number as a hex string of when the transfer or mint occurred. */
  blockNumber: string;
}

/**
 * Optional parameters object for the {@link NftNamespace.getMintedNfts} method.
 */
export interface GetMintedNftsOptions {
  /**
   * List of NFT contract addresses to filter mints by. If omitted, defaults to
   * all contract addresses.
   */
  contractAddresses?: string[];

  /**
   * Filter mints by ERC721 vs ERC1155 contracts. If omitted, defaults to all
   * NFTs.
   */
  tokenType?: NftTokenType.ERC1155 | NftTokenType.ERC721;

  /**
   * Optional page key from an existing {@link TransfersNftResponse} to use for
   * pagination.
   */
  pageKey?: string;
}

/**
 * Optional parameters object for the {@link NftNamespace.getNftSales} method.
 *
 * This interface is used to filter the NFT sales data.
 *
 * @public
 */
export interface GetNftSalesOptions {
  /** The block number to start fetching NFT sales data from. */
  fromBlock?: number | 'latest';

  /** The block number limit to fetch NFT sales data from. */
  toBlock?: number | 'latest';

  /** Whether to return the results in ascending or descending order by block number. */
  order?: SortingOrder;

  /** The NFT marketplace to filter sales by. */
  marketplace?: NftSaleMarketplace;

  /** The address of the NFT buyer to filter sales by. */
  buyerAddress?: string;

  /** The address of the NFT seller to filter sales by. */
  sellerAddress?: string;

  /**
   * Filter by whether the buyer or seller was the taker in the NFT trade.
   * Defaults to returning both buyer and seller taker trades.
   */
  taker?: NftSaleTakerType;

  /** The maximum number of NFT sales to return. */
  limit?: number;

  /** Key for pagination to use to fetch results from the next page if available. */
  pageKey?: string;
}

/**
 * Alternative optional parameters object for the {@link NftNamespace.getNftSales}
 * method that allows filtering results by contractAddress.
 *
 * This interface is used to filter the NFT sales data.
 *
 * @public
 */
export interface GetNftSalesOptionsByContractAddress
  extends GetNftSalesOptions {
  /** The contract address of a NFT collection to filter sales by. */
  contractAddress: string;

  /** The token ID of an NFT within the specified contractAddress to filter sales by. */
  tokenId?: BigNumberish;
}

/**
 * The response for the {@link NftNamespace.getNftSales} method.
 *
 * @public
 */
export interface GetNftSalesResponse {
  /** List of NFT sales that match the query */
  nftSales: NftSale[];
  /**
   * Block Information of the block as of which the corresponding data is valid.
   */
  validAt: NftSaleValidAt;
  /**
   * The page key to use to fetch the next page if more results are available.
   */
  pageKey?: string;
}

/** Represents a single NFT sale data in the {@link GetNftSalesResponse}. */
export interface NftSale {
  /** The marketplace the sale took place on. */
  marketplace: NftSaleMarketplace;

  /** The marketplace address the sale was on. */
  marketplaceAddress: string;

  /** The NFT contract address. */
  contractAddress: string;

  /** The decimal token ID of the NFT being sold. */
  tokenId: string;

  /** The number of tokens sold in the sale as a decimal integer string. */
  quantity: string;

  /** The address of the buyer in the NFT sale. */
  buyerAddress: string;

  /** The address of the seller in the NFT sale. */
  sellerAddress: string;

  /** Whether the price taker in the trade was the buyer or the seller. */
  taker: NftSaleTakerType;

  /** The payment from buyer to the seller. */
  sellerFee: NftSaleFeeData;

  /** The payment from buyer to the marketplace. */
  protocolFee: NftSaleFeeData;

  /** The payment from buyer to the royalty address of the NFT collection. */
  royaltyFee: NftSaleFeeData;

  /** The block number the NFT sale took place in. */
  blockNumber: number;

  /** The log number of the sale event emitted within the block. */
  logIndex: number;

  /** The index of the token within the bundle of NFTs sold in the sale. */
  bundleIndex: number;

  /** The transactionHash of the NFT sale. */
  transactionHash: string;
}

/** The block information at which the NFT sale information is valid at. */
export interface NftSaleValidAt {
  /** The block number the sale information is valid at. */
  blockNumber: number;
  /** The block hash. Used to detect reorgs. */
  blockHash?: string;
  /** The timestamp for the block. */
  blockTimestamp?: string;
}

/**
 * Fee detail for an NFT sale.
 *
 * @public
 */
export interface NftSaleFeeData {
  /** The fee payment amount as a decimal integer string. */
  amount?: string;

  tokenAddress?: string;

  /** The symbol of the token used for the payment. */
  symbol?: string;

  /** The number of decimals of the token used for the payment. */
  decimals?: number;
}

/**
 * Enum representing the supported NFT marketplaces by the
 * {@link NftNamespace.getNftSales} method.
 *
 * @public
 */
export enum NftSaleMarketplace {
  SEAPORT = 'seaport',
  LOOKSRARE = 'looksrare',
  X2Y2 = 'x2y2',
  WYVERN = 'wyvern',
  CRYPTOPUNKS = 'cryptopunks',
  BLUR = 'blur',
  UNKNOWN = 'unknown'
}

/**
 * Mint information for the NFT.
 */
export interface NftMint {
  /** The address that the NFT was minted to. */
  mintAddress?: string;
  /** The block number that the NFT was minted on. */
  blockNumber?: number;
  /** The timestamp the NFT was minted on. */
  timestamp?: string;
  /** The transaction hash of the transaction that minted the NFT. */
  transactionHash?: string;
}

/**
 * Enum for specifying the taker type for the {@link NftNamespace.getNftSales}
 * method.
 *
 * @public
 */
export enum NftSaleTakerType {
  BUYER = 'buyer',
  SELLER = 'seller'
}

export interface SearchContractMetadataResponse {
  contracts: NftContract[];
}

/**
 * Response object for the {@link NftNamespace.computeRarity} method.
 */
export interface ComputeRarityResponse {
  rarities: NftAttributeRarity[];
}

/**
 * Information about the rarity of an NFT's attribute in the specified collection.
 *
 * @public
 */
export interface NftAttributeRarity {
  /** Name of the NFT's attribute. */
  value: string;

  /** The type of NFT attribute. */
  traitType: string;

  /**
   * A number from 0 to 1 representing the prevalence of this value for this
   * trait type in the current collection.
   */
  prevalence: number;
}

/**
 * Summary of the attribute prevalence for the specified NFT contract.
 *
 * @public
 */
export interface NftAttributesResponse {
  /** The specified NFT contract's address. */
  contractAddress: string;

  /** The specified NFT contract's total supply. */
  totalSupply: string;

  /**
   * The attribute prevalence of each trait grouped by the trait type for the
   * provided NFT.
   */
  summary: Record<string, Record<string, number>>;
}

/** The current state of the NFT contract refresh process. */
export enum NftRefreshState {
  /** The provided contract is not an NFT or does not contain metadata. */
  DOES_NOT_EXIST = 'does_not_exist',

  /** The contract has already been queued for refresh. */
  ALREADY_QUEUED = 'already_queued',

  /** The contract is currently being refreshed. */
  IN_PROGRESS = 'in_progress',

  /** The contract refresh is complete. */
  FINISHED = 'finished',

  /** The contract refresh has been queued and await execution. */
  QUEUED = 'queued',

  /** The contract was unable to be queued due to an internal error. */
  QUEUE_FAILED = 'queue_failed'
}

/**
 * Metadata object returned in a {@link AssetTransfersResult} object if the asset
 * transferred is an ERC1155.
 *
 * @public
 */
export interface ERC1155Metadata {
  tokenId: string;
  value: string;
}

/**
 * Information about the underlying contract for the asset that was transferred
 * in a {@link AssetTransfersResult} object.
 *
 * @public
 */
export interface RawContract {
  /**
   * The raw transfer value as a hex string. `null` if the transfer was for an
   * ERC721 or ERC1155 token.
   */
  value: string | null;

  /** The contract address. `null` if it was an internal or external transfer. */
  address: string | null;

  /**
   * The number of decimals in the contract as a hex string. `null` if the value
   * is not in the contract and not available from other sources.
   */
  decimal: string | null;
}

/**
 * Optional parameters object for the {@link getNftsForContract} and
 * {@link getNftsForContractIterator} functions.
 *
 * This interface is used to fetch NFTs with their associated metadata. To get
 * Nfts without their associated metadata, use {@link GetBaseNftsForContractOptions}.
 *
 * @public
 */
export interface GetNftsForContractOptions {
  /**
   * Optional page key from an existing {@link NftContractBaseNftsResponse} or
   * {@link NftContractNftsResponse}to use for pagination.
   */
  pageKey?: string;

  /** Optional boolean flag to omit NFT metadata. Defaults to `false`. */
  omitMetadata?: boolean;

  /**
   * Sets the total number of NFTs to return in the response. Defaults to 100.
   * Maximum page size is 100.
   */
  pageSize?: number;

  /**
   * No set timeout by default - When metadata is requested, this parameter is
   * the timeout (in milliseconds) for the website hosting the metadata to
   * respond. If you want to only access the cache and not live fetch any
   * metadata for cache misses then set this value to 0.
   */
  tokenUriTimeoutInMs?: number;
}

/**
 * Optional parameters object for the {@link getNftsForContract} and
 * {@link getNftsForContractIterator} functions.
 *
 * This interface is used to fetch NFTs without their associated metadata. To
 * get Nfts with their associated metadata, use {@link GetNftsForContractOptions}.
 *
 * @public
 */
export interface GetBaseNftsForContractOptions {
  /**
   * Optional page key from an existing {@link NftContractBaseNftsResponse} or
   * {@link NftContractNftsResponse}to use for pagination.
   */
  pageKey?: string;

  /** Optional boolean flag to omit NFT metadata. Defaults to `false`. */
  omitMetadata: false;

  /**
   * Sets the total number of NFTs to return in the response. Defaults to 100.
   * Maximum page size is 100.
   */
  pageSize?: number;

  /**
   * No set timeout by default - When metadata is requested, this parameter is
   * the timeout (in milliseconds) for the website hosting the metadata to
   * respond. If you want to only access the cache and not live fetch any
   * metadata for cache misses then set this value to 0.
   */
  tokenUriTimeoutInMs?: number;
}

/**
 * Optional parameters object for the {@link getNftsForContract} method.
 *
 * This interface configures options when fetching the owner addresses of the
 * provided contract.
 *
 * @public
 */
export interface GetOwnersForContractOptions {
  /**
   * Whether to include the token balances per token id for each owner. Defaults
   * to false when omitted.
   */
  withTokenBalances?: boolean;

  /** The block number in hex or decimal to fetch owners for. */
  block?: string;

  /** Optional page key to paginate the next page for large requests. */
  pageKey?: string;

  /**
   * If true, include total count of owners in the response. Only applicable
   * when `withTokenBalances` is not set to `true`.
   */
  includeCount?: boolean;
}

/**
 * Optional parameters object for the {@link getNftsForContract} method.
 *
 * This interface configures options when fetching the owner addresses of the
 * provided contract.
 *
 * @public
 */
export interface GetOwnersForContractWithTokenBalancesOptions {
  /**
   * Whether to include the token balances per token id for each owner. Defaults
   * to false when omitted.
   */
  withTokenBalances: true;

  /** The block number in hex or decimal to fetch owners for. */
  block?: string;

  /** Optional page key to paginate the next page for large requests. */
  pageKey?: string;
}

/**
 * Optional parameters object for the {@link getOwnersForNft} method.
 *
 * This interface configures options when fetching the owner addresses of the
 * provided NFT contract.
 *
 * @public
 */
export interface GetOwnersForNftOptions {
  /** Optional page key to paginate the next page for large requests. */
  pageKey?: string;

  /**
   * Sets the total number of owners to return in the response.
   */
  pageSize?: number;
}

/**
 * The response object for the {@link getNftsForContract} function. The object
 * contains the NFTs without metadata inside the NFT contract.
 *
 * @public
 */
export interface NftContractBaseNftsResponse {
  /** An array of NFTs without metadata. */
  nfts: BaseNft[];

  /**
   * Pagination token that can be passed into another request to fetch the next
   * NFTs. If there is no page key, then there are no more NFTs to fetch.
   */
  pageKey?: string;
}

/**
 * The response object for the {@link getNftsForContract} function. The object
 * contains the NFTs with metadata inside the NFT contract.
 *
 * @public
 */
export interface NftContractNftsResponse {
  /** An array of NFTs with metadata. */
  nfts: Nft[];

  /**
   * Pagination token that can be passed into another request to fetch the next
   * NFTs. If there is no page key, then there are no more NFTs to fetch.
   */
  pageKey?: string;
}

/** OpenSea's metadata for an NFT collection. */
export interface OpenSeaCollectionMetadata {
  /** The floor price of the collection. */
  floorPrice?: number;
  /** The name of the collection on OpenSea. */
  collectionName?: string;
  /** The slug of the collection on OpenSea. */
  collectionSlug?: string;
  /** The approval status of the collection on OpenSea. */
  safelistRequestStatus?: OpenSeaSafelistRequestStatus;
  /** The image URL determined by OpenSea. */
  imageUrl?: string;
  /**
   * The banner image URL determined by OpenSea.
   * @deprecated Use {@link bannerImageUrl} instead.
   */
  imageBannerUrl?: string;
  /** The banner image URL determined by OpenSea. */
  bannerImageUrl?: string;
  /** The description of the collection on OpenSea. */
  description?: string;
  /** The homepage of the collection as determined by OpenSea. */
  externalUrl?: string;
  /** The Twitter handle of the collection. */
  twitterUsername?: string;
  /** The Discord URL of the collection. */
  discordUrl?: string;
  /** Timestamp of when the OpenSea metadata was last ingested by Alchemy. */
  lastIngestedAt: string;
}

/**
 * Alchemy representation of an NFT contract.
 *
 * The BaseNftContract does not hold any metadata information and only contains
 * the address. The NftContract additionally contains the tokenType, name,
 * symbol, and more.
 *
 * @public
 */
export interface NftContract {
  /** The address of the NFT contract. */
  address: string;
  /** The type of the token in the contract. */
  tokenType: NftTokenType;
  /** The name of the contract. */
  name?: string;
  /** The symbol of the contract. */
  symbol?: string;
  /**
   * The number of NFTs in the contract as an integer string. This field is only
   * available on ERC-721 contracts.
   */
  totalSupply?: string;
  /** OpenSea's metadata for the contract. */
  openSeaMetadata: OpenSeaCollectionMetadata;
  /** The address that deployed the NFT contract. */
  contractDeployer?: string;
  /** The block number the NFT contract deployed in. */
  deployedBlockNumber?: number;
}

/** NFT contract metadata with spam information. */
export interface NftContractForNft extends NftContract {
  /** Whether the NFT contract is marked as spam. */
  isSpam?: boolean;
  /** Potential reasons why an NFT Contract was classified as spam. */
  spamClassifications: NftSpamClassification[];
}

/**
 * Alchemy representation of an NFT collection
 *
 * @public
 */
export interface NftCollection {
  /** The name of the collection. */
  name: string;
  /** The OpenSea human-readable slug of the collection. */
  slug?: string;
  /** The floor price of the collection*/
  floorPrice?: NftCollectionFloorPrice;
  /** The description of the collection. */
  description?: string;
  /** The homepage of the collection as determined by OpenSea. */
  externalUrl?: string;
  /** The Twitter handle of the collection. */
  twitterUsername?: string;
  /** The Discord URL of the collection. */
  discordUrl?: string;
}

/**
 * Floor price object for an NFT collection.
 */
export interface NftCollectionFloorPrice {
  /** The marketplace where the floor price was determined. */
  marketplace?: NftCollectionMarketplace;
  /** The floor price of the collection. */
  floorPrice?: number;
  /** The currency of the floor price. */
  priceCurrency?: string;
}

/**
 * Enum representing the supported NFT marketplaces on a
 * {@link NftCollectionFloorPrice} object.
 */
export enum NftCollectionMarketplace {
  OPENSEA = 'OpenSea'
}

/**
 * Alchemy representation of an NFT that doesn't contain metadata.
 *
 * The BaseNft object does not hold any metadata information and only contains
 * the NFT contract and token ID. The Nft object additionally contains the NFT
 * metadata, token URI information, and media.
 *
 * @public
 */
export interface BaseNft {
  /** The contract address of the NFT. */
  contractAddress: string;
  /** The NFT token ID as an integer string. */
  tokenId: string;
}

/**
 * Alchemy representation of an NFT.
 *
 * The BaseNft object does not hold any metadata information and only contains
 * the NFT contract and token ID. The Nft object additionally contains the NFT
 * metadata, token URI information, and media.
 *
 * @public
 */
export interface Nft {
  /** The NFT's underlying contract and relevant contract metadata. */
  contract: NftContractForNft;
  /** The NFT token ID as an integer string. */
  tokenId: string;
  /** The type of NFT.*/
  tokenType: NftTokenType;
  /** The NFT name. */
  name?: string;
  /** The NFT description. */
  description?: string;
  /** Media URLs and information for the NFT */
  image: NftImage;
  /** Animation information for the NFT. */
  animation?: {
    /** URL of the animation stored in Alchemy's cache. */
    cachedUrl?: string;
    /** The original URL of the animation as stored on the contract. */
    originalUrl?: string;
    /** The type of the animation media. */
    contentType?: string;
    /** The size of the animation in bytes. */
    size?: number;
  };
  /** The raw metadata for the NFT based on the metadata URI on the NFT contract. */
  raw: NftRawMetadata;
  /** URIs for accessing the NFT's metadata blob. */
  tokenUri?: string;
  /** When the NFT was last updated in the blockchain. Represented in ISO-8601 format. */
  timeLastUpdated: string;
  /**
   * Time at which the NFT was most recently acquired by the user. Only
   * available when specifying `orderBy: NftOrdering.TRANSFERTIME` in the
   * request.
   */
  acquiredAt?: AcquiredAt;
  /** Collection metadata for the NFT, if available. */
  collection?: BaseNftCollection;
  /** Mint information for the NFT. */
  mint?: NftMint;
}

/**
 * A base collection object as part of an {@link Nft}.
 */
export interface BaseNftCollection {
  /** The name of the collection. */
  name: string;
  /** The OpenSea human-readable slug of the collection. */
  slug?: string;
  /** The external URL for the collection. */
  externalUrl?: string;
  /** The banner image URL for the collection. */
  bannerImageUrl?: string;
}

/**
 * The raw metadata for the NFT based on the metadata URI on the NFT contract.
 */
export interface NftRawMetadata {
  /** The raw token URI on the NFT contract. */
  tokenUri?: string;
  /** The raw metadata parsed from the raw token URI. */
  metadata: Record<string, any>;
  /** Error message if the raw metadata could not be fetched. */
  error?: string;
}
