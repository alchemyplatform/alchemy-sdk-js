import { Contract } from '../api/alchemy-contract';
import { Nft } from './nft-types';
import { TokenPriceByAddressResult } from './prices-types';
import { Network, TokenMetadataResponse, TransactionReceipt } from './types';

/**
 * Used by {@link PortfolioNamespace} to represent an address and a list of
 * networks to fetch portfolio data about.
 *
 * @public
 */
export interface PortfolioAddress {
  /** Array of network identifiers (e.g., eth-mainnet). */
  networks: Network[];

  /** Wallet address. */
  address: string;
}

/**
 * The request fields of {@link PortfolioNamespace.getTokensByWallet}.
 *
 * @public
 */
export interface GetTokensByWalletRequest {
  /** A list of wallet addresses to query. */
  addresses: PortfolioAddress[];

  /** If set to true, returns metadata. */
  withMetadata: boolean;

  /** If set to true, returns token prices. */
  withPrices: boolean;

  /** Whether to include each chain’s native token in the response (e.g. ETH on Ethereum). */
  includeNativeTokens: boolean;
}

/**
 * The response type of {@link PortfolioNamespace.getTokensByWallet}.
 *
 * @public
 */
export interface GetTokensByWalletResponse {
  data: {
    tokens: Array<{
      /** The blockchain network (e.g., Ethereum, Polygon) where the token is located. */
      network: Network;
      /** The wallet address for which the token data applies. */
      address: string;
      /** The quantity of the token held, represented as a raw string (e.g., in wei). */
      tokenBalance: string;
      /** Optional metadata about the token, potentially including name, symbol, decimals, etc. */
      tokenMetadata?: TokenMetadataResponse;
      /** Optional pricing data for the token, such as current value or historical prices. */
      tokenPrices?: TokenPriceByAddressResult;
    }>;
    /** A string used for pagination to retrieve additional results if available. */
    pageKey: string;
  };
}

/**
 * The request fields of {@link PortfolioNamespace.getTokenBalancesByWallet}.
 *
 * @public
 */
export interface GetTokenBalancesByWalletRequest {
  /** A list of wallet addresses to retrieve token balances for. */
  addresses: PortfolioAddress[];
  /**
   * Whether to include each chain’s native token in the response
   * (e.g., ETH on Ethereum, MATIC on Polygon).
   */
  includeNativeTokens: boolean;
}

/**
 * The response type of {@link PortfolioNamespace.getTokenBalancesByWallet}.
 *
 * @public
 */
export interface GetTokenBalancesByWalletResponse {
  data: {
    tokens: Array<{
      /** The network where the token resides (e.g., Ethereum, Polygon). */
      network: Network;
      /** The wallet address associated with the token balance. */
      address: string;
      /** The contract address of the token. */
      tokenAddress: string;
      /** The balance of the token, typically represented as a raw string value (e.g., in wei). */
      tokenBalance: string;
    }>;
    /** A string used for pagination, indicating more results are available. */
    pageKey: string;
  };
}

/**
 * The request fields of {@link PortfolioNamespace.getNftsByWallet}.
 *
 * @public
 */
export interface GetNftsByWalletRequest {
  /** A list of wallet addresses to query. */
  addresses: PortfolioAddress[];

  /** If set to true, returns metadata. */
  withMetadata: boolean;

  /** Optional. The cursor that points to the current set of results. */
  pageKey?: string;

  /** Optional. Sets the number of items per page. */
  pageSize?: number;
}

/**
 * The response type of {@link PortfolioNamespace.getNftsByWallet}.
 *
 * @public
 */
export interface GetNftsByWalletResponse {
  data: {
    /** An array of NFTs owned by the wallet address, each including metadata and the network it resides on. */
    ownedNfts: Array<Nft & { network: Network }>;

    /** Total number of NFTs (distinct tokenIds) owned by the given address. */
    totalCount: number;

    /** A string key used for paginating through the NFT list, if more results are available. */
    pageKey: string;
  };
}

/**
 * The request fields of {@link PortfolioNamespace.getNftCollectionsByWallet}.
 *
 * @public
 */
export interface GetNftCollectionsByWalletRequest {
  /** A list of wallet addresses to query. */
  addresses: PortfolioAddress[];

  /** If set to true, returns metadata. */
  withMetadata: boolean;

  /** Optional. The cursor that points to the current set of results. */
  pageKey?: string;

  /** Optional. Sets the number of items per page. */
  pageSize?: number;
}

/**
 * The response type of {@link PortfolioNamespace.getNftCollectionsByWallet}.
 *
 * @public
 */
export interface GetNftCollectionsByWalletResponse {
  data: {
    /** Array of objects representing the NFT contracts held by the address. */
    contracts: Array<{
      /** An array of contract metadata for NFTs. {@link Contract} */
      contract: Contract[];

      /** The network on which the NFT contract resides. {@link Network} */
      network: Network;

      /** The wallet address holding the NFTs. */
      address: string;
    }>;
  };
}

/**
 * The request fields of {@link PortfolioNamespace.getTransactionsByWallet}.
 *
 * @public
 */
export interface GetTransactionsByWalletRequest {
  /** A list of wallet addresses to query. */
  addresses: PortfolioAddress[];

  /** Optional. The cursor that points to the previous set of results. */
  before?: string;

  /** Optional. The cursor that points to the end of the current set of results. */
  after?: string;

  /** Optional. Sets the maximum number of items per page (Max: 100). */
  limit?: number;
}

/**
 * The response type of {@link PortfolioNamespace.getTransactionsByWallet}.
 *
 * @public
 */
export interface GetTransactionsByWalletResponse {
  /** The cursor that points to the previous set of results. */
  before?: string;

  /** The cursor that points to the end of the current set of results. */
  after?: string;

  /** Total count of the response items. */
  totalCount?: number;

  /** List of transactions by address. {@link TransactionReceipt} */
  transactions: TransactionReceipt[];
}
