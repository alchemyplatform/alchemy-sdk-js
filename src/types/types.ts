import {
  EventType,
  TransactionReceipt
} from '@ethersproject/abstract-provider';
import { BaseNft, Nft } from '../api/nft';

// TODO: separate this file into other files.

/**
 * Options object used to configure the Alchemy SDK.
 *
 * @public
 */
export interface AlchemyConfig {
  /** The Alchemy API key that can be found in the Alchemy dashboard. */
  apiKey?: string;

  /** The name of the network. */
  network?: Network;

  /** The maximum number of retries to attempt if a request fails. Defaults to 5. */
  maxRetries?: number;
}

/**
 * The supported networks by Alchemy. Note that some functions are not available
 * on all networks. Please refer to the Alchemy documentation for more details.
 *
 * @public
 */
export enum Network {
  ETH_MAINNET = 'eth-mainnet',
  ETH_ROPSTEN = 'eth-ropsten',
  ETH_GOERLI = 'eth-goerli',
  ETH_KOVAN = 'eth-kovan',
  ETH_RINKEBY = 'eth-rinkeby',
  OPT_MAINNET = 'opt-mainnet',
  OPT_KOVAN = 'opt-kovan',
  ARB_MAINNET = 'arb-mainnet',
  ARB_RINKEBY = 'arb-rinkeby',
  MATIC_MAINNET = 'polygon-mainnet',
  MATIC_MUMBAI = 'polygon-mumbai'
}

/** @public */
export interface TokenBalancesResponse {
  address: string;
  tokenBalances: TokenBalance[];
}

/** @public */
export type TokenBalance = TokenBalanceSuccess | TokenBalanceFailure;

/** @public */
export interface TokenBalanceSuccess {
  contractAddress: string;
  tokenBalance: string;
  error: null;
}

/** @public */
export interface TokenBalanceFailure {
  contractAddress: string;
  tokenBalance: null;
  error: string;
}

/** @public */
export interface TokenMetadataResponse {
  decimals: number | null;
  logo: string | null;
  name: string | null;
  symbol: string | null;
}

/** @public */
export interface AssetTransfersParams {
  fromBlock?: string;
  toBlock?: string;
  order?: AssetTransfersOrder;
  fromAddress?: string;
  toAddress?: string;
  contractAddresses?: string[];
  excludeZeroValue?: boolean;
  maxCount?: number;
  category?: AssetTransfersCategory[];
  pageKey?: string;
}

/** @public */
export enum AssetTransfersCategory {
  EXTERNAL = 'external',
  INTERNAL = 'internal',
  TOKEN = 'token',
  ERC20 = 'erc20',
  ERC721 = 'erc721',
  ERC1155 = 'erc1155',

  /**
   * Special contracts that don't follow ERC 721/1155, (ex: CryptoKitties).
   *
   * @beta
   */
  SPECIALNFT = 'specialnft'
}

/** @public */
export enum AssetTransfersOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc'
}

/** @public */
export enum NftTokenType {
  ERC721 = 'erc721',
  ERC1155 = 'erc1155',
  UNKNOWN = 'unknown'
}

/** @public */
export interface AssetTransfersResponse {
  transfers: AssetTransfersResult[];
  pageKey?: string;
}

/** @public */
export interface AssetTransfersResult {
  category: AssetTransfersCategory;
  blockNum: string;
  from: string;
  to: string | null;
  value: number | null;
  erc721TokenId: string | null;
  erc1155Metadata: ERC1155Metadata[] | null;
  tokenId: string | null;
  asset: string | null;
  hash: string;
  rawContract: RawContract;
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

/** @public */
export interface TokenUri {
  /** URI for the location of the NFT's original metadata blob. */
  raw: string;
  /** Public gateway URI for the raw URI. Generally offers better performance. */
  gateway: string;
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
  excludeFilters?: NftExcludeFilters[];

  /** Optional boolean flag to omit NFT metadata. Defaults to `false`. */
  omitMetadata?: boolean;
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
  excludeFilters?: NftExcludeFilters[];

  /** Optional boolean flag to include NFT metadata. Defaults to `false`. */
  omitMetadata: true;
}

/**
 * Enum of NFT filters that can be applied to a {@link getNftsForOwner} request.
 * NFTs that match one or more of these filters are excluded from the response.
 *
 * @beta
 */
export enum NftExcludeFilters {
  /** Exclude NFTs that have been classified as spam. */
  SPAM = 'SPAM'
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
  readonly ownedNfts: OwnedNft[];

  /**
   * Pagination token that can be passed into another request to fetch the next
   * NFTs. If there is no page key, then there are no more NFTs to fetch.
   */
  readonly pageKey?: string;

  /** The total count of NFTs owned by the provided address. */
  readonly totalCount: number;
}

/**
 * The response object for the {@link getNftsForOwner} and
 * {@link getNftsForOwnerIterator)} functions. The object contains the NFTs
 * without metadata owned by the provided address, along with pagination
 * information and the total count.
 *
 * @public
 */
export interface OwnedBaseNftsResponse {
  /** The NFTs owned by the provided address. */
  readonly ownedNfts: OwnedBaseNft[];

  /**
   * Pagination token that can be passed into another request to fetch the next
   * NFTs. If there is no page key, then there are no more NFTs to fetch.
   */
  readonly pageKey?: string;

  /** The total count of NFTs owned by the provided address. */
  readonly totalCount: number;
}

/**
 * Represents an NFT with metadata owned by an address.
 *
 * @public
 */
export interface OwnedNft extends Nft {
  /** The token balance of the NFT. */
  readonly balance: number;
}

/**
 * Represents an NFT without metadata owned by an address.
 *
 * @public
 */
export interface OwnedBaseNft extends BaseNft {
  /** The token balance of the NFT. */
  readonly balance: number;
}

/**
 * The response object for the {@link getOwnersForNft}.
 *
 * @public
 */
export interface GetOwnersForNftResponse {
  /** An array of owner addresses for the provided token. */
  readonly owners: string[];
}

/**
 * The response object for the {@link getOwnersForNftContract}.
 *
 * @public
 */
export interface GetOwnersForNftContractResponse {
  /** An array of owner addresses for the provided contract address */
  readonly owners: string[];
}

/**
 * The successful object returned by the {@link getNftFloorPrice} call for each
 * marketplace (e.g. looksRare).
 *
 * @public
 */
export interface FloorPriceMarketplace {
  /** The floor price of the collection on the given marketplace */
  readonly floorPrice: number;
  /** The currency in which the floor price is denominated */
  readonly priceCurrency: string;
  /** The link to the collection on the given marketplace */
  readonly collectionUrl: string;
  /** UTC timestamp of when the floor price was retrieved from the marketplace */
  readonly retrievedAt: string;
}

/**
 * The failing object returned by the {@link getNftFloorPrice} call for each
 * marketplace (e.g. looksRare).
 *
 * @public
 */
export interface FloorPriceError {
  /** Error fetching floor prices from the given marketplace */
  readonly error: string;
}

/**
 * The response object for the {@link getNftFloorPrice} method.
 *
 * @public
 */
export interface GetNftFloorPriceResponse {
  /**
   * Name of the NFT marketplace where the collection is listed. Current
   * marketplaces supported: OpenSea, LooksRare
   */
  readonly openSea: FloorPriceMarketplace | FloorPriceError;
  readonly looksRare: FloorPriceMarketplace | FloorPriceError;
}

/** @public */
export interface TransactionReceiptsBlockNumber {
  blockNumber: string;
}

/** @public */
export interface TransactionReceiptsBlockHash {
  blockHash: string;
}

/** @public */
export type TransactionReceiptsParams =
  | TransactionReceiptsBlockNumber
  | TransactionReceiptsBlockHash;

/** @public */
export interface TransactionReceiptsResponse {
  receipts: TransactionReceipt[] | null;
}

/** @public */
export interface ERC1155Metadata {
  tokenId: string;
  value: string;
}

/** @public */
export interface RawContract {
  value: string | null;
  address: string | null;
  decimal: string | null;
}

/**
 * Optional parameters object for the {@link getNftsForNftContract} and
 * {@link getNftsForNftContractIterator} functions.
 *
 * This interface is used to fetch NFTs with their associated metadata. To get
 * Nfts without their associated metadata, use {@link GetBaseNftsForNftContractOptions}.
 *
 * @public
 */
export interface GetNftsForNftContractOptions {
  /**
   * Optional page key from an existing {@link NftContractBaseNftsResponse} or
   * {@link NftContractNftsResponse}to use for pagination.
   */
  pageKey?: string;

  /** Optional boolean flag to omit NFT metadata. Defaults to `false`. */
  omitMetadata?: boolean;
}

/**
 * Optional parameters object for the {@link getNftsForNftContract} and
 * {@link getNftsForNftContractIterator} functions.
 *
 * This interface is used to fetch NFTs without their associated metadata. To
 * get Nfts with their associated metadata, use {@link GetNftsForNftContractOptions}.
 *
 * @public
 */
export interface GetBaseNftsForNftContractOptions {
  /**
   * Optional page key from an existing {@link NftContractBaseNftsResponse} or
   * {@link NftContractNftsResponse}to use for pagination.
   */
  pageKey?: string;

  /** Optional boolean flag to omit NFT metadata. Defaults to `false`. */
  omitMetadata: false;
}

/**
 * The response object for the {@link getNftsForNftContract} function. The object
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
 * The response object for the {@link getNftsForNftContract} function. The object
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

/**
 * The response object for the {@link findContractDeployer} function.
 *
 * @public
 */
export interface DeployResult {
  /** The address of the contract deployer, if it is available. */
  readonly deployerAddress?: string;

  /** The block number the contract was deployed in. */
  readonly blockNumber: number;
}

/**
 * Event filters for the {@link AlchemyWebSocketProvider.on} method to use
 * Alchemy's custom Subscription API endpoints.
 *
 * @public
 */
export type AlchemyEventFilter =
  | {
      method: 'alchemy_newFullPendingTransactions';
    }
  | {
      method: 'alchemy_filteredNewFullPendingTransactions';
      address: string;
    };

/**
 * Alchemy's event filter that extends the default {@link EventType} interface to
 * also include Alchemy's Subscription API.
 *
 * @public
 */
export type AlchemyEventType = EventType | AlchemyEventFilter;
