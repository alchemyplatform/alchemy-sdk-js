import {
  BlockTag,
  FeeData,
  Provider,
  TransactionRequest,
  TransactionResponse
} from '@ethersproject/abstract-provider';
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
export class Wallet extends EthersWallet {
  private alchemyProviderPromise?: Promise<Provider>;

  /**
   * Overload permits users to pass in either a standard Provider or an Alchemy
   * object. The constructor will detect the object type and handle appropriately.
   *
   * @override
   */
  constructor(
    privateKey: BytesLike | ExternallyOwnedAccount | SigningKey,
    alchemyOrProvider?: Alchemy | Provider
  ) {
    // If object passed in is a provider, send to super
    let superProvider: Provider | undefined;
    if (alchemyOrProvider && Provider.isProvider(alchemyOrProvider)) {
      superProvider = alchemyOrProvider;
    }
    super(privateKey, superProvider);

    // If object passed in is an Alchemy object, just set Alchemy
    if (alchemyOrProvider && !Provider.isProvider(alchemyOrProvider)) {
      this.alchemyProviderPromise = alchemyOrProvider.config.getProvider();
    }
  }

  //////////////////////////////////////////////////////////////////
  // Set of overrides from Signer to handle async provider retrieval.
  //////////////////////////////////////////////////////////////////

  /**
   * Returns the balance of this wallet at blockTag.
   *
   * @param blockTag The block to check the balance of
   * @override
   */
  getBalance(blockTag?: BlockTag): Promise<BigNumber> {
    return this.getWallet().then(wallet => wallet.getBalance(blockTag));
  }

  /**
   * Returns the number of transactions this account has ever sent. This is the
   * value required to be included in transactions as the nonce.
   *
   * @param blockTag The block to check the transaction count on
   * @override
   */
  getTransactionCount(blockTag?: BlockTag): Promise<number> {
    return this.getWallet().then(wallet =>
      wallet.getTransactionCount(blockTag)
    );
  }

  /**
   * Returns the result of estimating the cost to send the transactionRequest,
   * with this account address being used as the from field.
   *
   * @param transaction Transaction to estimate the gas on
   * @override
   */
  estimateGas(transaction: Deferrable<TransactionRequest>): Promise<BigNumber> {
    return this.getWallet().then(wallet => wallet.estimateGas(transaction));
  }

  /**
   * Returns the result of calling using the transactionRequest, with this
   * account address being used as the from field.
   *
   * @param transaction To make a call on
   * @param blockTag The block to make the call on
   * @override
   */
  call(
    transaction: Deferrable<TransactionRequest>,
    blockTag?: BlockTag
  ): Promise<string> {
    return this.getWallet().then(wallet => wallet.call(transaction, blockTag));
  }

  /**
   * Populates all fields in a transaction, signs it and sends it to the network
   *
   * @override
   */
  sendTransaction(
    transaction: Deferrable<TransactionRequest>
  ): Promise<TransactionResponse> {
    return this.getWallet().then(wallet => wallet.sendTransaction(transaction));
  }

  /**
   * Returns the chain ID this wallet is connected to.
   *
   * @override
   */
  getChainId(): Promise<number> {
    return this.getWallet().then(wallet => wallet.getChainId());
  }

  /**
   * Returns the current gas price.
   *
   * @override
   */
  getGasPrice(): Promise<BigNumber> {
    return this.getWallet().then(wallet => wallet.getGasPrice());
  }

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
  getFeeData(): Promise<FeeData> {
    return this.getWallet().then(wallet => wallet.getFeeData());
  }

  /**
   * Looks up the address of name. If the name is not owned, or does not have a
   * Resolver configured, or the Resolver does not have an address configured,
   * null is returned.
   *
   * @param name Name of the ENS address
   * @override
   */
  resolveName(name: string): Promise<string> {
    return this.getWallet().then(wallet => wallet.resolveName(name));
  }

  private async getWallet() {
    if (!this.alchemyProviderPromise) {
      return this.connect(this.provider);
    }
    return this.connect(await this.alchemyProviderPromise);
  }
}
