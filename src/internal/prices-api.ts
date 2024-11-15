import { AlchemyConfig } from '../api/alchemy-config';
import {
  GetTokenPriceByAddressResponse,
  GetTokenPriceBySymbolRequest,
  GetTokenPriceBySymbolResponse,
  HistoricalPriceByAddressResponse,
  HistoricalPriceBySymbolResponse,
  HistoricalPriceInterval,
  TokenAddressRequest
} from '../types/prices-types';
import { Network } from '../types/types';
import { AlchemyApiType } from '../util/const';
import { nullsToUndefined } from '../util/util';
import { requestHttpWithBackoff } from './dispatch';

const PRICES_BASE_URL = 'https://api.g.alchemy.com/prices/v1/alch-demo';

export async function getTokenPriceByAddress(
  config: AlchemyConfig,
  addresses: TokenAddressRequest[],
  srcMethod = 'getTokenPriceByAddress'
): Promise<GetTokenPriceByAddressResponse> {
  const response = await requestHttpWithBackoff<
    {},
    GetTokenPriceByAddressResponse
  >(
    config,
    AlchemyApiType.PRICES,
    'tokens/by-address',
    srcMethod,
    {},
    {
      method: 'POST',
      data: { addresses },
      baseURL: PRICES_BASE_URL
    }
  );
  return nullsToUndefined<GetTokenPriceByAddressResponse>(response);
}

export async function getTokenPriceBySymbol(
  config: AlchemyConfig,
  symbols: string[],
  srcMethod = 'getTokenPriceBySymbol'
): Promise<GetTokenPriceBySymbolResponse> {
  const response = await requestHttpWithBackoff<
    GetTokenPriceBySymbolRequest,
    GetTokenPriceBySymbolResponse
  >(
    config,
    AlchemyApiType.PRICES,
    'tokens/by-symbol',
    srcMethod,
    {
      symbols
    },
    {
      // We need to serialize the symbols array as URLSearchParams since the
      // Alchemy API expects a query parameter for each symbol. The axios default
      // serializer will not work here because the symbols array is an array of
      // strings.
      // Axios default encoding: ?symbols[]=AAVE&symbols[]=UNI
      // Alchemy requires: ?symbols=AAVE&symbols=UNI
      paramsSerializer: params => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          value.forEach((v: string) => searchParams.append(key, v));
        });
        return searchParams.toString();
      }
    }
  );
  return nullsToUndefined<GetTokenPriceBySymbolResponse>(response);
}

export async function getHistoricalPriceBySymbol(
  config: AlchemyConfig,
  symbol: string,
  startTime: string | number,
  endTime: string | number,
  interval: HistoricalPriceInterval,
  srcMethod = 'getHistoricalPriceBySymbol'
): Promise<HistoricalPriceBySymbolResponse> {
  const response = await requestHttpWithBackoff<
    {},
    HistoricalPriceBySymbolResponse
  >(
    config,
    AlchemyApiType.PRICES,
    'tokens/historical',
    srcMethod,
    {},
    {
      method: 'POST',
      data: {
        symbol,
        startTime,
        endTime,
        interval
      },
      baseURL: PRICES_BASE_URL
    }
  );
  return nullsToUndefined<HistoricalPriceBySymbolResponse>(response);
}

export async function getHistoricalPriceByAddress(
  config: AlchemyConfig,
  network: Network,
  address: string,
  startTime: string | number,
  endTime: string | number,
  interval: HistoricalPriceInterval,
  srcMethod = 'getHistoricalPriceByAddress'
): Promise<HistoricalPriceByAddressResponse> {
  const response = await requestHttpWithBackoff<
    {},
    HistoricalPriceByAddressResponse
  >(
    config,
    AlchemyApiType.PRICES,
    'tokens/historical',
    srcMethod,
    {},
    {
      method: 'POST',
      data: {
        network,
        address,
        startTime,
        endTime,
        interval
      },
      baseURL: PRICES_BASE_URL
    }
  );
  return nullsToUndefined<HistoricalPriceByAddressResponse>(response);
}
