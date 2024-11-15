import { Network } from './types';

/**
 * The parameter field of {@link PricesNamespace.getTokenPriceByAddress}.
 * Represents a network and address pair for getting token prices.
 *
 * @public
 */
export interface TokenAddressRequest {
  /** The network to get prices for. */
  network: Network;
  /** The contract address to get prices for. */
  address: string;
}

/**
 * The parameter field of {@link PricesNamespace.getTokenPriceBySymbol}.
 * Contains the list of token symbols to get prices for.
 *
 * @public
 */
export interface GetTokenPriceBySymbolRequest {
  /** The token symbols to get prices for. */
  symbols: string[];
}

/**
 * The response type of {@link PricesNamespace.getTokenPriceByAddress}.
 * Contains an array of token price results for each requested address.
 *
 * @public
 */
export interface GetTokenPriceByAddressResponse {
  /** The token price data for each requested address. */
  data: TokenPriceByAddressResult[];
}

/**
 * The response type of {@link PricesNamespace.getTokenPriceBySymbol}.
 * Contains an array of token price results for each requested symbol.
 *
 * @public
 */
export interface GetTokenPriceBySymbolResponse {
  /** The token price data for each requested symbol. */
  data: TokenPriceBySymbolResult[];
}

/**
 * Represents a token's price information at a specific point in time.
 *
 * @public
 */
export interface TokenPrice {
  /** The currency the price is denominated in (e.g. 'usd'). */
  currency: string;
  /** The price value as a string to preserve precision. */
  value: string;
  /** ISO timestamp of when the price was last updated. */
  lastUpdatedAt: string;
}

/**
 * Error information returned when a token price request fails.
 *
 * @public
 */
export interface TokenPriceError {
  /** The error message describing why the request failed. */
  message: string;
}

/**
 * The result object returned for each address in a
 * {@link GetTokenPriceByAddressResponse}.
 *
 * @public
 */
export interface TokenPriceByAddressResult {
  /** The network the token is on. */
  network: string;
  /** The token's contract address. */
  address: string;
  /** Array of price data for the token. Empty if there was an error. */
  prices: TokenPrice[];
  /** Error information if the request failed, null otherwise. */
  error: TokenPriceError | null;
}

/**
 * The result object returned for each symbol in a
 * {@link GetTokenPriceBySymbolResponse}.
 *
 * @public
 */
export interface TokenPriceBySymbolResult {
  /** The token symbol that was queried. */
  symbol: string;
  /** Array of price data for the token. Empty if there was an error. */
  prices: TokenPrice[];
  /** Error information if the request failed, null otherwise. */
  error: TokenPriceError | null;
}

/**
 * Valid time intervals for historical price data.
 *
 * @public
 */
export enum HistoricalPriceInterval {
  /** 5-minute intervals */
  FIVE_MINUTE = '5m',
  /** 1-hour intervals */
  ONE_HOUR = '1h',
  /** 1-day intervals */
  ONE_DAY = '1d'
}

/**
 * Historical price data point.
 *
 * @public
 */
export interface HistoricalPriceDataPoint {
  /** Price value as a string to preserve precision */
  value: string;
  /** ISO timestamp for the price data point */
  timestamp: string;
}

/**
 * Base interface for historical price responses.
 *
 * @public
 */
interface BaseHistoricalPriceResponse {
  /** Currency the prices are denominated in */
  currency: string;
  /** Array of historical price data points */
  data: HistoricalPriceDataPoint[];
}

/**
 * Response type for historical prices by symbol requests.
 *
 * @public
 */
export interface HistoricalPriceBySymbolResponse
  extends BaseHistoricalPriceResponse {
  /** Token symbol that was queried */
  symbol: string;
}

/**
 * Response type for historical prices by network/address requests.
 *
 * @public
 */
export interface HistoricalPriceByAddressResponse
  extends BaseHistoricalPriceResponse {
  /** Network that was queried */
  network: string;
  /** Contract address that was queried */
  address: string;
}

/**
 * Type helper to infer the correct response type based on the request type.
 *
 * @public
 */
export type HistoricalPriceResponse =
  | HistoricalPriceBySymbolResponse
  | HistoricalPriceByAddressResponse;
