import { TransactionReceipt } from '@ethersproject/abstract-provider';

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
  address: string;
  tokenBalance: string;
  error: null;
}

/**
 * @public
 */
export interface TokenBalanceFailure {
  address: string;
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

export type NftTokenType = {
  ERC721: 'erc721';
  ERC1155: 'erc1155';
};

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

export interface TokenUri {
  raw: string;
  gateway: string;
}

export interface NftMedia {
  uri?: TokenUri;
}

export interface NftContract {
  address: string;
}

export interface NftId {
  tokenId: string;
  tokenMetadata?: NftTokenMetadata;
}

export interface NftTokenMetadata {
  tokenType: NftTokenType;
}

export type GetNftMetadataResponse = NftMetadata;

/**
 * Represents an NFT object along with its metadata.
 *
 * @public
 */
export interface Nft extends BaseNft {
  title: string;
  description: string;
  tokenUri?: TokenUri;
  media?: NftMedia[];
  metadata?: NftMetadata;
  timeLastUpdated: string;
  error?: string;
}

/**
 * Represents an NFT object without any associated metadata.
 *
 * @public
 */
// TODO: refactor to not include contract in order to handle getNftsForCollection
export interface BaseNft {
  contract: NftContract;
  id: NftId;
}

export interface GetNftsParams {
  owner: string;
  pageKey?: string;
  contractAddresses?: string[];
  withMetadata?: true;
}

/**
 * Parameter object for fetching NFTs without metadata.
 * @public
 */
export interface GetNftsParamsWithoutMetadata {
  owner: string;
  pageKey?: string;
  contractAddresses?: string[];
  withMetadata: false;
}

export interface GetNftsResponse {
  ownedNfts: Nft[];
  pageKey?: string;
  totalCount: number;
}

export interface GetNftsResponseWithoutMetadata {
  ownedNfts: BaseNft[];
  pageKey?: string;
  totalCount: number;
}

export interface GetNftsResponse {
  ownedNfts: Nft[];
  pageKey?: string;
  totalCount: number;
}

export interface GetNftsForCollectionParams {
  contractAddress: string;
  // TODO: is this optional or not?
  startToken?: string;
  withMetadata: true;
}

// TODO: is withmetadata default true?
export interface GetNftsForCollectionWithoutMetadataParams {
  contractAddress: string;
  startToken?: string;
  withMetadata: false;
}

// TODO: does this include the contract field of BaseNft?
export interface GetNftsForCollectionWithoutMetadataResponse {
  nfts: BaseNft[];
  // TODO: What is the type?
  nextToken: string;
  // TODO: why is there no pagekey or totalCount? How much work to implement?
}

export interface GetNftsForCollectionResponse {
  nfts: Nft[];
  // TODO: What is the type?
  nextToken: string;
  // TODO: why is there no pagekey or totalCount? How much work to implement?
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
