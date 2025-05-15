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
  srcMethod = 'getTokensByAddress'
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
  srcMethod = 'getTokenBalancesByAddress'
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

export async function getNFTsByWallet(
  config: AlchemyConfig,
  addresses: PortfolioAddress[],
  withMetadata = true,
  pageKey: string | undefined = undefined,
  pageSize: number | undefined = undefined,
  srcMethod = 'getNFTsByAddress'
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

export async function getNFTCollectionsByWallet(
  config: AlchemyConfig,
  addresses: PortfolioAddress[],
  withMetadata = true,
  pageKey: string | undefined = undefined,
  pageSize: number | undefined = undefined,
  srcMethod = 'getNFTCollectionsByAddress'
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
  srcMethod = 'getTransactionsByAddress'
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
