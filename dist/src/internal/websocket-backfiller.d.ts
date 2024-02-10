export interface BatchPart {
    method: string;
    params?: any;
}
export interface NewHeadsEvent {
    author: string;
    difficulty: string;
    extraData: string;
    gasLimit: string;
    gasUsed: string;
    hash: string;
    logsBloom: string;
    miner: string;
    mixHash: string;
    nonce: string;
    number: string;
    parentHash: string;
    receiptsRoot: string;
    sealFields: string[];
    sha3Uncles: string;
    size: string;
    stateRoot: string;
    timestamp: string;
    transactionsRoot: string;
}
/** The return type of eth_getBlocksByHash. */
export interface BlockHead extends NewHeadsEvent {
    totalDifficulty: string;
    transactions: any[];
    uncles: string[];
}
export interface LogsEvent {
    address: string;
    blockHash: string;
    blockNumber: string;
    data: string;
    logIndex: string;
    topics: string[];
    transactionHash: string;
    transactionIndex: string;
    removed?: boolean;
}
export interface LogsSubscriptionFilter {
    address?: string | string[];
    topics?: Array<string | string[] | null>;
}
export interface GetLogsOptions extends LogsSubscriptionFilter {
    fromBlock?: string;
    toBlock?: string;
}
export declare function dedupeNewHeads(events: NewHeadsEvent[]): NewHeadsEvent[];
export declare function dedupeLogs(events: LogsEvent[]): LogsEvent[];
export declare function throwIfCancelled(isCancelled: () => boolean): void;
