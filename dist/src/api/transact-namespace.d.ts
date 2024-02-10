import { TransactionReceipt, TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';
import type { BigNumber } from '@ethersproject/bignumber';
import { Deferrable } from '@ethersproject/properties';
import { BlockIdentifier, DebugTransaction, SendPrivateTransactionOptions, SimulateAssetChangesResponse, SimulateExecutionResponse } from '../types/types';
/**
 * The Transact namespace contains methods used for sending transactions and
 * checking on the state of submitted transactions.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the transact
 * namespace via `alchemy.transact`.
 */
export declare class TransactNamespace {
    private readonly config;
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
    sendPrivateTransaction(signedTransaction: string, maxBlockNumber?: number, options?: SendPrivateTransactionOptions): Promise<string>;
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
    cancelPrivateTransaction(transactionHash: string): Promise<boolean>;
    /**
     * Simulates the asset changes resulting from a list of transactions simulated
     * in sequence.
     *
     * Returns a list of asset changes for each transaction during simulation.
     *
     * @param transactions Transactions list of max 3 transactions to simulate.
     * @param blockIdentifier Optional block identifier to simulate the
     * transaction in.
     */
    simulateAssetChangesBundle(transactions: DebugTransaction[], blockIdentifier?: BlockIdentifier): Promise<SimulateAssetChangesResponse[]>;
    /**
     * Simulates the asset changes resulting from a single transaction.
     *
     * Returns list of asset changes that occurred during the transaction
     * simulation. Note that this method does not run the transaction on the
     * blockchain.
     *
     * @param transaction The transaction to simulate.
     * @param blockIdentifier Optional block identifier to simulate the
     * transaction in.
     */
    simulateAssetChanges(transaction: DebugTransaction, blockIdentifier?: BlockIdentifier): Promise<SimulateAssetChangesResponse>;
    /**
     * Simulates a list of transactions in sequence and returns list of decoded
     * traces and logs that occurred for each transaction during simulation.
     *
     * Note that this method does not run any transactions on the blockchain.
     *
     * @param transactions Transactions list of max 3 transactions to simulate.
     * @param blockIdentifier Optional block identifier to simulate the
     * transaction in.
     */
    simulateExecutionBundle(transactions: DebugTransaction[], blockIdentifier?: BlockIdentifier): Promise<SimulateExecutionResponse[]>;
    /**
     * Simulates a single transaction and the resulting and returns list of
     * decoded traces and logs that occurred during the transaction simulation.
     *
     * Note that this method does not run the transaction on the blockchain.
     *
     * @param transaction The transaction to simulate.
     * @param blockIdentifier Optional block identifier to simulate the
     * transaction in.
     */
    simulateExecution(transaction: DebugTransaction, blockIdentifier?: BlockIdentifier): Promise<SimulateExecutionResponse>;
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
    getTransaction(transactionHash: string | Promise<string>): Promise<TransactionResponse | null>;
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
    sendTransaction(signedTransaction: string | Promise<string>): Promise<TransactionResponse>;
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
    estimateGas(transaction: Deferrable<TransactionRequest>): Promise<BigNumber>;
    /**
     * Returns a fee per gas (in wei) that is an estimate of how much you can pay
     * as a priority fee, or "tip", to get a transaction included in the current block.
     *
     * This number is generally used to set the `maxPriorityFeePerGas` field in a
     * transaction request.
     *
     * @public
     */
    getMaxPriorityFeePerGas(): Promise<number>;
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
    waitForTransaction(transactionHash: string, confirmations?: number, timeout?: number): Promise<TransactionReceipt | null>;
}
