'use strict';
/** This is the main entry point for the library and exports user-facing API. */

// IMPORTANT: when adding namespace imports (imports of the form
// `import * as X from "./y"`), be sure to also update rollup.config.js so they
// will be treeshaken correctly.

// Namespace imports here:

import * as Utils from './api/utils';
export { Utils };

// End namespace imports

export * from './types/types';

export { Alchemy } from './api/alchemy';

export { Wallet } from './api/alchemy-wallet';

export { Contract, ContractFactory } from './api/alchemy-contract';

export type { AlchemyConfig } from './api/alchemy-config';

export type { AlchemyProvider } from './api/alchemy-provider';

export type { AlchemyWebSocketProvider } from './api/alchemy-websocket-provider';

export type { NftNamespace } from './api/nft-namespace';

export type { WebSocketNamespace } from './api/websocket-namespace';

export type { CoreNamespace } from './api/core-namespace';

export type { TransactNamespace } from './api/transact-namespace';

export type { BaseNftContract, NftContract, Nft, BaseNft } from './api/nft';

export { fromHex, toHex, isHex } from './api/util';

export { setLogLevel, LogLevelString as LogLevel } from './util/logger';
