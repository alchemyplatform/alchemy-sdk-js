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

  /**
   * The maximum number of retries to attempt if a request fails. Defaults to 5.
   */
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

export interface TokenAllowanceParams {
  contract: string;
  owner: string;
  spender: string;
}

export type TokenAllowanceResponse = string;

export interface TokenBalancesResponse {
  address: string;
  tokenBalances: TokenBalance[];
}

export type TokenBalance = TokenBalanceSuccess | TokenBalanceFailure;

/**
 * @public
 */
export interface TokenBalanceSuccess {
  contractAddress: string;
  tokenBalance: string;
  error: null;
}

/**
 * @public
 */
export interface TokenBalanceFailure {
  contractAddress: string;
  tokenBalance: null;
  error: string;
}

/**
 * @public
 */
export interface TokenMetadataResponse {
  decimals: number | null;
  logo: string | null;
  name: string | null;
  symbol: string | null;
}

/**
 * @public
 */
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

/**
 * @public
 */
export enum AssetTransfersCategory {
  EXTERNAL = 'external',
  INTERNAL = 'internal',
  TOKEN = 'token',
  ERC20 = 'erc20',
  ERC721 = 'erc721',
  ERC1155 = 'erc1155',
  SPECIALNFT = 'specialnft'
}

/**
 * @public
 */
export enum AssetTransfersOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc'
}

export enum NftTokenType {
  ERC721 = 'erc721',
  ERC1155 = 'erc1155',
  UNKNOWN = 'unknown'
}

export interface AssetTransfersResponse {
  transfers: AssetTransfersResult[];
  pageKey?: string;
}

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

export interface NftMetadata extends Record<string, any> {
  name?: string;
  description?: string;
  image?: string;
  attributes?: Array<Record<string, any>>;
}

/**
 *
 *
 * @public
 */
export interface TokenUri {
  /** URI for the location of the NFT's original metadata blob.*/
  raw: string;
  /** Public gateway URI for the raw URI. */
  gateway: string;
}

/**
 * Parameters object for the {@link getNfts} and {@link getNftsPaginated}
 * functions.
 *
 * This interface is used to fetch NFTs with their associated metadata. To
 * get Nfts without their associated metadata, use {@link GetBaseNftsParams}.
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

  /**
   * Optional list of contract addresses to filter the results by. Limit is 20.
   */
  contractAddresses?: string[];

  /**
   * Optional boolean flag to include NFT metadata. Defaults to `true`.
   */
  withMetadata?: boolean;
}

/**
 * Parameters object for the {@link getNfts} and {@link getNftsPaginated}
 * functions.
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

  /**
   * Optional list of contract addresses to filter the results by. Limit is 20.
   */
  contractAddresses?: string[];

  /**
   * Optional boolean flag to include NFT metadata. Defaults to `true`.
   */
  withMetadata: false;
}

/**
 * @public
 */
export interface OwnedNftsResponse {
  ownedNfts: OwnedNft[];
  pageKey?: string;
  totalCount: number;
}

export interface OwnedBaseNftsResponse {
  ownedNfts: OwnedBaseNft[];
  pageKey?: string;
  totalCount: number;
}

export interface OwnedNft {
  nft: Nft;
  balance: number;
}

export interface OwnedBaseNft {
  nft: BaseNft;
  balance: number;
}

export interface GetOwnersForTokenResponse {
  owners: string[];
}

export interface TransactionReceiptsBlockNumber {
  blockNumber: string;
}

export interface TransactionReceiptsBlockHash {
  blockHash: string;
}

export type TransactionReceiptsParams =
  | TransactionReceiptsBlockNumber
  | TransactionReceiptsBlockHash;

export interface TransactionReceiptsResponse {
  receipts: TransactionReceipt[] | null;
}

export interface ERC1155Metadata {
  tokenId: string;
  value: string;
}

export interface RawContract {
  value: string | null;
  address: string | null;
  decimal: string | null;
}

/**
 * Parameters object for the {@link getNftsForCollection} and
 * {@link getNftsForCollectionPaginated} functions.
 *
 * This interface is used to fetch NFTs with their associated metadata. To get
 * Nfts without their associated metadata, use
 * {@link GetBaseNftsForCollectionParams}.
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

  /**
   * Optional boolean flag to include NFT metadata. Defaults to `true`.
   */
  withMetadata?: boolean;
}

/**
 * Parameters object for the {@link getNftsForCollection} and
 * {@link getNftsForCollectionPaginated} functions.
 *
 * This interface is used to fetch NFTs without their associated metadata. To
 * get Nfts with their associated metadata, use
 * {@link GetNftsForCollectionParams}.
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

  /**
   * Optional boolean flag to include NFT metadata. Defaults to `true`.
   */
  withMetadata: false;
}

/**
 * @public
 */
export interface CollectionBaseNftsResponse {
  nfts: BaseNft[];
  pageKey?: string;
}

/**
 * @public
 */
export interface CollectionNftsResponse {
  nfts: Nft[];
  pageKey?: string;
}
