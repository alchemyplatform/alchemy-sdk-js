import {
  getNftCollectionsByWallet,
  getNftsByWallet,
  getTokenBalancesByWallet,
  getTokensByWallet,
  getTransactionsByWallet
} from '../internal/portfolio-api';
import { PortfolioAddress } from '../types/portfolio-types';
import { AlchemyConfig } from './alchemy-config';

/**
 * The Portfolio namespace contains methods for getting data needed to build a portfolio.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the portfolio namespace
 * via `alchemy.portfolio`.
 */
export class PortfolioNamespace {
  /** @internal */
  constructor(private readonly config: AlchemyConfig) {}

  /**
   * Fetches fungible tokens (native and ERC-20) for multiple wallet addresses
   * and networks.
   *
   * @param addresses - Array of network/address pairs
   *                    (limit 2 pairs, max 5 networks each).
   * @param withMetadata - Boolean. If set to true, returns metadata. Setting
   *                                this to false will reduce payload size and
   *                                may result in a faster API call.
   *                                (default: true)
   * @param withPrices - Boolean. If set to true, returns token prices. Setting
   *                              this to false will reduce payload size and may
   *                              result in a faster API call. (default: true)
   * @param includeNativeTokens - Boolean. Whether to include each chain’s
   *                                       native token in the response
   *                                       (e.g. ETH on Ethereum). The native
   *                                       token will have a null contract
   *                                       address. (default: true)
   *
   * @returns Promise containing a list of tokens with balances, prices, and
   *          metadata for each wallet/network combination.
   *
   * @public
   */
  getTokensByWallet(
    addresses: PortfolioAddress[],
    withMetadata = true,
    withPrices = true,
    includeNativeTokens = true
  ) {
    return getTokensByWallet(
      this.config,
      addresses,
      withMetadata,
      withPrices,
      includeNativeTokens
    );
  }

  /**
   * Fetches fungible tokens (native and ERC-20) for multiple wallet addresses and networks.
   *
   * @param addresses - Array of network/address pairs (limit 2 pairs, max 5 networks each).
   * @param includeNativeTokens - Boolean. Whether to include each chain’s native token in the response (e.g. ETH on Ethereum). The native token will have a null contract address. (default: true)   * @returns Promise containing a list of tokens with balances for each wallet/network combination
   * @public
   */
  getTokenBalancesByWallet(
    addresses: PortfolioAddress[],
    includeNativeTokens = true
  ) {
    return getTokenBalancesByWallet(
      this.config,
      addresses,
      includeNativeTokens
    );
  }

  /**
   * Fetches NFTs for multiple wallet addresses and networks.
   *
   * @param addresses - Array of network/address pairs to fetch NFTs for.
   * @param withMetadata - Boolean. If set to true, returns metadata. Setting this to false will reduce payload size and may result in a faster API call. (default: true)
   * @param pageKey - Optional. The cursor that points to the current set of results.
   * @param pageSize - Optional. Sets the number of items per page.
   * @returns Promise containing a list of NFTs and metadata for each wallet/network combination.
   *
   * @public
   */
  getNftsByWallet(
    addresses: PortfolioAddress[],
    withMetadata = true,
    pageKey?: string,
    pageSize?: number
  ) {
    return getNftsByWallet(
      this.config,
      addresses,
      withMetadata,
      pageKey,
      pageSize
    );
  }

  /**
   * Fetches NFT collections (contracts) for multiple wallet addresses and networks. Returns a list of
   * collections and metadata for each wallet/network combination.
   *
   * @param addresses - Array of address and networks pairs (limit 2 pairs, max 15 networks each).
   * @param withMetadata - Boolean. If set to true, returns metadata. (default: true)
   * @param pageKey - Optional. The cursor that points to the current set of results.
   * @param pageSize - Optional. Sets the number of items per page.
   * @returns Promise containing a list of NFT collections for each wallet/network combination.
   * @public
   */
  getNftCollectionsByWallet(
    addresses: PortfolioAddress[],
    withMetadata = true,
    pageKey?: string,
    pageSize?: number
  ) {
    return getNftCollectionsByWallet(
      this.config,
      addresses,
      withMetadata,
      pageKey,
      pageSize
    );
  }

  /**
   * Fetches all historical transactions (internal & external) for multiple wallet addresses and networks.
   *
   * @param addresses - Array of network/address pairs to fetch transactions for.
   * @param before - Optional. The cursor that points to the previous set of results.
   * @param after - Optional. The cursor that points to the end of the current set of results.
   * @param limit - Optional. Sets the maximum number of items per page (Max: 100)
   * @returns Promise containing a list of transaction objects with metadata and log information.
   *
   * @public
   */
  getTransactionsByWallet(
    addresses: PortfolioAddress[],
    before?: string,
    after?: string,
    limit?: number
  ) {
    return getTransactionsByWallet(
      this.config,
      addresses,
      before,
      after,
      limit
    );
  }
}
