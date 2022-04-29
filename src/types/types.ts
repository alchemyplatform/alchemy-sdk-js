import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { BaseNft, Nft } from '../api/nft';

// TODO: Add documentation and annotations for all types here.

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
export interface TokenAllowanceParams {
  contract: string;
  owner: string;
  spender: string;
}

/** @public */
export type TokenAllowanceResponse = string;

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
 * Parameters object for the {@link (getNfts:2)} and {@link (getNftsPaginated:2)} functions.
 *
 * This interface is used to fetch NFTs with their associated metadata. To get
 * Nfts without their associated metadata, use {@link GetBaseNftsParams}.
 *
 * @public
 */
export interface GetNftsParams {
  /** The owner address of the NFTs. */
  owner: string;

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
 * Parameters object for the {@link (getNfts:1)} and {@link (getNftsPaginated:1)} functions.
 *
 * This interface is used to fetch NFTs without their associated metadata. To
 * get Nfts with their associated metadata, use {@link GetNftsParams}.
 *
 * @public
 */
export interface GetBaseNftsParams {
  /** The owner address of the NFTs. */
  owner: string;

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
 * Enum of NFT filters that can be applied to a {@link getNfts} request. NFTs
 * that match one or more of these filters are excluded from the response.
 *
 * @beta
 */
export enum NftExcludeFilters {
  /** Exclude NFTs that have been classified as spam. */
  SPAM
}

/**
 * The response object for the {@link (getNfts:2)} and
 * {@link (getNftsPaginated:2)} functions. The object contains the NFTs with
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
 * The response object for the {@link (getNfts:1)} and
 * {@link (getNftsPaginated:1)} functions. The object contains the NFTs without
 * metadata owned by the provided address, along with pagination information and
 * the total count.
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
 * The response object for the {@link getOwnersForToken}.
 *
 * @public
 */
export interface GetOwnersForTokenResponse {
  /** An array of owner addresses for the provided token. */
  readonly owners: string[];
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
 * Parameters object for the {@link (getNftsForCollection:2)} and
 * {@link (getNftsForCollectionPaginated:2)} functions.
 *
 * This interface is used to fetch NFTs with their associated metadata. To get
 * Nfts without their associated metadata, use {@link GetBaseNftsForCollectionParams}.
 *
 * @public
 */
export interface GetNftsForCollectionParams {
  /** The contract address of the collection. */
  contractAddress: string;

  /**
   * Optional page key from an existing {@link CollectionBaseNftsResponse} or
   * {@link CollectionNftsResponse}to use for pagination.
   */
  pageKey?: string;

  /** Optional boolean flag to omit NFT metadata. Defaults to `false`. */
  omitMetadata?: boolean;
}

/**
 * Parameters object for the {@link (getNftsForCollection:1)} and
 * {@link (getNftsForCollectionPaginated:1)} functions.
 *
 * This interface is used to fetch NFTs without their associated metadata. To
 * get Nfts with their associated metadata, use {@link GetNftsForCollectionParams}.
 *
 * @public
 */
export interface GetBaseNftsForCollectionParams {
  /** The contract address of the collection. */
  contractAddress: string;

  /**
   * Optional page key from an existing {@link CollectionBaseNftsResponse} or
   * {@link CollectionNftsResponse}to use for pagination.
   */
  pageKey?: string;

  /** Optional boolean flag to omit NFT metadata. Defaults to `false`. */
  omitMetadata: false;
}

/**
 * The response object for the {@link (getNftsForCollection:1)} function. The
 * object contains the NFTs without metadata inside the collection.
 *
 * @public
 */
export interface CollectionBaseNftsResponse {
  /** An array of NFTs without metadata. */
  nfts: BaseNft[];

  /**
   * Pagination token that can be passed into another request to fetch the next
   * NFTs. If there is no page key, then there are no more NFTs to fetch.
   */
  pageKey?: string;
}

/**
 * The response object for the {@link (getNftsForCollection:2)} function. The
 * object contains the NFTs with metadata inside the collection.
 *
 * @public
 */
export interface CollectionNftsResponse {
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
