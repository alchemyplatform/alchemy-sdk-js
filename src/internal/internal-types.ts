import { EventType, Filter, Listener } from '@ethersproject/abstract-provider';

import { EthersEvent, deserializeTopics } from './ethers-event';
import {
  LogsEvent,
  LogsSubscriptionFilter,
  NewHeadsEvent
} from './websocket-backfiller';

/** This file contains internal types used by the SDK and are not exposed to the end user. */

type JsonRpcId = string | number | null;

/**
 * Prefix for `alchemy_pendingTransactions` subscriptions when serializing to
 * ethers events.
 *
 * This tag is used internally by ethers to track different event filters.
 */
export const ALCHEMY_PENDING_TRANSACTIONS_EVENT_TYPE =
  'alchemy-pending-transactions';

/**
 * Prefix for `alchemy_minedTransactions` subscriptions when serializing to ethers events.
 *
 * This tag is used internally by ethers to track different event filters.
 */
export const ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE =
  'alchemy-mined-transactions';

/**
 * Array containing all the custom event tags used internally by ethers to track
 * event filters.
 */
export const ALCHEMY_EVENT_TYPES = [
  ALCHEMY_PENDING_TRANSACTIONS_EVENT_TYPE,
  ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE
];

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
export interface SubscriptionEvent<T = any> {
  jsonrpc: '2.0';
  method: 'eth_subscription';
  params: {
    subscription: string;
    result: T;
  };
}

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
export class Event {
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
