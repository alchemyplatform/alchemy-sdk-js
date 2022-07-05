// import {
//   AssetTransfersParams,
//   AssetTransfersResponse,
//   TokenBalancesResponse,
//   TokenMetadataResponse,
//   TransactionReceiptsParams,
//   TransactionReceiptsResponse
// } from '../types/types';
// import { formatBlock } from '../util/util';
// import { Alchemy } from './alchemy';
// import { DEFAULT_CONTRACT_ADDRESSES } from '../util/const';
// import { toHex } from './util';

// /** @public */
// export function getTokenBalances(
//   alchemy: Alchemy,
//   address: string,
//   contractAddresses?: string[]
// ): Promise<TokenBalancesResponse> {
//   if (contractAddresses && contractAddresses.length > 1500) {
//     throw new Error(
//       'You cannot pass in more than 1500 contract addresses to getTokenBalances()'
//     );
//   }

//   return alchemy
//     .getProvider()
//     .send('alchemy_getTokenBalances', [
//       address,
//       contractAddresses || DEFAULT_CONTRACT_ADDRESSES
//     ]);
// }

// /** @public */
// export function getTokenMetadata(
//   alchemy: Alchemy,
//   address: string
// ): Promise<TokenMetadataResponse> {
//   return alchemy.getProvider().send('alchemy_getTokenMetadata', [address]);
// }

// /** @public */
// export function getAssetTransfers(
//   alchemy: Alchemy,
//   params: AssetTransfersParams
// ): Promise<AssetTransfersResponse> {
//   return alchemy.getProvider().send('alchemy_getAssetTransfers', [
//     {
//       ...params,
//       fromBlock:
//         params.fromBlock != null ? formatBlock(params.fromBlock) : undefined,
//       toBlock: params.toBlock != null ? formatBlock(params.toBlock) : undefined,
//       maxCount: params.maxCount != null ? toHex(params.maxCount) : undefined
//     }
//   ]);
// }

// /** @public */
// export function getTransactionReceipts(
//   alchemy: Alchemy,
//   params: TransactionReceiptsParams
// ): Promise<TransactionReceiptsResponse> {
//   return alchemy.getProvider().send('alchemy_getTransactionReceipts', [params]);
// }
