import type { Log } from '@ethersproject/abstract-provider';
import { AlchemyConfig } from '../api/alchemy-config';
import { AssetTransfersParams, AssetTransfersResponse, AssetTransfersWithMetadataParams, AssetTransfersWithMetadataResponse, Filter, FilterByBlockHash, TransactionReceiptsParams, TransactionReceiptsResponse } from '../types/types';
/**
 * This file contains the underlying implementations for exposed API surface in
 * the {@link CoreNamespace}. By moving the methods out into a separate file,
 * other namespaces can access these methods without depending on the entire
 * CoreNamespace, or override the `srcMethod` param used for logging.
 */
/**
 * Gets the asset transfers for the provided params.
 */
export declare function getAssetTransfers(config: AlchemyConfig, params: AssetTransfersWithMetadataParams | AssetTransfersParams, srcMethod?: string): Promise<AssetTransfersResponse | AssetTransfersWithMetadataResponse>;
export declare function getTransactionReceipts(config: AlchemyConfig, params: TransactionReceiptsParams, srcMethod?: string): Promise<TransactionReceiptsResponse>;
/**
 * This method is based on the ethers implementation of getLogs, but is expanded
 * to support specifying an address array in the filter.
 *
 * The main modifications made to support an address array are:
 * - Custom `getFilter()` method that supports an address array
 * - Use of `arrayOf()` formatter to format the logs to avoid the `Formatter` import.
 * - Use of `provider.send()` to avoid formatting logic in `provider.perform()`.
 */
export declare function getLogs(config: AlchemyConfig, filter: Filter | FilterByBlockHash | Promise<Filter | FilterByBlockHash>): Promise<Array<Log>>;
