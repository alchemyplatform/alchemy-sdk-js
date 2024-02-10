/** This file contains internal types used by the SDK and are not exposed to the end user. */
declare type JsonRpcId = string | number | null;
/**
 * Prefix for `alchemy_pendingTransactions` subscriptions when serializing to
 * ethers events.
 *
 * This tag is used internally by ethers to track different event filters.
 */
export declare const ALCHEMY_PENDING_TRANSACTIONS_EVENT_TYPE = "alchemy-pending-transactions";
/**
 * Prefix for `alchemy_minedTransactions` subscriptions when serializing to ethers events.
 *
 * This tag is used internally by ethers to track different event filters.
 */
export declare const ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE = "alchemy-mined-transactions";
/**
 * Array containing all the custom event tags used internally by ethers to track
 * event filters.
 */
export declare const ALCHEMY_EVENT_TYPES: string[];
export interface JsonRpcRequest {
    jsonrpc: '2.0';
    method: string;
    params?: any[];
    id?: JsonRpcId;
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
export declare type WebSocketMessage = SingleOrBatchResponse | SubscriptionEvent;
export declare type SingleOrBatchResponse = JsonRpcResponse | JsonRpcResponse[];
export interface SubscriptionEvent<T = any> {
    jsonrpc: '2.0';
    method: 'eth_subscription';
    params: {
        subscription: string;
        result: T;
    };
}
export {};
