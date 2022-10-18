import {
  TransactionReceipt,
  TransactionRequest,
  TransactionResponse
} from '@ethersproject/abstract-provider';
import type { BigNumber } from '@ethersproject/bignumber';
import { Deferrable } from '@ethersproject/properties';

import {
  GasOptimizedTransactionResponse,
  GasOptimizedTransactionStatusResponse,
  SendPrivateTransactionOptions
} from '../types/types';
import { AlchemyConfig } from './alchemy-config';
import { Wallet } from './alchemy-wallet';
import { fromHex, toHex } from './util';

/**
 * Multiples to increment fee per gas when using
 * {@link TransactNamespace.sendGasOptimizedTransaction}.
 *
 * @internal
 */
export const GAS_OPTIMIZED_TX_FEE_MULTIPLES = [0.9, 1, 1.1, 1.2, 1.3];

/**
 * The Transact namespace contains methods used for sending transactions and
 * checking on the state of submitted transactions.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the transact
 * namespace via `alchemy.transact`.
 */
export class TransactNamespace {
  /** @internal */
  constructor(private readonly config: AlchemyConfig) {}

  /**
   * Used to send a single transaction to Flashbots. Flashbots will attempt to
   * send the transaction to miners for the next 25 blocks.
   *
   * Returns the transaction hash of the submitted transaction.
   *
   * @param signedTransaction The raw, signed transaction as a hash.
   * @param maxBlockNumber Optional highest block number in which the
   *   transaction should be included.
   * @param options Options to configure the request.
   */
  async sendPrivateTransaction(
    signedTransaction: string,
    maxBlockNumber?: number,
    options?: SendPrivateTransactionOptions
  ): Promise<string> {
    const provider = await this.config.getProvider();
    const hexBlockNumber = maxBlockNumber ? toHex(maxBlockNumber) : undefined;
    return provider._send(
      'eth_sendPrivateTransaction',
      [
        {
          tx: signedTransaction,
          maxBlockNumber: hexBlockNumber,
          preferences: options
        }
      ],
      'sendPrivateTransaction'
    );
  }

  /**
   * Stops the provided private transaction from being submitted for future
   * blocks. A transaction can only be cancelled if the request is signed by the
   * same key as the {@link sendPrivateTransaction} call submitting the
   * transaction in first place.
   *
   * Please note that fast mode transactions cannot be cancelled using this method.
   *
   * Returns a boolean indicating whether the cancellation was successful.
   *
   * @param transactionHash Transaction hash of private tx to be cancelled
   */
  async cancelPrivateTransaction(transactionHash: string): Promise<boolean> {
    const provider = await this.config.getProvider();
    return provider._send(
      'eth_cancelPrivateTransaction',
      [
        {
          txHash: transactionHash
        }
      ],
      'cancelPrivateTransaction'
    );
  }

  /**
   * Returns the transaction with hash or null if the transaction is unknown.
   *
   * If a transaction has not been mined, this method will search the
   * transaction pool. Various backends may have more restrictive transaction
   * pool access (e.g. if the gas price is too low or the transaction was only
   * recently sent and not yet indexed) in which case this method may also return null.
   *
   * NOTE: This is an alias for {@link CoreNamespace.getTransaction}.
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
   * Submits transaction to the network to be mined. The transaction must be
   * signed, and be valid (i.e. the nonce is correct and the account has
   * sufficient balance to pay for the transaction).
   *
   * NOTE: This is an alias for {@link CoreNamespace.sendTransaction}.
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
   * Returns an estimate of the amount of gas that would be required to submit
   * transaction to the network.
   *
   * An estimate may not be accurate since there could be another transaction on
   * the network that was not accounted for, but after being mined affects the
   * relevant state.
   *
   * This is an alias for {@link CoreNamespace.estimateGas}.
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
   * Returns a fee per gas (in wei) that is an estimate of how much you can pay
   * as a priority fee, or "tip", to get a transaction included in the current block.
   *
   * This number is generally used to set the `maxPriorityFeePerGas` field in a
   * transaction request.
   *
   * @public
   */
  async getMaxPriorityFeePerGas(): Promise<number> {
    const provider = await this.config.getProvider();
    const feeHex = await provider._send(
      'eth_maxPriorityFeePerGas',
      [],
      'getMaxPriorityFeePerGas'
    );
    return fromHex(feeHex);
  }

  /**
   * Returns a promise which will not resolve until specified transaction hash is mined.
   *
   * If {@link confirmations} is 0, this method is non-blocking and if the
   * transaction has not been mined returns null. Otherwise, this method will
   * block until the transaction has confirmed blocks mined on top of the block
   * in which it was mined.
   *
   * NOTE: This is an alias for {@link CoreNamespace.waitForTransaction}.
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
   * Instead of sending a single transaction that might not get mined, this
   * method allows you to send the same transaction multiple times, with
   * different gas prices and gas limits. This should result in lower fees paid.
   *
   * Alchemy will submit the cheapest transaction, and if it does not get mined,
   * the next cheapest transaction will be submitted. This process will continue
   * until one of the transactions is mined, or until all transactions are rejected.
   *
   * To have Alchemy automatically generate a fee and gas spread, pass in a
   * {@link TransactionRequest} object and a {@link Wallet} as a signer.
   *
   * This method returns a response object containing the transaction hash for
   * each of the signed transactions and a transaction job id that can be used
   * to track the state of the transaction job.
   *
   * @param signedTransactions An array of signed transactions to send. Each
   *   transaction in the array must have the same values, but with different
   *   gas and fee values.
   * @public
   * @internal
   */
  // TODO(txjob): Remove internal tag once this feature is released.
  async sendGasOptimizedTransaction(
    signedTransactions: string[]
  ): Promise<GasOptimizedTransactionResponse>;

  /**
   * Instead of sending a single transaction that might not get mined, this
   * method will generate a series of five EIP-1559 transactions with different
   * gas prices in order to minimize the final fees paid.
   *
   * Alchemy will submit the cheapest transaction, and if it does not get mined,
   * the next cheapest transaction will be submitted. This process will continue
   * until one of the transactions is mined, or until all transactions are rejected.
   *
   * To calculate the fee, gas, and gas spread for each transaction, this method
   * first calculates the base fee from the latest block, estimates the gas for
   * the transaction, and then calculates the fee and gas spread for the
   * transaction. The five transactions will have 90%, 100%, 110%, 120%, and
   * 130% of the max priority fee per gas.
   *
   * Note that you can also pass in an array of pre-signed transactions with set
   * gas levels for more granular control over gas.
   *
   * This method returns a response object containing the transaction hash for
   * each of the signed transactions and a transaction job id that can be used
   * to track the state of the transaction job.
   *
   * @param transaction The raw transaction to send.
   * @param wallet A wallet to use to sign the transaction.
   * @public
   * @internal
   */
  // TODO(txjob): Remove internal tag once this feature is released.
  async sendGasOptimizedTransaction(
    transaction: TransactionRequest,
    wallet: Wallet
  ): Promise<GasOptimizedTransactionResponse>;
  async sendGasOptimizedTransaction(
    transactionOrSignedTxs: TransactionRequest | string[],
    wallet?: Wallet
  ): Promise<GasOptimizedTransactionResponse> {
    if (Array.isArray(transactionOrSignedTxs)) {
      return this._sendGasOptimizedTransaction(
        transactionOrSignedTxs,
        'sendGasOptimizedTransactionPreSigned'
      );
    }

    let gasLimit;
    let priorityFee;
    let baseFee;
    const provider = await this.config.getProvider();
    try {
      gasLimit = await this.estimateGas(transactionOrSignedTxs);
      priorityFee = await this.getMaxPriorityFeePerGas();
      const currentBlock = await provider.getBlock('latest');
      baseFee = currentBlock.baseFeePerGas!.toNumber();
    } catch (e) {
      throw new Error(`Failed to estimate gas for transaction: ${e}`);
    }

    const gasSpreadTransactions = generateGasSpreadTransactions(
      transactionOrSignedTxs,
      gasLimit.toNumber(),
      baseFee,
      priorityFee
    );
    const signedTransactions = await Promise.all(
      gasSpreadTransactions.map(tx => wallet!.signTransaction(tx))
    );

    return this._sendGasOptimizedTransaction(
      signedTransactions,
      'sendGasOptimizedTransactionGenerated'
    );
  }

  /**
   * Returns the state of the transaction job returned by the
   * {@link sendGasOptimizedTransaction}.
   *
   * @param trackingId The tracking id from the response of the sent gas optimized transaction.
   * @internal
   */
  // TODO(txjob): Remove internal tag once this feature is released.
  async getGasOptimizedTransactionStatus(
    trackingId: string
  ): Promise<GasOptimizedTransactionStatusResponse> {
    const provider = await this.config.getProvider();
    return provider._send(
      'alchemy_getGasOptimizedTransactionStatus',
      [trackingId],
      'getGasOptimizedTransactionStatus'
    );
  }

  private async _sendGasOptimizedTransaction(
    signedTransactions: string[],
    methodName: string
  ): Promise<GasOptimizedTransactionResponse> {
    const provider = await this.config.getProvider();
    return provider._send(
      'alchemy_sendGasOptimizedTransaction',
      [
        {
          rawTransactions: signedTransactions
        }
      ],
      methodName
    );
  }
}

/**
 * Helper method to generate the raw transaction with the given gas limit and
 * priority fee across a spread of different gas prices.
 *
 * @internal
 */
// Visible for testing
export function generateGasSpreadTransactions(
  transaction: TransactionRequest,
  gasLimit: number,
  baseFee: number,
  priorityFee: number
): TransactionRequest[] {
  return GAS_OPTIMIZED_TX_FEE_MULTIPLES.map(feeMultiplier => {
    return {
      ...transaction,
      gasLimit,
      maxFeePerGas: Math.round(
        baseFee * feeMultiplier + priorityFee * feeMultiplier
      ),
      maxPriorityFeePerGas: Math.round(feeMultiplier * priorityFee)
    };
  });
}
