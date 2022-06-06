import { providers } from 'ethers';
import { Networkish } from '@ethersproject/networks';
import { DEFAULT_ALCHEMY_API_KEY, EthersNetwork } from '../util/const';
import { AlchemyProvider } from './alchemy-provider';
import { Listener } from '@ethersproject/abstract-provider';
import { Event } from '@ethersproject/providers/lib/base-provider';
import SturdyWebSocket from 'sturdy-websocket';
import { AlchemyEventType } from '../types/types';
import { BatchPart } from './websocket-backfiller';

function isAlchemyEvent(event: AlchemyEventType): event is object {
  return typeof event === 'object' && 'method' in event;
}

function getAlchemyEventTag(event: AlchemyEventType): string {
  if (!isAlchemyEvent(event)) {
    throw new Error('Event tag requires AlchemyEventType');
  }
  return 'alchemy:' + (('address' in event && event.address) || '*');
}

export type JsonRpcId = string | number | null;

export interface JsonRpcRequest {
  jsonrpc: '2.0';
  method: string;
  params?: any[];
  id?: JsonRpcId;
}

export class AlchemyWebSocketProvider
  extends providers.WebSocketProvider
  implements providers.CommunityResourcable
{
  readonly apiKey: string;

  constructor(network?: Networkish, apiKey?: any) {
    // Normalize the API Key to a string.
    apiKey = AlchemyProvider.getApiKey(apiKey);

    // Generate our own connection info with the correct endpoint URLs.
    const alchemyNetwork = AlchemyProvider.getAlchemyNetwork(network);
    const connection = AlchemyProvider.getAlchemyConnectionInfo(
      alchemyNetwork,
      apiKey,
      'wss'
    );

    // TODO: Add full WSS support and backfill
    const ws = new SturdyWebSocket(connection.url, 'alchemy-sdk', {
      wsConstructor: getWebSocketConstructor()
    });

    // Normalize the Alchemy named network input to the network names used by
    // ethers. This allows the parent super constructor in JsonRpcProvider to
    // correctly set the network.
    const ethersNetwork = EthersNetwork[alchemyNetwork];
    super(ws as any, ethersNetwork);
    this.apiKey = apiKey;
  }

  // TODO: Override `Listener` type to get type autocompletions.
  on(eventName: AlchemyEventType, listener: Listener): this {
    return this._addEventListener(eventName, listener, false);
  }

  /**
   * @internal
   * @override
   */
  _addEventListener(
    eventName: AlchemyEventType,
    listener: Listener,
    once: boolean
  ): this {
    if (isAlchemyEvent(eventName)) {
      const event = new EthersEvent(
        getAlchemyEventTag(eventName),
        listener,
        once
      );
      this._events.push(event);
      this._startEvent(event);
      return this;
    } else {
      return super._addEventListener(eventName, listener, once);
    }
  }

  /**
   * Overrides the `_startEvent()` method in {@link providers.WebSocketProvider}
   * to include additional alchemy methods.
   *
   * @param event
   * @override
   * @internal
   */
  _startEvent(event: EthersEvent): void {
    // Check if the event type is a custom Alchemy subscription.
    if (event.type === 'alchemy') {
      const { address } = event;
      if (!!address) {
        void this._subscribe(
          event.tag,
          ['alchemy_filteredNewFullPendingTransactions', { address }],
          res => {
            this.emit(
              {
                method: 'alchemy_filteredNewFullPendingTransactions',
                address
              },
              res
            );
          }
        );
      } else {
        void this._subscribe(
          event.tag,
          ['alchemy_newFullPendingTransactions'],
          res => {
            this.emit({ method: 'alchemy_newFullPendingTransactions' }, res);
          }
        );
      }
    } else {
      super._startEvent(event);
    }
  }

  // TODO: implement sendBatch.
  async sendBatch(parts: BatchPart[]): Promise<any[]> {
    console.log('parts', parts);
    throw new Error('not implemented');
  }

  /**
   * DO NOT MODIFY.
   *
   * Original code copied over from {@link providers.BaseProvider}.
   *
   * This method is copied over directly in order to implement Alchemy's unique
   * subscription types. The only difference is that this method calls
   * {@link getAlchemyEventTag} instead of the original `getEventTag()` method in
   * order to parse the Alchemy subscription event.
   *
   * @internal
   * @override
   */
  emit(eventName: AlchemyEventType, ...args: Array<any>): boolean {
    if (isAlchemyEvent(eventName)) {
      let result = false;

      const stopped: Array<Event> = [];

      // This line is the only modified line from the original method.
      const eventTag = getAlchemyEventTag(eventName);

      this._events = this._events.filter(event => {
        if (event.tag !== eventTag) {
          return true;
        }

        setTimeout(() => {
          event.listener.apply(this, args);
        }, 0);

        result = true;

        if (event.once) {
          stopped.push(event);
          return false;
        }

        return true;
      });

      stopped.forEach(event => {
        this._stopEvent(event);
      });

      return result;
    } else {
      return super.emit(eventName, ...args);
    }
  }

  /**
   * Overrides the ether's `isCommunityResource()` method. Returns true if the
   * current api key is the default key.
   *
   * @override
   */
  isCommunityResource(): boolean {
    return this.apiKey === DEFAULT_ALCHEMY_API_KEY;
  }
}

export class EthersEvent extends Event {
  get address(): string | null {
    const comps = this.tag.split(':');
    if (comps[0] !== 'alchemy') {
      return null;
    }
    if (comps[1] && comps[1] !== '*') {
      return comps[1];
    } else {
      return null;
    }
  }
}

function getWebSocketConstructor(): any {
  return isNodeEnvironment() ? require('ws') : WebSocket;
}

function isNodeEnvironment(): boolean {
  return (
    typeof process !== 'undefined' &&
    process != null &&
    process.versions != null &&
    process.versions.node != null
  );
}
