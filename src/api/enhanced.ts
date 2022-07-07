import {
  AssetTransfersParams,
  AssetTransfersResponse,
  TokenBalancesResponse,
  TokenMetadataResponse,
  TransactionReceiptsParams,
  TransactionReceiptsResponse
} from '../types/types';
import { formatBlock } from '../util/util';
import { Alchemy } from './alchemy';
import { DEFAULT_CONTRACT_ADDRESSES } from '../util/const';
import { toHex } from './util';

/** @public */
export async function getTokenBalances(
  alchemy: Alchemy,
  address: string,
  contractAddresses?: string[]
): Promise<TokenBalancesResponse> {
  if (contractAddresses && contractAddresses.length > 1500) {
    throw new Error(
      'You cannot pass in more than 1500 contract addresses to getTokenBalances()'
    );
  }
  const provider = await alchemy.getProvider();

  return provider.send('alchemy_getTokenBalances', [
    address,
    contractAddresses || DEFAULT_CONTRACT_ADDRESSES
  ]);
}

/** @public */
export async function getTokenMetadata(
  alchemy: Alchemy,
  address: string
): Promise<TokenMetadataResponse> {
  const provider = await alchemy.getProvider();

  return provider.send('alchemy_getTokenMetadata', [address]);
}

/** @public */
export async function getAssetTransfers(
  alchemy: Alchemy,
  params: AssetTransfersParams
): Promise<AssetTransfersResponse> {
  const provider = await alchemy.getProvider();
  return provider.send('alchemy_getAssetTransfers', [
    {
      ...params,
      fromBlock:
        params.fromBlock != null ? formatBlock(params.fromBlock) : undefined,
      toBlock: params.toBlock != null ? formatBlock(params.toBlock) : undefined,
      maxCount: params.maxCount != null ? toHex(params.maxCount) : undefined
    }
  ]);
}

/** @public */
export async function getTransactionReceipts(
  alchemy: Alchemy,
  params: TransactionReceiptsParams
): Promise<TransactionReceiptsResponse> {
  const provider = await alchemy.getProvider();
  return provider.send('alchemy_getTransactionReceipts', [params]);
}
