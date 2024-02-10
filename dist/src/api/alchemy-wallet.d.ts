import { BlockTag, FeeData, Provider, TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';
import { ExternallyOwnedAccount } from '@ethersproject/abstract-signer';
import { BigNumber } from '@ethersproject/bignumber';
import { BytesLike } from '@ethersproject/bytes';
import { Deferrable } from '@ethersproject/properties';
import { SigningKey } from '@ethersproject/signing-key';
import { Wallet as EthersWallet } from '@ethersproject/wallet';
import { Alchemy } from './alchemy';
/**
 * The Wallet class inherits Signer and can sign transactions and messages using
 * a private key as a standard Externally Owned Account (EOA).
 *
 * SDK's custom implementation of Ethers.js's 'Wallet'.
 *
 * Primary difference from Ethers.js 'Wallet' is that you can pass in either a
 * Provider or an Alchemy object. This implementation will intelligently detect
 * the format and set the provider accordingly.
 *
 * @public
 * @override
 */
export declare class Wallet extends EthersWallet {
    private alchemyProviderPromise?;
    /**
     * Overload permits users to pass in either a standard Provider or an Alchemy
     * object. The constructor will detect the object type and handle appropriately.
     *
     * @override
     */
    constructor(privateKey: BytesLike | ExternallyOwnedAccount | SigningKey, alchemyOrProvider?: Alchemy | Provider);
    /**
     * Returns the balance of this wallet at blockTag.
     *
     * @param blockTag The block to check the balance of
     * @override
     */
    getBalance(blockTag?: BlockTag): Promise<BigNumber>;
    /**
     * Returns the number of transactions this account has ever sent. This is the
     * value required to be included in transactions as the nonce.
     *
     * @param blockTag The block to check the transaction count on
     * @override
     */
    getTransactionCount(blockTag?: BlockTag): Promise<number>;
    /**
     * Returns the result of estimating the cost to send the transactionRequest,
     * with this account address being used as the from field.
     *
     * @param transaction Transaction to estimate the gas on
     * @override
     */
    estimateGas(transaction: Deferrable<TransactionRequest>): Promise<BigNumber>;
    /**
     * Returns the result of calling using the transactionRequest, with this
     * account address being used as the from field.
     *
     * @param transaction To make a call on
     * @param blockTag The block to make the call on
     * @override
     */
    call(transaction: Deferrable<TransactionRequest>, blockTag?: BlockTag): Promise<string>;
    /**
     * Populates ALL keys for a transaction and checks that `from` matches this
     * `Signer`. Resolves ENS names and populates fields like `gasPrice`, `gasLimit`,
     * `nonce`, and `chainId` if they are not provided.
     *
     * @param transaction The transaction to populate.
     * @override
     */
    populateTransaction(transaction: Deferrable<TransactionRequest>): Promise<TransactionRequest>;
    /**
     * Populates all fields in a transaction, signs it and sends it to the network
     *
     * @param transaction The transaction to send.
     * @override
     */
    sendTransaction(transaction: Deferrable<TransactionRequest>): Promise<TransactionResponse>;
    /**
     * Returns the chain ID this wallet is connected to.
     *
     * @override
     */
    getChainId(): Promise<number>;
    /**
     * Returns the current gas price.
     *
     * @override
     */
    getGasPrice(): Promise<BigNumber>;
    /**
     * Returns the current recommended FeeData to use in a transaction.
     *
     * For an EIP-1559 transaction, the maxFeePerGas and maxPriorityFeePerGas
     * should be used.
     *
     * For legacy transactions and networks which do not support EIP-1559, the
     * gasPrice should be used.
     *
     * @override
     */
    getFeeData(): Promise<FeeData>;
    /**
     * Looks up the address of name. If the name is not owned, or does not have a
     * Resolver configured, or the Resolver does not have an address configured,
     * null is returned.
     *
     * @param name Name of the ENS address
     * @override
     */
    resolveName(name: string): Promise<string>;
    private getWallet;
}
