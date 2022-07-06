import {
  LogsEvent,
  LogsSubscriptionFilter,
  NewHeadsEvent
} from './websocket-backfiller';
import { EventType, Filter, Listener } from '@ethersproject/abstract-provider';

type JsonRpcId = string | number | null;

export interface JsonRpcRequest {
  jsonrpc: '2.0';
  method: string;
  params?: any[];
  id?: JsonRpcId;
}

export interface VirtualSubscription {
  event: EthersEvent;
  virtualId: string;
  physicalId: string;
  method: string;
  params: any[];
  isBackfilling: boolean;
  startingBlockNumber: number;
  sentEvents: any[];
  backfillBuffer: any[];
}

export interface JsonRpcResponse<T = any> {
  jsonrpc: '2.0';
  result?: T;
  error?: JsonRpcError;
  id: JsonRpcId;
}

interface JsonRpcError<T = any> {
  code: number;
  message: string;
  data?: T;
}

export interface NewHeadsSubscription extends VirtualSubscription {
  method: 'eth_subscribe';
  params: ['newHeads'];
  isBackfilling: boolean;
  sentEvents: NewHeadsEvent[];
  backfillBuffer: NewHeadsEvent[];
}

export interface LogsSubscription extends VirtualSubscription {
  method: 'eth_subscribe';
  params: ['logs', LogsSubscriptionFilter?];
  isBackfilling: boolean;
  sentEvents: LogsEvent[];
  backfillBuffer: LogsEvent[];
}

export type WebSocketMessage = SingleOrBatchResponse | SubscriptionEvent;
export type SingleOrBatchResponse = JsonRpcResponse | JsonRpcResponse[];

/**
 * DO NOT MODIFY.
 *
 * Event class copied directly over from ethers.js's `BaseProvider` class.
 *
 * This class is used to represent events and their corresponding listeners. The
 * SDK needs to extend this class in order to support Alchemy's custom
 * Subscription API types. The original class is not exported by ethers. Minimal
 * changes have been made in order to get TS to compile.
 */
class Event {
  readonly listener: Listener;
  readonly once: boolean;
  readonly tag: string;

  _lastBlockNumber: number;
  _inflight: boolean;

  constructor(tag: string, listener: Listener, once: boolean) {
    this.listener = listener;
    this.tag = tag;
    this.once = once;
    this._lastBlockNumber = -2;
    this._inflight = false;
  }

  get event(): EventType {
    switch (this.type) {
      case 'tx':
        return this.hash!;
      case 'filter':
        return this.filter!;
      default:
        return this.tag;
    }
  }

  get type(): string {
    return this.tag.split(':')[0];
  }

  get hash(): string {
    const comps = this.tag.split(':');
    if (comps[0] !== 'tx') {
      throw new Error('Not a transaction event');
    }
    return comps[1];
  }

  get filter(): Filter {
    const comps = this.tag.split(':');
    if (comps[0] !== 'filter') {
      throw new Error('Not a transaction event');
    }
    const address = comps[1];

    const topics = deserializeTopics(comps[2]);
    const filter: Filter = {};

    if (topics.length > 0) {
      filter.topics = topics;
    }
    if (address && address !== '*') {
      filter.address = address;
    }

    return filter;
  }

  pollable(): boolean {
    const PollableEvents = ['block', 'network', 'pending', 'poll'];
    return this.tag.indexOf(':') >= 0 || PollableEvents.indexOf(this.tag) >= 0;
  }
}

/**
 * Wrapper class around the ethers `Event` class in order to add support for
 * Alchemy's custom subscriptions types.
 *
 * @internal
 */
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

/** @internal */
export interface SubscriptionEvent<T = any> {
  jsonrpc: '2.0';
  method: 'eth_subscription';
  params: {
    subscription: string;
    result: T;
  };
}

function deserializeTopics(data: string): any {
  if (data === '') {
    return [];
  }

  return data.split(/&/g).map(topic => {
    if (topic === '') {
      return [];
    }

    const comps = topic.split('|').map(topic => {
      return topic === 'null' ? null : topic;
    });

    return comps.length === 1 ? comps[0] : comps;
  });
}
