import type {
  Block,
  BlockTag,
  BlockWithTransactions,
  FeeData,
  Log,
  TransactionReceipt,
  TransactionRequest,
  TransactionResponse
} from '@ethersproject/abstract-provider';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import type { Network as EthersNetworkAlias } from '@ethersproject/networks/lib/types';
import type { Deferrable } from '@ethersproject/properties';

import {
  getAssetTransfers,
  getLogs,
  getTransactionReceipts
} from '../internal/core-api';
import {
  AssetTransfersParams,
  AssetTransfersResponse,
  AssetTransfersWithMetadataParams,
  AssetTransfersWithMetadataResponse,
  DeployResult,
  Filter,
  FilterByBlockHash,
  GetTokensForOwnerOptions,
  GetTokensForOwnerResponse,
  OwnedToken,
  TokenBalanceType,
  TokenBalancesOptionsDefaultTokens,
  TokenBalancesOptionsErc20,
  TokenBalancesResponse,
  TokenBalancesResponseErc20,
  TokenMetadataResponse,
  TransactionReceiptsParams,
  TransactionReceiptsResponse
} from '../types/types';
import { ETH_NULL_VALUE } from '../util/const';
import { nullsToUndefined } from '../util/util';
import { AlchemyConfig } from './alchemy-config';
import { toHex } from './util';
import { formatUnits } from './utils';

/**
 * The core namespace contains all commonly-used [Ethers.js
 * Provider](https://docs.ethers.io/v5/api/providers/api-providers/#AlchemyProvider)
 * methods. If you are already using Ethers.js, you should be simply able to
 * replace the Ethers.js Provider object with `alchemy.core` when accessing
 * provider methods and it should just work.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the core namespace
 * via `alchemy.core`.
 */
export class CoreNamespace {
  /** @internal */
  constructor(private readonly config: AlchemyConfig) {}

  /**
   * Returns the balance of a given address as of the provided block.
   *
   * @param addressOrName The address or name of the account to get the balance for.
   * @param blockTag The optional block number or hash to get the balance for.
   *   Defaults to 'latest' if unspecified.
   * @public
   */
  async getBalance(
    addressOrName: string | Promise<string>,
    blockTag?: BlockTag | Promise<BlockTag>
  ): Promise<BigNumber> {
    const provider = await this.config.getProvider();
    return provider.getBalance(addressOrName, blockTag);
  }

  /**
   * Checks if the provided address is a smart contract.
   *
   * @param address The address to check type for.
   * @public
   */
  async isContractAddress(address: string): Promise<boolean> {
    const provider = await this.config.getProvider();
    const code = await provider.getCode(address);
    return code !== '0x';
  }

  /**
   * Returns the contract code of the provided address at the block. If there is
   * no contract deployed, the result is `0x`.
   *
   * @param addressOrName The address or name of the account to get the code for.
   * @param blockTag The optional block number or hash to get the code for.
   *   Defaults to 'latest' if unspecified.
   * @public
   */
  async getCode(
    addressOrName: string | Promise<string>,
    blockTag?: BlockTag | Promise<BlockTag>
  ): Promise<string> {
    const provider = await this.config.getProvider();
    return provider.getCode(addressOrName, blockTag);
  }

  /**
   * Return the value of the provided position at the provided address, at the
   * provided block in `Bytes32` format.
   *
   * @param addressOrName The address or name of the account to get the code for.
   * @param position The position of the storage slot to get.
   * @param blockTag The optional block number or hash to get the code for.
   *   Defaults to 'latest' if unspecified.
   * @public
   */
  async getStorageAt(
    addressOrName: string | Promise<string>,
    position: BigNumberish | Promise<BigNumberish>,
    blockTag?: BlockTag | Promise<BlockTag>
  ): Promise<string> {
    const provider = await this.config.getProvider();
    return provider.getStorageAt(addressOrName, position, blockTag);
  }

  /**
   * Returns the number of transactions ever sent from the provided address, as
   * of the provided block tag. This value is used as the nonce for the next
   * transaction from the address sent to the network.
   *
   * @param addressOrName The address or name of the account to get the nonce for.
   * @param blockTag The optional block number or hash to get the nonce for.
   * @public
   */
  async getTransactionCount(
    addressOrName: string | Promise<string>,
    blockTag?: BlockTag | Promise<BlockTag>
  ): Promise<number> {
    const provider = await this.config.getProvider();
    return provider.getTransactionCount(addressOrName, blockTag);
  }

  /**
   * Returns the block from the network based on the provided block number or
   * hash. Transactions on the block are represented as an array of transaction
   * hashes. To get the full transaction details on the block, use
   * {@link getBlockWithTransactions} instead.
   *
   * @param blockHashOrBlockTag The block number or hash to get the block for.
   * @public
   */
  async getBlock(
    blockHashOrBlockTag: BlockTag | string | Promise<BlockTag | string>
  ): Promise<Block> {
    const provider = await this.config.getProvider();
    return provider.getBlock(blockHashOrBlockTag);
  }

  /**
   * Returns the block from the network based on the provided block number or
   * hash. Transactions on the block are represented as an array of
   * {@link TransactionResponse} objects.
   *
   * @param blockHashOrBlockTag The block number or hash to get the block for.
   * @public
   */
  async getBlockWithTransactions(
    blockHashOrBlockTag: BlockTag | string | Promise<BlockTag | string>
  ): Promise<BlockWithTransactions> {
    const provider = await this.config.getProvider();
    return provider.getBlockWithTransactions(blockHashOrBlockTag);
  }

  /**
   * Returns the {@link EthersNetworkAlias} Alchemy is connected to.
   *
   * @public
   */
  async getNetwork(): Promise<EthersNetworkAlias> {
    const provider = await this.config.getProvider();
    return provider.getNetwork();
  }

  /**
   * Returns the block number of the most recently mined block.
   *
   * @public
   */
  async getBlockNumber(): Promise<number> {
    const provider = await this.config.getProvider();
    return provider.getBlockNumber();
  }

  /**
   * Returns the best guess of the current gas price to use in a transaction.
   *
   * @public
   */
  async getGasPrice(): Promise<BigNumber> {
    const provider = await this.config.getProvider();
    return provider.getGasPrice();
  }

  /**
   * Returns the recommended fee data to use in a transaction.
   *
   * For an EIP-1559 transaction, the maxFeePerGas and maxPriorityFeePerGas
   * should be used.
   *
   * For legacy transactions and networks which do not support EIP-1559, the
   * gasPrice should be used.
   *
   * @public
   */
  async getFeeData(): Promise<FeeData> {
    const provider = await this.config.getProvider();
    return provider.getFeeData();
  }

  /**
   * Returns a Promise which will stall until the network has heen established,
   * ignoring errors due to the target node not being active yet.
   *
   * This can be used for testing or attaching scripts to wait until the node is
   * up and running smoothly.
   *
   * @public
   */
  async ready(): Promise<EthersNetworkAlias> {
    const provider = await this.config.getProvider();
    return provider.ready;
  }

  /**
   * Returns the result of executing the transaction, using call. A call does
   * not require any ether, but cannot change any state. This is useful for
   * calling getters on Contracts.
   *
   * @param transaction The transaction to execute.
   * @param blockTag The optional block number or hash to get the call for.
   * @public
   */
  async call(
    transaction: Deferrable<TransactionRequest>,
    blockTag?: BlockTag | Promise<BlockTag>
  ): Promise<string> {
    const provider = await this.config.getProvider();
    return provider.call(transaction, blockTag);
  }

  /**
   * Returns an estimate of the amount of gas that would be required to submit
   * transaction to the network.
   *
   * An estimate may not be accurate since there could be another transaction on
   * the network that was not accounted for, but after being mined affects the
   * relevant state.
   *
   * This is an alias for {@link TransactNamespace.estimateGas}.
   *
   * @param transaction The transaction to estimate gas for.
   * @public
   */
  async estimateGas(
    transaction: Deferrable<TransactionRequest>
  ): Promise<BigNumber> {
    const provider = await this.config.getProvider();
    return provider.estimateGas(transaction);
  }

  /**
   * Returns the transaction with hash or null if the transaction is unknown.
   *
   * If a transaction has not been mined, this method will search the
   * transaction pool. Various backends may have more restrictive transaction
   * pool access (e.g. if the gas price is too low or the transaction was only
   * recently sent and not yet indexed) in which case this method may also return null.
   *
   * NOTE: This is an alias for {@link TransactNamespace.getTransaction}.
   *
   * @param transactionHash The hash of the transaction to get.
   * @public
   */
  async getTransaction(
    transactionHash: string | Promise<string>
  ): Promise<TransactionResponse | null> {
    const provider = await this.config.getProvider();
    return provider.getTransaction(transactionHash);
  }

  /**
   * Returns the transaction receipt for hash or null if the transaction has not
   * been mined.
   *
   * To stall until the transaction has been mined, consider the
   * waitForTransaction method below.
   *
   * @param transactionHash The hash of the transaction to get.
   * @public
   */
  async getTransactionReceipt(
    transactionHash: string | Promise<string>
  ): Promise<TransactionReceipt | null> {
    const provider = await this.config.getProvider();
    return provider.getTransactionReceipt(transactionHash);
  }

  /**
   * Submits transaction to the network to be mined. The transaction must be
   * signed, and be valid (i.e. the nonce is correct and the account has
   * sufficient balance to pay for the transaction).
   *
   * NOTE: This is an alias for {@link TransactNamespace.getTransaction}.
   *
   * @param signedTransaction The signed transaction to send.
   * @public
   */
  async sendTransaction(
    signedTransaction: string | Promise<string>
  ): Promise<TransactionResponse> {
    const provider = await this.config.getProvider();
    return provider.sendTransaction(signedTransaction);
  }

  /**
   * Returns a promise which will not resolve until specified transaction hash is mined.
   *
   * If {@link confirmations} is 0, this method is non-blocking and if the
   * transaction has not been mined returns null. Otherwise, this method will
   * block until the transaction has confirmed blocks mined on top of the block
   * in which it was mined.
   *
   * NOTE: This is an alias for {@link TransactNamespace.getTransaction}.
   *
   * @param transactionHash The hash of the transaction to wait for.
   * @param confirmations The number of blocks to wait for.
   * @param timeout The maximum time to wait for the transaction to confirm.
   * @public
   */
  async waitForTransaction(
    transactionHash: string,
    confirmations?: number,
    timeout?: number
  ): Promise<TransactionReceipt | null> {
    const provider = await this.config.getProvider();
    return provider.waitForTransaction(transactionHash, confirmations, timeout);
  }

  /**
   * Returns an array of logs that match the provided filter.
   *
   * @param filter The filter object to use.
   * @public
   */
  async getLogs(
    filter: Filter | FilterByBlockHash | Promise<Filter | FilterByBlockHash>
  ): Promise<Array<Log>> {
    return getLogs(this.config, filter);
  }

  /**
   * Allows sending a raw message to the Alchemy backend.
   *
   * @param method The method to call.
   * @param params The parameters to pass to the method.
   * @public
   */
  async send(method: string, params: Array<any>): Promise<any> {
    const provider = await this.config.getProvider();
    return provider.send(method, params);
  }

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
    const txReceipts = await getTransactionReceipts(
      this.config,
      {
        blockNumber: toHex(firstBlock)
      },
      'findContractDeployer'
    );
    const matchingReceipt = txReceipts.receipts?.find(
      receipt => receipt.contractAddress === contractAddress.toLowerCase()
    );
    return {
      deployerAddress: matchingReceipt?.from,
      blockNumber: firstBlock
    };
  }

  /**
   * Returns the ERC-20 token balances for a specific owner address.
   *
   * @param addressOrName The owner address to get the token balances for.
   * @public
   */
  async getTokenBalances(
    addressOrName: string
  ): Promise<TokenBalancesResponseErc20>;

  /**
   * Returns the token balances for a specific owner address given a list of contracts.
   *
   * @param addressOrName The owner address to get the token balances for.
   * @param contractAddresses A list of contract addresses to check. If omitted,
   *   all ERC-20 tokens will be checked.
   * @public
   */
  async getTokenBalances(
    addressOrName: string,
    contractAddresses?: string[]
  ): Promise<TokenBalancesResponse>;

  /**
   * Returns the ERC-20 token balances for a specific owner.
   *
   * This overload covers the erc-20 token type which includes a page key in the response.
   *
   * @param addressOrName The owner address to get the token balances for.
   * @param options Token type options set to ERC-20 with optional page key.
   * @public
   */
  async getTokenBalances(
    addressOrName: string,
    options: TokenBalancesOptionsErc20
  ): Promise<TokenBalancesResponseErc20>;

  /**
   * Returns the token balances for a specific owner, fetching from the top 100
   * tokens by 24 hour volume.
   *
   * This overload covers the default token type which includes a page key in
   * the response.
   *
   * @param addressOrName The owner address to get the token balances for.
   * @param options Token type options set to ERC-20 with optional page key.
   * @public
   */
  async getTokenBalances(
    addressOrName: string,
    options: TokenBalancesOptionsDefaultTokens
  ): Promise<TokenBalancesResponse>;

  async getTokenBalances(
    addressOrName: string,
    contractAddressesOrOptions?:
      | string[]
      | TokenBalancesOptionsDefaultTokens
      | TokenBalancesOptionsErc20
  ) {
    const provider = await this.config.getProvider();
    const address = await provider._getAddress(addressOrName);
    if (Array.isArray(contractAddressesOrOptions)) {
      if (contractAddressesOrOptions.length > 1500) {
        throw new Error(
          'You cannot pass in more than 1500 contract addresses to getTokenBalances()'
        );
      }
      if (contractAddressesOrOptions.length === 0) {
        throw new Error(
          'getTokenBalances() requires at least one contractAddress when using an array'
        );
      }
      return provider._send(
        'alchemy_getTokenBalances',
        [address, contractAddressesOrOptions],
        'getTokenBalances'
      );
    } else {
      const tokenType =
        contractAddressesOrOptions === undefined
          ? TokenBalanceType.ERC20
          : contractAddressesOrOptions.type;
      const params: Array<string | { pageKey: string }> = [address, tokenType];
      if (
        contractAddressesOrOptions?.type === TokenBalanceType.ERC20 &&
        contractAddressesOrOptions.pageKey
      ) {
        params.push({ pageKey: contractAddressesOrOptions.pageKey });
      }
      return provider._send(
        'alchemy_getTokenBalances',
        params,
        'getTokenBalances'
      );
    }
  }

  /**
   * Returns the tokens that the specified address owns, along with the amount
   * of each token and the relevant metadata.
   *
   * @param addressOrName The owner address to get the tokens with balances for.
   * @param options Additional options to pass to the request.
   * @public
   */
  async getTokensForOwner(
    addressOrName: string,
    options?: GetTokensForOwnerOptions
  ): Promise<GetTokensForOwnerResponse> {
    const provider = await this.config.getProvider();
    const address = await provider._getAddress(addressOrName);
    const params: any[] = [
      address,
      options?.contractAddresses ?? TokenBalanceType.ERC20
    ];
    if (options?.pageKey) {
      params.push({ pageKey: options.pageKey });
    }
    const response = (await provider._send(
      'alchemy_getTokenBalances',
      params,
      'getTokensForOwner'
    )) as TokenBalancesResponseErc20;

    const formattedBalances = response.tokenBalances.map(balance => ({
      contractAddress: balance.contractAddress,
      rawBalance: BigNumber.from(balance.tokenBalance!).toString()
    }));

    const metadataPromises = await Promise.allSettled(
      response.tokenBalances.map(token =>
        provider._send(
          'alchemy_getTokenMetadata',
          [token.contractAddress],
          'getTokensForOwner'
        )
      )
    );
    const metadata: TokenMetadataResponse[] = metadataPromises.map(p =>
      p.status === 'fulfilled'
        ? p.value
        : {
            name: null,
            symbol: null,
            decimals: null,
            logo: null
          }
    );
    const ownedTokens = formattedBalances.map((balance, index) => ({
      ...balance,
      ...metadata[index],
      balance:
        metadata[index].decimals !== null
          ? formatUnits(balance.rawBalance, metadata[index].decimals!)
          : undefined
    }));

    return {
      tokens: ownedTokens.map(t => nullsToUndefined<OwnedToken>(t)),
      pageKey: response.pageKey
    };
  }

  /**
   * Returns metadata for a given token contract address.
   *
   * @param address The contract address to get metadata for.
   * @public
   */
  async getTokenMetadata(address: string): Promise<TokenMetadataResponse> {
    const provider = await this.config.getProvider();
    return provider._send(
      'alchemy_getTokenMetadata',
      [address],
      'getTokenMetadata'
    );
  }

  /**
   * Get transactions for specific addresses. See the web documentation for the
   * full details:
   * https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api#alchemy_getassettransfers
   *
   * This overload requires {@link AssetTransfersWithMetadataParams.withMetadata}
   * to be set to `true`, which results in additional metadata returned in the
   * response object.
   *
   * @param params An object containing fields for the asset transfer query
   * @public
   */
  async getAssetTransfers(
    params: AssetTransfersWithMetadataParams
  ): Promise<AssetTransfersWithMetadataResponse>;

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
  ): Promise<AssetTransfersResponse>;
  async getAssetTransfers(
    params: AssetTransfersWithMetadataParams | AssetTransfersParams
  ): Promise<AssetTransfersResponse | AssetTransfersWithMetadataResponse> {
    return getAssetTransfers(this.config, params);
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
    return getTransactionReceipts(this.config, params);
  }

  /**
   * Returns the underlying owner address for the provided ENS address, or `null`
   * if the ENS name does not have an underlying address.
   *
   * @param name The ENS address name to resolve.
   */
  async resolveName(name: string): Promise<string | null> {
    const provider = await this.config.getProvider();
    return provider.resolveName(name);
  }

  /**
   * Performs a reverse lookup of the address in ENS using the Reverse Registrar. If the name does not exist, or the forward lookup does not match, null is returned.
   *
   * An ENS name requires additional configuration to setup a reverse record, so not all ENS addresses will map back to the original ENS domain.
   *
   * @param address The address to look up the ENS domain name for.
   */
  async lookupAddress(address: string): Promise<string | null> {
    const provider = await this.config.getProvider();
    return provider.lookupAddress(address);
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
