import { AlchemyConfig } from './alchemy-config';
import type {
  Block,
  BlockTag,
  BlockWithTransactions,
  FeeData, Filter, FilterByBlockHash, Log, TransactionReceipt,
  TransactionRequest,
  TransactionResponse
} from '@ethersproject/abstract-provider';
import type { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import type { Network as EthersNetworkAlias } from '@ethersproject/networks/lib/types';
import type { Deferrable } from '@ethersproject/properties';

export class RpcModule {
  constructor(private readonly config: AlchemyConfig) {
  }

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
    const provider = await this.config.getProvider();
    return provider.getLogs(filter);
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
}
