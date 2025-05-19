import { Contract } from '../api/alchemy-contract';
import { JsonRpcRequest } from '../internal/internal-types';
import { Nft } from './nft-types';
import { TokenPriceByAddressResult } from './prices-types';
import { Network, TransactionReceipt } from './types';

/**
 * Used by {@link PortfolioNamespace} to represent an address and a list of
 * networks to fetch portfolio data about
 *
 * @param networks - Array of network identifiers (e.g., eth-mainnet).
 * @param address - Wallet address.
 *
 * @public
 */
export interface PortfolioAddress {
  /** Network identifiers (e.g., eth-mainnet). */
  networks: Network[];
  /** Wallet address */
  address: string;
}

/**
 * The request fields of {@link PortfolioNamespace.getTokensByWallet}.
 *
 * @public
 */
export interface GetTokensByWalletRequest {
  addresses: PortfolioAddress[];
  withMetadata: boolean;
  withPrices: boolean;
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
      network: Network;
      address: string;
      tokenBalance: string;
      tokenMetadata?: JsonRpcRequest;
      tokenPrices?: TokenPriceByAddressResult;
    }>;
    pageKey: string;
  };
}

/**
 * The request fields of {@link PortfolioNamespace.getTokenBalancesByWallet}.
 *
 * @public
 */
export interface GetTokenBalancesByWalletRequest {
  addresses: PortfolioAddress[];
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
      network: Network;
      address: string;
      tokenAddress: string;
      tokenBalance: string;
    }>;
    pageKey: string;
  };
}

/**
 * The request fields of {@link PortfolioNamespace.getNftsByWallet}.
 *
 * @public
 */
export interface GetNftsByWalletRequest {
  addresses: PortfolioAddress[];
  withMetadata: boolean;
  pageKey?: string;
  pageSize?: number;
}

/**
 * The response type of {@link PortfolioNamespace.getNftsByWallet}.
 *
 * @public
 */
export interface GetNftsByWalletResponse {
  data: {
    ownedNfts: Array<Nft & { network: Network }>;
    totalCount: number;
    pageKey: string;
  };
}

/**
 * The request fields of {@link PortfolioNamespace.getNftCollectionsByWallet}.
 *
 * @public
 */
export interface GetNftCollectionsByWalletRequest {
  addresses: PortfolioAddress[];
  withMetadata: boolean;
  pageKey?: string;
  pageSize?: number;
}

/**
 * The response type of {@link PortfolioNamespace.getNftCollectionsByWallet}.
 *
 * @public
 */
export interface GetNftCollectionsByWalletResponse {
  data: {
    contracts: Array<{
      contract: Contract[];
      network: Network;
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
  addresses: PortfolioAddress[];
  before?: string;
  after?: string;
  limit?: number;
}

/**
 * The response type of {@link PortfolioNamespace.getTransactionsByWallet}.
 *
 * @public
 */
export interface GetTransactionsByWalletResponse {
  before?: string;
  after?: string;
  totalCount?: number;
  transactions: TransactionReceipt[];
}
