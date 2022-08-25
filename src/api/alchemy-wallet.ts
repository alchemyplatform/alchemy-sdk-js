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
export class Wallet extends EthersWallet {
  readonly alchemy?: Alchemy;
  alchemyProvider?: Provider;

  constructor(
    privateKey: BytesLike | ExternallyOwnedAccount | SigningKey,
    alchemy?: Alchemy
  ) {
    super(privateKey);
    this.alchemy = alchemy;
  }

  //////////////////////////////////////////////////////////////////
  // Set of overrides from Signer to handle async provider retrieval.
  //////////////////////////////////////////////////////////////////

  async getBalance(blockTag?: BlockTag): Promise<BigNumber> {
    return this.getWallet().then(wallet => wallet.getBalance(blockTag));
  }

  async getTransactionCount(blockTag?: BlockTag): Promise<number> {
    return this.getWallet().then(wallet =>
      wallet.getTransactionCount(blockTag)
    );
  }

  // Populates "from" if unspecified, and estimates the gas for the transaction
  async estimateGas(
    transaction: Deferrable<TransactionRequest>
  ): Promise<BigNumber> {
    return this.getWallet().then(wallet => wallet.estimateGas(transaction));
  }

  // Populates "from" if unspecified, and calls with the transaction
  async call(
    transaction: Deferrable<TransactionRequest>,
    blockTag?: BlockTag
  ): Promise<string> {
    return this.getWallet().then(wallet => wallet.call(transaction, blockTag));
  }

  // Populates all fields in a transaction, signs it and sends it to the network
  async sendTransaction(
    transaction: Deferrable<TransactionRequest>
  ): Promise<TransactionResponse> {
    return this.getWallet().then(wallet => wallet.sendTransaction(transaction));
  }

  async getChainId(): Promise<number> {
    return this.getWallet().then(wallet => wallet.getChainId());
  }

  async getGasPrice(): Promise<BigNumber> {
    return this.getWallet().then(wallet => wallet.getGasPrice());
  }

  async getFeeData(): Promise<FeeData> {
    return this.getWallet().then(wallet => wallet.getFeeData());
  }

  async resolveName(name: string): Promise<string> {
    return this.getWallet().then(wallet => wallet.resolveName(name));
  }

  private async getWallet() {
    if (!this.alchemy) {
      throw new Error('No Alchemy object passed into the wallet.');
    }
    if (!this.alchemyProvider) {
      this.alchemyProvider = await this.alchemy.config.getProvider();
    }
    if (!this.alchemyProvider) {
      throw new Error("Couldn't fetch provider in the wallet.");
    }
    return this.connect(this.alchemyProvider);
  }
}
