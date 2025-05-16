import { Contract } from '../api/alchemy-contract';
import { JsonRpcRequest } from '../internal/internal-types';
import { Nft } from './nft-types';
import { TokenPriceByAddressResult } from './prices-types';
import { Network, TransactionReceipt } from './types';

/**
 * The parameter field of {@link PortfolioNamespace.getTokenPriceByAddress}.
 * Represents a network and address pair for getting porfolio data.
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
 * The request fields of {@link PortfolioNamespace.getTokenPriceByAddress}.
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
 * The response type of {@link PortfolioNamespace.getTokenPriceByAddress}.
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
 * The request fields of {@link PortfolioNamespace.nftsByWallet}.
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
 * The response type of {@link PortfolioNamespace.nftsByWallet}.
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
 * The request fields of {@link PortfolioNamespace.nftCollectionsByWallet}.
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
 * The response type of {@link PortfolioNamespace.nftCollectionsByWallet}.
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
 * The request fields of {@link PortfolioNamespace.transactionsByWallet}.
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
 * The response type of {@link PortfolioNamespace.transactionsByWallet}.
 *
 * @public
 */
export interface GetTransactionsByWalletResponse {
  before?: string;
  after?: string;
  totalCount?: number;
  transactions: TransactionReceipt[];
}
