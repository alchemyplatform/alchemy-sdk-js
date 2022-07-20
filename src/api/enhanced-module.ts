import { AlchemyConfig } from './alchemy-config';
import {
  AssetTransfersParams,
  AssetTransfersResponse,
  DeployResult,
  TokenBalancesResponse,
  TokenMetadataResponse, TransactionReceiptsParams, TransactionReceiptsResponse
} from '../types/types';
import { DEFAULT_CONTRACT_ADDRESSES, ETH_NULL_VALUE } from '../util/const';
import { formatBlock } from '../util/util';
import { toHex } from './util';

export class EnhancedModule {
  constructor(private readonly config: AlchemyConfig) {}

  /**
   * Finds the address that deployed the provided contract and block number it
   * was deployed in.
   *
   * NOTE: This method performs a binary search across all blocks since genesis
   * and can take a long time to complete. This method is a convenience method
   * that will eventually be replaced by a single call to an Alchemy endpoint
   * with this information cached.
   *
   * @param contractAddress - The contract address to find the deployer for.
   * @beta
   */
  async findContractDeployer(contractAddress: string): Promise<DeployResult> {
    const provider = await this.config.getProvider();
    const currentBlockNum = await provider.getBlockNumber();
    if (
      (await provider.getCode(contractAddress, currentBlockNum)) ===
      ETH_NULL_VALUE
    ) {
      throw new Error(`Contract '${contractAddress}' does not exist`);
    }

    // Binary search for the block number that the contract was deployed in.
    const firstBlock = await binarySearchFirstBlock(
      0,
      currentBlockNum + 1,
      contractAddress,
      this.config
    );

    // Find the first transaction in the block that matches the provided address.
    const txReceipts = await this.getTransactionReceipts({
      blockNumber: toHex(firstBlock)
    });
    const matchingReceipt = txReceipts.receipts?.find(
      receipt => receipt.contractAddress === contractAddress.toLowerCase()
    );
    return {
      deployerAddress: matchingReceipt?.from,
      blockNumber: firstBlock
    };
  }

  /**
   * Returns the token balances for a specific owner address given a list of contracts.
   *
   * @param address The owner address to get the token balances for.
   * @param contractAddresses A list of contract addresses to check. If omitted,
   *   the top 100 tokens by 24 hour volume will be checked.
   * @public
   */
  async getTokenBalances(
    address: string,
    contractAddresses?: string[]
  ): Promise<TokenBalancesResponse> {
    if (contractAddresses && contractAddresses.length > 1500) {
      throw new Error(
        'You cannot pass in more than 1500 contract addresses to getTokenBalances()'
      );
    }
    const provider = await this.config.getProvider();
    return provider.send('alchemy_getTokenBalances', [
      address,
      contractAddresses || DEFAULT_CONTRACT_ADDRESSES
    ]);
  }

  /**
   * Returns metadata for a given token contract address.
   *
   * @param address The contract address to get metadata for.
   * @public
   */
  async getTokenMetadata(address: string): Promise<TokenMetadataResponse> {
    const provider = await this.config.getProvider();
    return provider.send('alchemy_getTokenMetadata', [address]);
  }

  /**
   * Get transactions for specific addresses. See the web documentation for the
   * full details:
   * https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api#alchemy_getassettransfers
   *
   * @param params An object containing fields for the asset transfer query.
   * @public
   */
  async getAssetTransfers(
    params: AssetTransfersParams
  ): Promise<AssetTransfersResponse> {
    const provider = await this.config.getProvider();
    return provider.send('alchemy_getAssetTransfers', [
      {
        ...params,
        fromBlock:
          params.fromBlock != null ? formatBlock(params.fromBlock) : undefined,
        toBlock:
          params.toBlock != null ? formatBlock(params.toBlock) : undefined,
        maxCount: params.maxCount != null ? toHex(params.maxCount) : undefined
      }
    ]);
  }

  /**
   * Gets all transaction receipts for a given block by number or block hash.
   *
   * @param params An object containing fields for the transaction receipt query.
   * @public
   */
  async getTransactionReceipts(
    params: TransactionReceiptsParams
  ): Promise<TransactionReceiptsResponse> {
    const provider = await this.config.getProvider();
    return provider.send('alchemy_getTransactionReceipts', [params]);
  }
}

/**
 * Perform a binary search between an integer range of block numbers to find the
 * block number where the contract was deployed.
 *
 * @internal
 */
async function binarySearchFirstBlock(
  start: number,
  end: number,
  address: string,
  config: AlchemyConfig
): Promise<number> {
  if (start >= end) {
    return end;
  }

  const mid = Math.floor((start + end) / 2);
  const provider = await config.getProvider();
  const code = await provider.getCode(address, mid);
  if (code === ETH_NULL_VALUE) {
    return binarySearchFirstBlock(mid + 1, end, address, config);
  }
  return binarySearchFirstBlock(start, mid, address, config);
}
