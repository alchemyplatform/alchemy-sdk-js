import {
  BlockTag,
  FeeData,
  Provider,
  TransactionRequest,
  TransactionResponse
} from '@ethersproject/abstract-provider';
import { Wallet as EthersWallet } from '@ethersproject/wallet';
import { BytesLike } from '@ethersproject/bytes';
import { ExternallyOwnedAccount } from '@ethersproject/abstract-signer';
import { SigningKey } from '@ethersproject/signing-key';
import { Deferrable } from '@ethersproject/properties';
import { Alchemy } from './alchemy';
import { BigNumber } from '@ethersproject/bignumber';

/**
 * SDK's custom implementation of Ethers.js's 'Wallet'.
 *
 * Primary difference from Ethers.js 'Wallet' is that you can pass in either a
 * Provider or an Alchemy object. This implementation will intelligently detect
 * the format and set the provider accordingly.
 *
 * @public
 */
export class Wallet extends EthersWallet {
  private alchemyProviderPromise?: Promise<Provider>;

  /**
   * Overload permits users to pass in either a standard Provider or an Alchemy
   * object. The constructor will detect the object type and handle appropriately.
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

  getBalance(blockTag?: BlockTag): Promise<BigNumber> {
    return this.getWallet().then(wallet => wallet.getBalance(blockTag));
  }

  getTransactionCount(blockTag?: BlockTag): Promise<number> {
    return this.getWallet().then(wallet =>
      wallet.getTransactionCount(blockTag)
    );
  }

  /** Populates "from" if unspecified, and estimates the gas for the transaction */
  estimateGas(transaction: Deferrable<TransactionRequest>): Promise<BigNumber> {
    return this.getWallet().then(wallet => wallet.estimateGas(transaction));
  }

  /** Populates "from" if unspecified, and calls with the transaction */
  call(
    transaction: Deferrable<TransactionRequest>,
    blockTag?: BlockTag
  ): Promise<string> {
    return this.getWallet().then(wallet => wallet.call(transaction, blockTag));
  }

  /** Populates all fields in a transaction, signs it and sends it to the network */
  sendTransaction(
    transaction: Deferrable<TransactionRequest>
  ): Promise<TransactionResponse> {
    return this.getWallet().then(wallet => wallet.sendTransaction(transaction));
  }

  getChainId(): Promise<number> {
    return this.getWallet().then(wallet => wallet.getChainId());
  }

  getGasPrice(): Promise<BigNumber> {
    return this.getWallet().then(wallet => wallet.getGasPrice());
  }

  getFeeData(): Promise<FeeData> {
    return this.getWallet().then(wallet => wallet.getFeeData());
  }

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
