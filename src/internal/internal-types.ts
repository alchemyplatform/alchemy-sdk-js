import {
  LogsEvent,
  LogsSubscriptionFilter,
  NewHeadsEvent
} from './websocket-backfiller';
import { Event } from '@ethersproject/providers/lib/base-provider';

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
 * Wrapper class around the {@link Event} class in order to add support for
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
