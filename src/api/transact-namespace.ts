import { AlchemyConfig } from './alchemy-config';
import { GasStationPrice, SendPrivateTransactionOptions } from '../types/types';
import { toHex } from './util';
import {
  TransactionReceipt,
  TransactionResponse
} from '@ethersproject/abstract-provider';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export class TransactNamespace {
  constructor(private readonly config: AlchemyConfig) {}

  /**
   * Used to send a single transaction to Flashbots. Flashbots will attempt to
   * send the transaction to miners for the next 25 blocks.
   *
   * Returns the transaction hash of the submitted transaction.
   *
   * @param signedTransaction The raw, signed transaction as a hash.
   * @param maxBlockNumber Optional hex-encoded number string. Highest block
   *   number in which the transaction should be included.
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
   * Returns the current recommended fast, standard and safe low gas prices on
   * the Ethereum network, along with the current block and wait times for each "speed".
   *
   * This endpoint is powered by the .EthGasStation API. See
   * {@link https://docs.ethgasstation.info/gas-price)} for more information.
   *
   * @param apiKey Optional API key to use for the request. An API key is not
   *   required, but you may get rate limited at higher request volumes. To
   *   obtain an api key, visit EthGasStation.
   */
  async ethGasStationPrice(apiKey?: string): Promise<GasStationPrice> {
    let gasUrl = 'https://ethgasstation.info/api/ethgasAPI.json';
    gasUrl = apiKey ? `${gasUrl}?api-key=${apiKey}` : gasUrl;
    const config: AxiosRequestConfig = {
      method: 'get',
      url: gasUrl
    };
    const response: AxiosResponse<GasStationPrice> = await axios(config);
    return response.data;
  }
}
