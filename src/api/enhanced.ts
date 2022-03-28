import {
  AssetTransfersParams,
  AssetTransfersResponse,
  TokenAllowanceParams,
  TokenAllowanceResponse,
  TokenBalancesResponse,
  TokenMetadataResponse,
  TransactionReceiptsParams,
  TransactionReceiptsResponse
} from '../types/types';
import { formatBlock, toHex } from '../util/util';
import { Alchemy } from './alchemy';
import { DEFAULT_CONTRACT_ADDRESSES } from '../util/const';

/**
 * @public
 */
export function getTokenAllowance(
  alchemy: Alchemy,
  params: TokenAllowanceParams
): Promise<TokenAllowanceResponse> {
  return alchemy.send('alchemy_getTokenAllowance', [params]);
}

/**
 * @public
 */
export function getTokenBalances(
  alchemy: Alchemy,
  address: string,
  contractAddresses?: string[]
): Promise<TokenBalancesResponse> {
  return alchemy.send('alchemy_getTokenBalances', [
    address,
    contractAddresses || DEFAULT_CONTRACT_ADDRESSES
  ]);
}

/**
 * @public
 */
export function getTokenMetadata(
  alchemy: Alchemy,
  address: string
): Promise<TokenMetadataResponse> {
  return alchemy.send('alchemy_getTokenMetadata', [address]);
}

/**
 * @public
 */
export function getAssetTransfers(
  alchemy: Alchemy,
  params: AssetTransfersParams
): Promise<AssetTransfersResponse> {
  return alchemy.send('alchemy_getAssetTransfers', [
    {
      ...params,
      fromBlock:
        params.fromBlock != null ? formatBlock(params.fromBlock) : undefined,
      toBlock: params.toBlock != null ? formatBlock(params.toBlock) : undefined,
      maxCount: params.maxCount != null ? toHex(params.maxCount) : undefined
    }
  ]);
}

/**
 * @public
 */
export function getTransactionReceipts(
  alchemy: Alchemy,
  params: TransactionReceiptsParams
): Promise<TransactionReceiptsResponse> {
  return alchemy.send('alchemy_getTransactionReceipts', [params]);
}
