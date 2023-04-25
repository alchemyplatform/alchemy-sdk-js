import type { Log } from 'ethers';
import { resolveProperties } from 'ethers';

import { AlchemyConfig } from '../api/alchemy-config';
import { toHex } from '../api/util';
import {
  AssetTransfersParams,
  AssetTransfersResponse,
  AssetTransfersWithMetadataParams,
  AssetTransfersWithMetadataResponse,
  Filter,
  FilterByBlockHash,
  TransactionReceiptsParams,
  TransactionReceiptsResponse
} from '../types/types';
import { formatBlock } from '../util/util';

/**
 * This file contains the underlying implementations for exposed API surface in
 * the {@link CoreNamespace}. By moving the methods out into a separate file,
 * other namespaces can access these methods without depending on the entire
 * CoreNamespace, or override the `srcMethod` param used for logging.
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
  return provider.send(
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

export async function getTransactionReceipts(
  config: AlchemyConfig,
  params: TransactionReceiptsParams,
  srcMethod = 'getTransactionReceipts'
): Promise<TransactionReceiptsResponse> {
  const provider = await config.getProvider();
  return provider.send('alchemy_getTransactionReceipts', [params], srcMethod);
}

/**
 * This method is based on the ethers implementation of getLogs, but is expanded
 * to support specifying an address array in the filter.
 *
 * The main modifications made to support an address array are:
 * - Custom `getFilter()` method that supports an address array
 * - Use of `arrayOf()` formatter to format the logs to avoid the `Formatter` import.
 * - Use of `provider.send()` to avoid formatting logic in `provider.perform()`.
 */
export async function getLogs(
  config: AlchemyConfig,
  filter: Filter | FilterByBlockHash | Promise<Filter | FilterByBlockHash>
): Promise<Array<Log>> {
  const provider = await config.getProvider();
  await provider.getNetwork();
  const params = await resolveProperties({
    filter: getFilter(config, filter)
  });

  const logs: Array<Log> = await provider.send('eth_getLogs', [params.filter]);
  logs.forEach(log => {
    if (log.removed == null) {
      (log as any).removed = false;
    }
  });

  // TODO(v6): format log with ethers formatter.
  return logs;
}

/**
 * This method is based on and copied from the ethers implementation of
 * `JsonRpcProvider._getFilter()`, but is extended to support an address array.
 *
 * This implementation is a hacky way to get around the ethers formatter. The
 * formatter is used to check the types of the `filter` params, but ethers does
 * not allow an array in the `address` field. To preserve the ethers formatter
 * on the other fields, we use the formatter to check the types of those other
 * fields, and then manually check the `address` field last.
 */
async function getFilter(
  config: AlchemyConfig,
  filter: Filter | FilterByBlockHash | Promise<Filter | FilterByBlockHash>
): Promise<Filter | FilterByBlockHash> {
  // START MODIFIED CODE
  const provider = await config.getProvider();
  const resolvedFilter = await filter;
  let result: any = {};
  // END MODIFIED CODE

  ['blockHash', 'topics'].forEach(key => {
    if ((resolvedFilter as any)[key] == null) {
      return;
    }
    result[key] = (resolvedFilter as any)[key];
  });

  ['fromBlock', 'toBlock'].forEach(key => {
    if ((resolvedFilter as any)[key] == null) {
      return;
    }
    result[key] = provider._getBlockTag((resolvedFilter as any)[key]);
  });

  // BEGIN MODIFIED CODE
  // Format the `result` object using the ethers formatter without the `address`
  // field.
  result = provider._getFilter(await resolveProperties(result));

  // After formatting the other fields, manually format the `address` field
  // before adding it to the `result` object.
  if (Array.isArray(resolvedFilter.address)) {
    result.address = await Promise.all(
      resolvedFilter.address.map(async (address: string) =>
        provider._getAddress(address)
      )
    );
  } else if (resolvedFilter.address != null) {
    result.address = await provider._getAddress(resolvedFilter.address);
  }

  return result;
  // END MODIFIED CODE
}

/**
 * DO NOT MODIFY.
 *
 * This function is directly copied over from ethers implementation of
 * `Formatter.arrayOf()`. It is copied here to avoid having to import the
 * `Formatter` class or `FormatterFunc` type from ethers, that are not part of
 * the default export.
 *
 * This function returns a function that applies the formatter to an array of
 * values, and is used to format the logs returned by `getLogs()`.
 */
// function arrayOf(format: any): any {
//   return function (array: any): Array<any> {
//     if (!Array.isArray(array)) {
//       throw new Error('not an array');
//     }
//     return array.map(i => format(i));
//   };
// }
