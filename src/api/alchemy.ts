import { AlchemyConfig, Network } from '../types/types';
import {
  DEFAULT_ALCHEMY_API_KEY,
  DEFAULT_MAX_RETRIES,
  DEFAULT_NETWORK,
  getAlchemyHttpUrl,
  getAlchemyNftHttpUrl
} from '../util/const';
import { AlchemyProvider } from './alchemy-provider';
import { AlchemyWebSocketProvider } from './alchemy-websocket-provider';

/**
 * Entry point into the Alchemy SDK.
 *
 * @param config - Configuration object for the Alchemy SDK
 * @public
 */
export function initializeAlchemy(config?: AlchemyConfig): Alchemy {
  return new Alchemy(config);
}

/**
 * The Alchemy SDK client. This class holds config information and must be
 * passed into SDK methods.
 *
 * Do not call this constructor directly. Instead, use {@link initializeAlchemy}
 * to get an instance of the SDK.
 *
 * @public
 */
export class Alchemy {
  readonly apiKey: string;
  network: Network;
  readonly maxRetries: number;

  /**
   * @hideconstructor
   * @internal
   */
  constructor(config?: AlchemyConfig) {
    this.apiKey = config?.apiKey || DEFAULT_ALCHEMY_API_KEY;
    this.network = config?.network || DEFAULT_NETWORK;
    this.maxRetries = config?.maxRetries || DEFAULT_MAX_RETRIES;
  }

  /** @internal */
  getBaseUrl(): string {
    return getAlchemyHttpUrl(this.network, this.apiKey);
  }

  /** @internal */
  getNftUrl(): string {
    return getAlchemyNftHttpUrl(this.network, this.apiKey);
  }

  /**
   * Changes the network that the SDK requests data from.
   *
   * @param network - The network to change to.
   * @public
   */
  setNetwork(network: Network) {
    // TODO(ethers): Add support for changing the network in the returned provider.
    this.network = network;
  }
}

/** Creates an AlchemyProvider instance. Only one provider is created per Alchemy instance. */
export const getProvider: (alchemy: Alchemy) => AlchemyProvider =
  /*#__PURE__*/ (() => {
    let _baseAlchemyProvider: AlchemyProvider | undefined;
    return (alchemy: Alchemy) => {
      if (!_baseAlchemyProvider) {
        _baseAlchemyProvider = new AlchemyProvider(
          alchemy.network,
          alchemy.apiKey,
          alchemy.maxRetries
        );
      }
      return _baseAlchemyProvider;
    };
  })();

// prettier-ignore
// Ignoring prettier is required to preserve /*#__PURE__*/ annotation in build.
/**
 * Creates an AlchemyWebsocketProvider instance. Only one provider is created
 * per Alchemy instance.
 */
export const getWebsocketProvider: (
  alchemy: Alchemy
) => AlchemyWebSocketProvider = (/*#__PURE__*/ (() => {
  let _baseAlchemyWssProvider: AlchemyWebSocketProvider | undefined;
  return (alchemy: Alchemy) => {
    if (!_baseAlchemyWssProvider) {
      _baseAlchemyWssProvider = new AlchemyWebSocketProvider(
        alchemy.network,
        alchemy.apiKey
      );
    }
    return _baseAlchemyWssProvider;
  };
})());
