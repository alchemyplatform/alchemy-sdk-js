import {
  getHistoricalPriceByAddress,
  getHistoricalPriceBySymbol,
  getTokenPriceByAddress,
  getTokenPriceBySymbol
} from '../internal/prices-api';
import {
  GetTokenPriceByAddressResponse,
  GetTokenPriceBySymbolResponse,
  HistoricalPriceByAddressResponse,
  HistoricalPriceBySymbolResponse,
  HistoricalPriceInterval,
  TokenAddressRequest
} from '../types/prices-types';
import { Network } from '../types/types';
import { AlchemyConfig } from './alchemy-config';

/**
 * The Prices namespace contains methods for getting token price data.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the prices namespace
 * via `alchemy.prices`.
 */
export class PricesNamespace {
  /** @internal */
  constructor(private readonly config: AlchemyConfig) {}

  /**
   * Get token prices by network and contract address pairs.
   *
   * @param addresses - Array of network/address pairs to get prices for
   * @returns Promise containing token price data
   * @public
   */
  getTokenPriceByAddress(
    addresses: TokenAddressRequest[]
  ): Promise<GetTokenPriceByAddressResponse> {
    return getTokenPriceByAddress(this.config, addresses);
  }

  /**
   * Get token prices by token symbol.
   *
   * @param symbols - Array of token symbols to get prices for
   * @returns Promise containing token price data
   * @public
   */
  getTokenPriceBySymbol(
    symbols: string[]
  ): Promise<GetTokenPriceBySymbolResponse> {
    return getTokenPriceBySymbol(this.config, symbols);
  }

  /**
   * Get historical token prices by token symbol.
   *
   * @param symbol - The token symbol to get historical prices for
   * @param startTime - Start time in ISO-8601 string format or Unix timestamp in seconds
   * @param endTime - End time in ISO-8601 string format or Unix timestamp in seconds
   * @param interval - Time interval between data points
   * @returns Promise containing historical token price data
   * @public
   */
  getHistoricalPriceBySymbol(
    symbol: string,
    startTime: string | number,
    endTime: string | number,
    interval: HistoricalPriceInterval
  ): Promise<HistoricalPriceBySymbolResponse> {
    return getHistoricalPriceBySymbol(
      this.config,
      symbol,
      startTime,
      endTime,
      interval
    );
  }

  /**
   * Get historical token prices by network and contract address.
   *
   * @param network - The network where the token contract is deployed
   * @param address - The token contract address
   * @param startTime - Start time in ISO-8601 string format or Unix timestamp in seconds
   * @param endTime - End time in ISO-8601 string format or Unix timestamp in seconds
   * @param interval - Time interval between data points
   * @returns Promise containing historical token price data
   * @public
   */
  getHistoricalPriceByAddress(
    network: Network,
    address: string,
    startTime: string | number,
    endTime: string | number,
    interval: HistoricalPriceInterval
  ): Promise<HistoricalPriceByAddressResponse> {
    return getHistoricalPriceByAddress(
      this.config,
      network,
      address,
      startTime,
      endTime,
      interval
    );
  }
}
