import { Alchemy } from '@alch/alchemy-sdk';
import {
  TransactionRequest,
  Provider,
  TransactionResponse,
  BlockTag,
  FeeData
} from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber } from '@ethersproject/bignumber';
import { Bytes } from '@ethersproject/bytes';
import { Deferrable } from '@ethersproject/properties';
import {
  ExternalProvider,
  JsonRpcSigner,
  Web3Provider
} from '@ethersproject/providers';

export class ExternalWallet extends Signer {
  readonly provider: Web3Provider;
  readonly signer: JsonRpcSigner;
  readonly alchemy?: Alchemy;

  constructor(provider?: ExternalProvider, alchemy?: Alchemy) {
    super();
    this.provider = new Web3Provider(provider || (window as any).ethereum);
    this.signer = this.provider.getSigner();
    this.alchemy = alchemy;
  }

  /** Convenience method for eth_requestAccounts */
  requestAccounts(): Promise<any> {
    return this.provider.send('eth_requestAccounts', []);
  }

  /** Convenience method for wallet_getPermissions */
  getPermissions(): Promise<any> {
    return this.provider.send('wallet_getPermissions', []);
  }

  getAddress(): Promise<string> {
    return this.signer.getAddress();
  }

  signMessage(message: string | Bytes): Promise<string> {
    return this.signer.signMessage(message);
  }

  signTransaction(
    transaction: Deferrable<TransactionRequest>
  ): Promise<string> {
    return this.signer.signTransaction(transaction);
  }

  connect(provider: Provider): Signer {
    return this.signer.connect(provider);
  }

  /**
   * Returns the balance of this wallet at blockTag.
   *
   * @param blockTag The block to check the balance of
   * @override
   */
  getBalance(blockTag?: BlockTag): Promise<BigNumber> {
    return this.signer.getBalance(blockTag);
  }

  /**
   * Returns the number of transactions this account has ever sent. This is the
   * value required to be included in transactions as the nonce.
   *
   * @param blockTag The block to check the transaction count on
   * @override
   */
  getTransactionCount(blockTag?: BlockTag): Promise<number> {
    return this.signer.getTransactionCount(blockTag);
  }

  /**
   * Returns the result of estimating the cost to send the transactionRequest,
   * with this account address being used as the from field.
   *
   * @param transaction Transaction to estimate the gas on
   * @override
   */
  estimateGas(transaction: Deferrable<TransactionRequest>): Promise<BigNumber> {
    return this.signer.estimateGas(transaction);
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
    return this.signer.call(transaction, blockTag);
  }

  /**
   * Populates all fields in a transaction, signs it and sends it to the network
   *
   * @override
   */
  sendTransaction(
    transaction: Deferrable<TransactionRequest>
  ): Promise<TransactionResponse> {
    return this.signer.sendTransaction(transaction);
  }

  /**
   * Returns the chain ID this wallet is connected to.
   *
   * @override
   */
  getChainId(): Promise<number> {
    return this.signer.getChainId();
  }

  /**
   * Returns the current gas price.
   *
   * @override
   */
  getGasPrice(): Promise<BigNumber> {
    return this.signer.getGasPrice();
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
    return this.signer.getFeeData();
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
    return this.signer.resolveName(name);
  }

  /** Forwards any relevant request to the send method in the Provider */
  send(method: string, params: any[]): Promise<any> {
    return this.provider.send(method, params);
  }
}
