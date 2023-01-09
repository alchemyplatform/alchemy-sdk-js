import { AlchemyConfig } from '../api/alchemy-config';
import { toHex } from '../api/util';
import {
  AssetTransfersParams,
  AssetTransfersResponse,
  AssetTransfersWithMetadataParams,
  AssetTransfersWithMetadataResponse
} from '../types/types';
import { formatBlock } from '../util/util';

/**
 * This file contains the underlying implementations for exposed API surface in
 * the {@link CoreNamespace}. By moving the methods out into a separate file,
 * other namespaces can access these methods without depending on the entire
 * CoreNamespace.
 */

/**
 * Gets the asset transfers for the provided params.
 */
export async function getAssetTransfers(
  config: AlchemyConfig,
  params: AssetTransfersWithMetadataParams | AssetTransfersParams,
  srcMethod = 'getAssetTransfers'
): Promise<AssetTransfersResponse | AssetTransfersWithMetadataResponse> {
  const provider = await config.getProvider();
  if (params.fromAddress) {
    params.fromAddress = await provider._getAddress(params.fromAddress);
  }
  if (params.toAddress) {
    params.toAddress = await provider._getAddress(params.toAddress);
  }
  return provider._send(
    'alchemy_getAssetTransfers',
    [
      {
        ...params,
        fromBlock:
          params.fromBlock != null ? formatBlock(params.fromBlock) : undefined,
        toBlock:
          params.toBlock != null ? formatBlock(params.toBlock) : undefined,
        maxCount: params.maxCount != null ? toHex(params.maxCount) : undefined
      }
    ],
    srcMethod
  );
}
