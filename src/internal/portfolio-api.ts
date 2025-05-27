import { AlchemyConfig } from '../api/alchemy-config';
import {
  GetNftCollectionsByWalletRequest,
  GetNftCollectionsByWalletResponse,
  GetNftsByWalletRequest,
  GetNftsByWalletResponse,
  GetTokenBalancesByWalletRequest,
  GetTokenBalancesByWalletResponse,
  GetTokensByWalletRequest,
  GetTokensByWalletResponse,
  GetTransactionsByWalletRequest,
  GetTransactionsByWalletResponse,
  PortfolioAddress
} from '../types/portfolio-types';
import { AlchemyApiType } from '../util/const';
import { nullsToUndefined } from '../util/util';
import { requestHttpWithBackoff } from './dispatch';

export async function getTokensByWallet(
  config: AlchemyConfig,
  addresses: PortfolioAddress[],
  withMetadata = true,
  withPrices = true,
  includeNativeTokens = true,
  srcMethod = 'getTokensByWallet'
): Promise<GetTokensByWalletResponse> {
  const data: GetTokensByWalletRequest = {
    addresses,
    withMetadata,
    withPrices,
    includeNativeTokens
  };

  const response = await requestHttpWithBackoff<{}, GetTokensByWalletResponse>(
    config,
    AlchemyApiType.PORTFOLIO,
    'assets/tokens/by-address',
    srcMethod,
    {},
    {
      data,
      method: 'POST'
    }
  );
  return nullsToUndefined<GetTokensByWalletResponse>(response);
}

export async function getTokenBalancesByWallet(
  config: AlchemyConfig,
  addresses: PortfolioAddress[],
  includeNativeTokens = true,
  srcMethod = 'getTokenBalancesByWallet'
): Promise<GetTokenBalancesByWalletResponse> {
  const data: GetTokenBalancesByWalletRequest = {
    addresses,
    includeNativeTokens
  };

  const response = await requestHttpWithBackoff<
    {},
    GetTokenBalancesByWalletResponse
  >(
    config,
    AlchemyApiType.PORTFOLIO,
    'assets/tokens/balances/by-address',
    srcMethod,
    {},
    {
      method: 'POST',
      data
    }
  );
  return nullsToUndefined<GetTokenBalancesByWalletResponse>(response);
}

export async function getNftsByWallet(
  config: AlchemyConfig,
  addresses: PortfolioAddress[],
  withMetadata = true,
  pageKey: string | undefined = undefined,
  pageSize: number | undefined = undefined,
  srcMethod = 'getNftsByWallet'
): Promise<GetNftsByWalletResponse> {
  const data: GetNftsByWalletRequest = {
    addresses,
    withMetadata,
    pageKey,
    pageSize
  };

  const response = await requestHttpWithBackoff<{}, GetNftsByWalletResponse>(
    config,
    AlchemyApiType.PORTFOLIO,
    'assets/nfts/by-address',
    srcMethod,
    {},
    {
      method: 'POST',
      data
    }
  );
  return nullsToUndefined<GetNftsByWalletResponse>(response);
}

export async function getNftCollectionsByWallet(
  config: AlchemyConfig,
  addresses: PortfolioAddress[],
  withMetadata = true,
  pageKey: string | undefined = undefined,
  pageSize: number | undefined = undefined,
  srcMethod = 'getNftCollectionsByWallet'
): Promise<GetNftCollectionsByWalletResponse> {
  const data: GetNftCollectionsByWalletRequest = {
    addresses,
    pageKey,
    pageSize,
    withMetadata
  };

  const response = await requestHttpWithBackoff<
    {},
    GetNftCollectionsByWalletResponse
  >(
    config,
    AlchemyApiType.PORTFOLIO,
    'assets/nfts/contracts/by-address',
    srcMethod,
    {},
    {
      method: 'POST',
      data
    }
  );
  return nullsToUndefined<GetNftCollectionsByWalletResponse>(response);
}

export async function getTransactionsByWallet(
  config: AlchemyConfig,
  addresses: PortfolioAddress[],
  before: string | undefined = undefined,
  after: string | undefined = undefined,
  limit: number | undefined = undefined,
  srcMethod = 'getTransactionsByWallet'
): Promise<GetTransactionsByWalletResponse> {
  const data: GetTransactionsByWalletRequest = {
    addresses,
    before,
    after,
    limit
  };

  const response = await requestHttpWithBackoff<
    {},
    GetTransactionsByWalletResponse
  >(
    config,
    AlchemyApiType.PORTFOLIO,
    'transactions/history/by-address',
    srcMethod,
    {},
    {
      method: 'POST',
      data
    }
  );
  return nullsToUndefined<GetTransactionsByWalletResponse>(response);
}
