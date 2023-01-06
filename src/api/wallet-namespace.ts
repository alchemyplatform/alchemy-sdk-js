import type { TransactionRequest } from '@ethersproject/abstract-provider';
import type { Signer } from '@ethersproject/abstract-signer';
import { BigNumber } from '@ethersproject/bignumber';
import type { Bytes } from '@ethersproject/bytes';
import { Deferrable } from '@ethersproject/properties';

import {
  AddEthereumChainParams,
  Network,
  RequestedPermissions,
  Web3WalletPermission
} from '../types/types';
import { NetworkToChainId } from '../util/const';
import { AlchemyConfig } from './alchemy-config';
import { toHex } from './util';

/**
 * The Wallet namespace contains methods used for connecting an external wallet
 * (such as Metamask) as a standard Externally Owned Account (EOA).
 *
 * To use the Wallet namespace, pass in the external wallet
 * via the {@link AlchemySettings.walletProvider} property when instantiating
 * {@link Alchemy}.
 *
 * This namespace contains methods implemented by external wallet providers
 * to interact with an EOA, such getting/request permissions, signing messages,
 * and signing transactions. For standard requests such as estimateGas,
 * sendTransaction, use the methods in the {@link TransactNamespace} or the
 * {@link CoreNamespace}.
 *
 * @public
 */
export class WalletNamespace {
  /** @internal */
  constructor(private readonly config: AlchemyConfig) {}

  /**
   * Returns an array containing a single address of the connected account.
   */
  async requestAccounts(): Promise<string[]> {
    const provider = await this.config.getWalletProvider();
    return provider.send('eth_requestAccounts', []);
  }

  /**
   * Returns an array of the caller's permissions.
   */
  async getPermissions(): Promise<Web3WalletPermission[]> {
    const provider = await this.config.getWalletProvider();
    return provider.send('wallet_getPermissions', []);
  }

  /**
   * Requests the provided permissions from the connected account.
   *
   * @param params The permissions to request.
   */
  async requestPermissions(params: Array<RequestedPermissions>): Promise<void> {
    const provider = await this.config.getWalletProvider();
    await provider.send('wallet_requestPermissions', params);
  }

  /**
   * Creates confirmation asking the connected account to add the specified
   * chain.
   *
   * @param newChain The new chain to add.
   */
  async addEthereumChain(newChain: AddEthereumChainParams): Promise<void> {
    const provider = await this.config.getWalletProvider();
    return provider.send('wallet_addEthereumChain', [newChain]);
  }

  /**
   * Creates confirmation asking the connected account to switch to the
   * specified chain.
   *
   * @param chain The chain id to switch to. This can be a {@link Network} enum,
   * a chain id number, or the hex string equivalent.
   */
  async switchEthereumChain(chain: Network | string | number): Promise<void> {
    const provider = await this.config.getWalletProvider();
    let chainId: string;
    if (typeof chain === 'number') {
      chainId = toHex(chain);
    } else if (chain in NetworkToChainId) {
      chainId = NetworkToChainId[chain];
    } else {
      chainId = chain;
    }
    return provider.send('wallet_switchEthereumChain', [{ chainId }]);
  }

  /**
   * Returns the address of the currently connected wallet.
   */
  async getAddress(): Promise<string> {
    const provider = await this.config.getWalletProvider();
    return provider.getSigner().getAddress();
  }

  /**
   * Creates a confirmation for the connected account to sign the provided
   * message.
   *
   * @param message The message to sign.
   */
  async signMessage(message: string | Bytes): Promise<string> {
    const provider = await this.config.getWalletProvider();
    return provider.getSigner().signMessage(message);
  }

  /**
   * Creates a confirmation for the connected account to sign the provided
   * transaction.
   *
   * To send the transaction, use the methods in the {@link TransactNamespace}.
   * @param transaction
   */
  async signTransaction(
    transaction: Deferrable<TransactionRequest>
  ): Promise<string> {
    const provider = await this.config.getWalletProvider();
    return provider.getSigner().signTransaction(transaction);
  }

  /**
   * Returns the underlying {@link Signer} object .
   */
  async getSigner(): Promise<Signer> {
    const provider = await this.config.getWalletProvider();
    return provider.getSigner();
  }

  /**
   * Returns the netowrk or chain id that the external account is currently
   * connected to.
   */
  async getChainId(): Promise<any> {
    const provider = await this.config.getWalletProvider();
    return provider.getNetwork();
  }

  /**
   * Returns the balance of the currently connected external account.
   */
  async getBalance(): Promise<BigNumber> {
    const provider = await this.config.getProvider();
    return provider.getBalance(this.getAddress());
  }
}
