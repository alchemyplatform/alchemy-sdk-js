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
 * @param addresses - A list of {@link PortfolioAddress}
 * @param withMetadata - Boolean. If set to true, returns metadata.
 * @param withPrices - Boolean. If set to true, returns token prices.
 * @param includeNativeTokens - Boolean. Whether to include each chain’s native
 *                                       token in the response (e.g. ETH on Ethereum)
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
 * @param addresses - A list of {@link PortfolioAddress}
 * @param includeNativeTokens - Boolean. Whether to include each chain’s native
 *                                       token in the response (e.g. ETH on Ethereum)
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
 * @param addresses - A list of {@link PortfolioAddress}
 * @param withMetadata - Boolean. If set to true, returns metadata.
 * @param pageKey - Optional. The cursor that points to the current set of results.
 * @param pageSize - Optional. Sets the number of items per page.
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
 * @param addresses - A list of {@link PortfolioAddress}
 * @param withMetadata - Boolean. If set to true, returns metadata.
 * @param pageKey - Optional. The cursor that points to the current set of results.
 * @param pageSize - Optional. Sets the number of items per page.
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
 * @param addresses - A list of {@link PortfolioAddress}
 * @param before - Optional. The cursor that points to the previous set of results.
 * @param after - Optional. The cursor that points to the end of the current set of results.
 * @param limit - Optional. Sets the maximum number of items per page (Max: 100)
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
