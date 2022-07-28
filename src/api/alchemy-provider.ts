import {
  JsonRpcProvider,
  CommunityResourcable
} from '@ethersproject/providers';
import {
  Network as NetworkFromEthers,
  Networkish
} from '@ethersproject/networks';
import { ConnectionInfo } from '@ethersproject/web';
import {
  DEFAULT_ALCHEMY_API_KEY,
  DEFAULT_NETWORK,
  EthersNetwork,
  getAlchemyHttpUrl,
  getAlchemyWsUrl
} from '../util/const';
import { Network } from '../types/types';
import { logError, logWarn } from '../util/logger';
import { VERSION } from '../version';
import { IS_BROWSER } from '../util/util';
import { AlchemyConfig } from './alchemy-config';
import { deepCopy, shallowCopy } from '@ethersproject/properties';
import { toUtf8Bytes, toUtf8String } from '@ethersproject/strings';
import { Logger } from '@ethersproject/logger';
import {
  decode as base64Decode,
  encode as base64Encode
} from '@ethersproject/base64/lib/base64';
import { hexlify, isBytesLike } from '@ethersproject/bytes';

/**
 * SDK's custom implementation of ethers.js's 'AlchemyProvider'.
 *
 * Do not call this constructor directly. Instead, instantiate an instance of
 * {@link Alchemy} and call {@link Alchemy.config.getProvider()}.
 *
 * @public
 */
export class AlchemyProvider
  extends JsonRpcProvider
  implements CommunityResourcable
{
  readonly apiKey: string;
  readonly maxRetries: number;

  /** @internal */
  constructor(config: AlchemyConfig) {
    // If a hardcoded url was specified in the config, use that instead of the
    // provided apiKey or network.
    if (config.url !== undefined) {
      super(config.url);
    } else {
      // Normalize the API Key to a string.
      const apiKey = AlchemyProvider.getApiKey(config.apiKey);

      // Generate our own connection info with the correct endpoint URLs.
      const alchemyNetwork = AlchemyProvider.getAlchemyNetwork(config.network);
      const connection = AlchemyProvider.getAlchemyConnectionInfo(
        alchemyNetwork,
        apiKey,
        'http'
      );

      // Normalize the Alchemy named network input to the network names used by
      // ethers. This allows the parent super constructor in JsonRpcProvider to
      // correctly set the network.
      const ethersNetwork = EthersNetwork[alchemyNetwork];
      super(connection, ethersNetwork);
    }

    this.apiKey = config.apiKey;
    this.maxRetries = config.maxRetries;
  }

  /**
   * Overrides the `UrlJsonRpcProvider.getApiKey` method as implemented by
   * ethers.js. Returns the API key for an Alchemy provider.
   *
   * @internal
   * @override
   */
  static getApiKey(apiKey: any): string {
    if (apiKey == null) {
      return DEFAULT_ALCHEMY_API_KEY;
    }
    if (apiKey && typeof apiKey !== 'string') {
      throw new Error(
        `Invalid apiKey '${apiKey}' provided. apiKey must be a string.`
      );
    }
    return apiKey;
  }

  /**
   * Converts the `Networkish` input to the network enum used by Alchemy.
   *
   * @internal
   */
  static getAlchemyNetwork(network?: Networkish): Network {
    if (network === undefined) {
      return DEFAULT_NETWORK;
    }

    if (typeof network === 'number') {
      throw new Error(
        `Invalid network '${network}' provided. Network must be a string.`
      );
    }

    // Guaranteed that `typeof network === 'string`.
    const isValidNetwork = Object.values(Network).includes(network as Network);
    if (!isValidNetwork) {
      throw new Error(
        `Invalid network '${network}' provided. Network must be one of: ` +
          `${Object.values(Network).join(', ')}.`
      );
    }
    return network as Network;
  }

  /**
   * Returns a {@link ConnectionInfo} object compatible with ethers that contains
   * the correct URLs for Alchemy.
   *
   * @internal
   */
  static getAlchemyConnectionInfo(
    network: Network,
    apiKey: string,
    type: 'wss' | 'http'
  ): ConnectionInfo {
    const url =
      type === 'http'
        ? getAlchemyHttpUrl(network, apiKey)
        : getAlchemyWsUrl(network, apiKey);
    return {
      headers: IS_BROWSER
        ? {
            'Alchemy-Ethers-Sdk-Version': VERSION
          }
        : {
            'Alchemy-Ethers-Sdk-Version': VERSION,
            'Accept-Encoding': 'gzip'
          },
      allowGzip: true,
      url
    };
  }

  /**
   * Overrides the method in ethers.js's `StaticJsonRpcProvider` class. This
   * method is called when calling methods on the parent class `BaseProvider`.
   *
   * @override
   */
  async detectNetwork(): Promise<NetworkFromEthers> {
    let network = this.network;
    if (network == null) {
      network = await super.detectNetwork();

      if (!network) {
        throw new Error('No network detected');
      }
    }
    return network;
  }

  _startPending(): void {
    logWarn('WARNING: Alchemy Provider does not support pending filters');
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

  /**
   * Overrides the base {@link JsonRpcProvider.send} method to implement custom
   * logic for sending requests to Alchemy.
   *
   * @param method The method name to use for the request.
   * @param params The parameters to use for the request.
   * @override
   * @public
   */
  // TODO: Implement sender logic to override retries and backoff.
  send(method: string, params: Array<any>): Promise<any> {
    return this._send(method, params, 'send');
  }

  _send(method: string, params: Array<any>, methodName: string): Promise<any> {
    console.log('methodName', methodName);
    const request = {
      method,
      params,
      id: this._nextId++,
      jsonrpc: '2.0'
    };

    this.emit('debug', {
      action: 'request',
      request: deepCopy(request),
      provider: this
    });

    // We can expand this in the future to any call, but for now these
    // are the biggest wins and do not require any serializing parameters.
    const cache = ['eth_chainId', 'eth_blockNumber'].indexOf(method) >= 0;
    if (cache && this._cache[method]) {
      return this._cache[method];
    }

    const result = fetchJson(
      this.connection,
      JSON.stringify(request),
      getResult
    ).then(
      result => {
        this.emit('debug', {
          action: 'response',
          request,
          response: result,
          provider: this
        });

        return result;
      },
      error => {
        this.emit('debug', {
          action: 'response',
          error,
          request,
          provider: this
        });

        throw error;
      }
    );

    // Cache the fetch, but clear it on the next event loop
    if (cache) {
      this._cache[method] = result;
      setTimeout(() => {
        // @ts-ignore - This is done by ethers.
        this._cache[method] = null;
      }, 0);
    }

    return result;
  }
}

function getResult(payload: {
  error?: { code?: number; data?: any; message?: string };
  result?: any;
}): any {
  if (payload.error) {
    const error: any = new Error(payload.error.message);
    error.code = payload.error.code;
    error.data = payload.error.data;
    throw error;
  }

  return payload.result;
}

function fetchJson(
  connection: string | ConnectionInfo,
  json?: string,
  processFunc?: (value: any, response: FetchJsonResponse) => any
): Promise<any> {
  const processJsonFunc = (value: Uint8Array, response: FetchJsonResponse) => {
    let result: any = null;
    if (value != null) {
      try {
        result = JSON.parse(toUtf8String(value));
      } catch (error) {
        logError('invalid JSON', {
          body: value,
          error
        });
      }
    }

    if (processFunc) {
      result = processFunc(result, response);
    }

    return result;
  };

  // If we have json to send, we must
  // - add content-type of application/json (unless already overridden)
  // - convert the json to bytes
  let body: Uint8Array | undefined = undefined;
  if (json != null) {
    body = toUtf8Bytes(json);

    // Create a connection with the content-type set for JSON
    const updated: ConnectionInfo =
      typeof connection === 'string'
        ? { url: connection }
        : shallowCopy(connection);
    if (updated.headers) {
      const hasContentType =
        Object.keys(updated.headers).filter(
          k => k.toLowerCase() === 'content-type'
        ).length !== 0;
      if (!hasContentType) {
        updated.headers = shallowCopy(updated.headers);
        updated.headers['content-type'] = 'application/json';
      }
    } else {
      updated.headers = { 'content-type': 'application/json' };
    }
    connection = updated;
  }

  return _fetchData<any>(connection, body, processJsonFunc);
}

function _fetchData<T = Uint8Array>(
  connection: string | ConnectionInfo,
  body?: Uint8Array,
  processFunc?: (value: Uint8Array, response: FetchJsonResponse) => T
): Promise<T> {
  const logger = new Logger(VERSION);
  // How many times to retry in the event of a throttle
  const attemptLimit =
    typeof connection === 'object' && connection.throttleLimit != null
      ? connection.throttleLimit
      : 12;

  const throttleCallback =
    typeof connection === 'object' ? connection.throttleCallback : null;
  const throttleSlotInterval =
    typeof connection === 'object' &&
    typeof connection.throttleSlotInterval === 'number'
      ? connection.throttleSlotInterval
      : 100;

  const errorPassThrough =
    typeof connection === 'object' ? !!connection.errorPassThrough : false;

  const headers: { [key: string]: Header } = {};

  let url: string | null = null;

  // @TODO: Allow ConnectionInfo to override some of these values
  const options: Options = {
    method: 'GET'
  };

  let allow304 = false;

  let timeout = 2 * 60 * 1000;

  if (typeof connection === 'string') {
    url = connection;
  } else if (typeof connection === 'object') {
    if (connection == null || connection.url == null) {
      logError('missing URL', 'connection.url', connection);
    }

    url = connection.url;

    if (typeof connection.timeout === 'number' && connection.timeout > 0) {
      timeout = connection.timeout;
    }

    if (connection.headers) {
      for (const key in connection.headers) {
        headers[key.toLowerCase()] = {
          key,
          value: String(connection.headers[key])
        };
        if (
          ['if-none-match', 'if-modified-since'].indexOf(key.toLowerCase()) >= 0
        ) {
          allow304 = true;
        }
      }
    }

    options.allowGzip = !!connection.allowGzip;

    if (connection.user != null && connection.password != null) {
      if (
        url.substring(0, 6) !== 'https:' &&
        connection.allowInsecureAuthentication !== true
      ) {
        logger.throwError(
          'basic authentication requires a secure https url',
          Logger.errors.INVALID_ARGUMENT,
          {
            argument: 'url',
            url,
            user: connection.user,
            password: '[REDACTED]'
          }
        );
      }

      const authorization = connection.user + ':' + connection.password;
      headers['authorization'] = {
        key: 'Authorization',
        value: 'Basic ' + base64Encode(toUtf8Bytes(authorization))
      };
    }

    if (connection.skipFetchSetup != null) {
      options.skipFetchSetup = !!connection.skipFetchSetup;
    }
  }
  const reData = new RegExp('^data:([a-z0-9-]+/[a-z0-9-]+);base64,(.*)$', 'i');
  const dataMatch = url ? url.match(reData) : null;
  if (dataMatch) {
    try {
      const response = {
        statusCode: 200,
        statusMessage: 'OK',
        headers: { 'content-type': dataMatch[1] },
        body: base64Decode(dataMatch[2])
      };

      let result: T = <T>(<unknown>response.body);
      if (processFunc) {
        result = processFunc(response.body, response);
      }
      return Promise.resolve(<T>(<unknown>result));
    } catch (error) {
      logger.throwError(
        'processing response error',
        Logger.errors.SERVER_ERROR,
        {
          body: bodyify(dataMatch[1], dataMatch[2]),
          error,
          requestBody: null,
          requestMethod: 'GET',
          url
        }
      );
    }
  }

  if (body) {
    options.method = 'POST';
    options.body = body;
    if (headers['content-type'] == null) {
      headers['content-type'] = {
        key: 'Content-Type',
        value: 'application/octet-stream'
      };
    }
    if (headers['content-length'] == null) {
      headers['content-length'] = {
        key: 'Content-Length',
        value: String(body.length)
      };
    }
  }

  const flatHeaders: { [key: string]: string } = {};
  Object.keys(headers).forEach(key => {
    const header = headers[key];
    flatHeaders[header.key] = header.value;
  });
  options.headers = flatHeaders;

  const runningTimeout = (function () {
    let timer: NodeJS.Timer | null = null;
    const promise: Promise<never> = new Promise((_resolve, reject) => {
      if (timeout) {
        timer = setTimeout(() => {
          if (timer == null) {
            return;
          }
          timer = null;

          reject(
            logger.makeError('timeout', Logger.errors.TIMEOUT, {
              requestBody: bodyify(options.body, flatHeaders['content-type']),
              requestMethod: options.method,
              timeout,
              url
            })
          );
        }, timeout);
      }
    });

    const cancel = function () {
      if (timer == null) {
        return;
      }
      clearTimeout(timer);
      timer = null;
    };

    return { promise, cancel };
  })();

  const runningFetch = (async function () {
    for (let attempt = 0; attempt < attemptLimit; attempt++) {
      let response: GetUrlResponse;

      try {
        response = await getUrl(url!, options);

        if (attempt < attemptLimit) {
          if (response.statusCode === 301 || response.statusCode === 302) {
            // Redirection; for now we only support absolute locataions
            const location = response.headers.location || '';
            if (options.method === 'GET' && location.match(/^https:/)) {
              url = response.headers.location;
              continue;
            }
          } else if (response.statusCode === 429) {
            // Exponential back-off throttling
            let tryAgain = true;
            if (throttleCallback) {
              tryAgain = await throttleCallback(attempt, url!);
            }

            if (tryAgain) {
              let stall = 0;

              const retryAfter = response.headers['retry-after'];
              if (
                typeof retryAfter === 'string' &&
                retryAfter.match(/^[1-9][0-9]*$/)
              ) {
                stall = parseInt(retryAfter) * 1000;
              } else {
                stall =
                  throttleSlotInterval *
                  parseInt(String(Math.random() * Math.pow(2, attempt)));
              }

              //console.log("Stalling 429");
              await staller(stall);
              continue;
            }
          }
        }
      } catch (error) {
        response = (<any>error).response;
        if (response == null) {
          runningTimeout.cancel();
          logger.throwError('missing response', Logger.errors.SERVER_ERROR, {
            requestBody: bodyify(options.body, flatHeaders['content-type']),
            requestMethod: options.method,
            serverError: error,
            url
          });
        }
      }

      let body: Uint8Array | null = response.body;

      if (allow304 && response.statusCode === 304) {
        body = null;
      } else if (
        !errorPassThrough &&
        (response.statusCode < 200 || response.statusCode >= 300)
      ) {
        runningTimeout.cancel();
        logger.throwError('bad response', Logger.errors.SERVER_ERROR, {
          status: response.statusCode,
          headers: response.headers,
          body: bodyify(
            body,
            response.headers ? response.headers['content-type'] : null
          ),
          requestBody: bodyify(options.body, flatHeaders['content-type']),
          requestMethod: options.method,
          url
        });
      }

      if (processFunc) {
        try {
          const result = await processFunc(body!, response);
          runningTimeout.cancel();
          return result;
        } catch (error: any) {
          // Allow the processFunc to trigger a throttle
          if (error.throttleRetry && attempt < attemptLimit) {
            let tryAgain = true;
            if (throttleCallback) {
              tryAgain = await throttleCallback(attempt, url!);
            }

            if (tryAgain) {
              const timeout =
                throttleSlotInterval *
                parseInt(String(Math.random() * Math.pow(2, attempt)));
              //console.log("Stalling callback");
              await staller(timeout);
              continue;
            }
          }

          runningTimeout.cancel();
          logger.throwError(
            'processing response error',
            Logger.errors.SERVER_ERROR,
            {
              body: bodyify(
                body,
                response.headers ? response.headers['content-type'] : null
              ),
              error,
              requestBody: bodyify(options.body, flatHeaders['content-type']),
              requestMethod: options.method,
              url
            }
          );
        }
      }

      runningTimeout.cancel();

      // If we had a processFunc, it either returned a T or threw above.
      // The "body" is now a Uint8Array.
      return <T>(<unknown>body);
    }

    return logger.throwError('failed response', Logger.errors.SERVER_ERROR, {
      requestBody: bodyify(options.body, flatHeaders['content-type']),
      requestMethod: options.method,
      url
    });
  })();

  return Promise.race([runningTimeout.promise, runningFetch]);
}

function bodyify(value: any, type: string | null): string | null {
  if (value == null) {
    return null;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (isBytesLike(value)) {
    if (
      type &&
      (type.split('/')[0] === 'text' ||
        type.split(';')[0].trim() === 'application/json')
    ) {
      try {
        return toUtf8String(value);
      } catch (error) {}
    }
    return hexlify(value);
  }

  return value;
}

function staller(duration: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

type Header = { key: string; value: string };

type FetchJsonResponse = {
  statusCode: number;
  headers: { [header: string]: string };
};

type Options = {
  method?: string;
  allowGzip?: boolean;
  body?: Uint8Array;
  headers?: { [key: string]: string };
  skipFetchSetup?: boolean;
};

type GetUrlResponse = {
  statusCode: number;
  statusMessage: string;
  headers: { [key: string]: string };
  body: Uint8Array;
};

async function getUrl(url: string, options: Options): Promise<GetUrlResponse> {
  console.log(url, options);
  return {
    statusCode: 1,
    statusMessage: 'yay',
    headers: {},
    body: new Uint8Array()
  };
}

//
// async function getUrl(
//   href: string,
//   options?: Options
// ): Promise<GetUrlResponse> {
//   if (options == null) {
//     options = {};
//   }
//
//   // @TODO: Once we drop support for node 8, we can pass the href
//   //        directly into request and skip adding the components
//   //        to this request object
//   const url = parse(href);
//
//   const request = {
//     protocol: url.protocol!,
//     hostname: url.hostname!,
//     port: url.port!,
//     path: url.pathname + url.search!,
//
//     method: options.method || 'GET',
//     headers: shallowCopy(options.headers || {})
//   };
//
//   if (options.allowGzip) {
//     request.headers['accept-encoding'] = 'gzip';
//   }
//
//   let req: http.ClientRequest | null = null;
//   switch (url.protocol) {
//     case 'http:':
//       req = http.request(request);
//       break;
//     case 'https:':
//       req = https.request(request);
//       break;
//     default:
//       /* istanbul ignore next */
//       logger.throwError(
//         `unsupported protocol ${url.protocol}`,
//         Logger.errors.UNSUPPORTED_OPERATION,
//         {
//           protocol: url.protocol,
//           operation: 'request'
//         }
//       );
//   }
//
//   if (options.body) {
//     req!.write(Buffer.from(options.body));
//   }
//   req!.end();
//
//   const response = await getResponse(req);
//   return response;
// }
//
// function getResponse(request: http.ClientRequest): Promise<GetUrlResponse> {
//   return new Promise((resolve, reject) => {
//     request.once('response', (resp: http.IncomingMessage) => {
//       const response: GetUrlResponse = {
//         statusCode: resp.statusCode,
//         statusMessage: resp.statusMessage,
//         headers: Object.keys(resp.headers).reduce((accum, name) => {
//           let value = resp.headers[name];
//           if (Array.isArray(value)) {
//             value = value.join(', ');
//           }
//           accum[name] = value;
//           return accum;
//         }, <{ [name: string]: string }>{}),
//         body: null
//       };
//       //resp.setEncoding("utf8");
//
//       resp.on('data', (chunk: Uint8Array) => {
//         if (response.body == null) {
//           response.body = new Uint8Array(0);
//         }
//         response.body = concat([response.body, chunk]);
//       });
//
//       resp.on('end', () => {
//         if (response.headers['content-encoding'] === 'gzip') {
//           //const size = response.body.length;
//           response.body = arrayify(gunzipSync(response.body));
//           //console.log("Delta:", response.body.length - size, Buffer.from(response.body).toString());
//         }
//         resolve(response);
//       });
//
//       resp.on('error', error => {
//         /* istanbul ignore next */
//         (<any>error).response = response;
//         reject(error);
//       });
//     });
//
//     request.on('error', error => {
//       reject(error);
//     });
//   });
// }
