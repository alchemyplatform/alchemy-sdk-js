import {
  AlchemySettings,
} from '../types/types';
import { NftModule } from './nft-module';
import { WebSocketModule } from './websocket-module';
import { AlchemyConfig } from './alchemy-config';
import { EnhancedModule } from './enhanced-module';
import { RpcModule } from './rpc-module';

/**
 * The Alchemy SDK client. This class is the main entry point into Alchemy's
 * APIs and separates functionality into different modules.
 *
 * Each SDK instance is associated with a specific network and API key. To use a
 * different network or API key, create a new instance of {@link Alchemy}.
 *
 * @public
 */
export class Alchemy {
  readonly rpc: RpcModule
  readonly enhanced: EnhancedModule
  readonly nft: NftModule;
  readonly ws: WebSocketModule;
  readonly config: AlchemyConfig;

  /**
   * @param {string} [settings.apiKey] - The API key to use for Alchemy
   * @param {Network} [settings.network] - The network to use for Alchemy
   * @param {number} [settings.maxRetries] - The maximum number of retries to attempt
   * @public
   */
  constructor(settings?: AlchemySettings) {
    this.config = new AlchemyConfig(settings);

    this.rpc = new RpcModule(this.config);
    this.enhanced = new EnhancedModule(this.config);
    this.nft = new NftModule(this.config);
    this.ws = new WebSocketModule(this.config);
  }
}
