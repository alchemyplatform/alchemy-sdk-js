import { Alchemy } from '@alch/alchemy-sdk';
import { TransactionRequest, Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { Bytes } from '@ethersproject/bytes';
import { Deferrable } from '@ethersproject/properties';
import {
  ExternalProvider,
  JsonRpcSigner,
  Web3Provider
} from '@ethersproject/providers';
import { RequestedPermissions } from '../types/types';

/**
 * The ExternalWallet class inherits Signer and can sign transactions and
 * messages using an external wallet (such as Metamask) as a standard Externally
 * Owned Account (EOA).
 *
 * Importantly, requests sent to the ExternalWallet are sent via the
 * ExternalWallet's Provider, not the Alchemy object.
 *
 * The ExternalWallet has only a small subset of the Wallet's API surface. For
 * standard requests such as estimateGas, sendTransaction, we recommend you use
 * an Alchemy object for requests such as estimateGas, sendTransaction, etc.
 *
 * @public
 * @override
 */
export class ExternalWallet extends Signer {
  readonly provider: Web3Provider;
  readonly signer: JsonRpcSigner;
  readonly alchemy?: Alchemy;

  constructor(provider?: ExternalProvider) {
    super();
    this.provider = new Web3Provider(provider || (window as any).ethereum);
    this.signer = this.provider.getSigner();
  }

  /** The following methods are convenience methods for common wallet-specific requests. */

  requestAccounts(): Promise<any> {
    return this.provider.send('eth_requestAccounts', []);
  }

  getPermissions(): Promise<any> {
    return this.provider.send('wallet_getPermissions', []);
  }

  requestPermissions(params: Array<RequestedPermissions>): Promise<any> {
    return this.provider.send('wallet_requestPermissions', params);
  }

  /** The following methods are required to extend Signer. */

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
   * Forwards any other relevant Wallet requests to the Wallet's Provider. Note
   * that the send method forwards to the ExternalWallet's Provider, not the
   * Alchemy object.
   *
   * We recommend only sending wallet-specific queries - like eth_requestAccounts!
   */
  send(method: string, params: any[]): Promise<any> {
    return this.provider.send(method, params);
  }
}
