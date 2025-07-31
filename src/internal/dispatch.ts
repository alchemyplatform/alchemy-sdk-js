import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { AlchemyConfig } from '../api/alchemy-config';
import { AlchemyApiType } from '../util/const';
import { logDebug, logInfo } from '../util/logger';
import { sendAxiosRequest } from '../util/sendRest';
import { ExponentialBackoff } from './backoff';

/**
 * A wrapper function to make http requests and retry if the request fails.
 *
 * @internal
 */
// TODO: Wrap Axios error in AlchemyError.
export async function requestHttpWithBackoff<Req, Res>(
  config: AlchemyConfig,
  apiType: AlchemyApiType,
  restApiName: string,
  methodName: string,
  params: Req,
  overrides?: AxiosRequestConfig
): Promise<Res> {
  let lastError: Error | undefined = undefined;
  const backoff = new ExponentialBackoff(config.maxRetries);
  for (let attempt = 0; attempt < config.maxRetries + 1; attempt++) {
    try {
      if (lastError !== undefined) {
        logInfo('requestHttp', `Retrying after error: ${lastError.message}`);
      }

      try {
        await backoff.backoff();
      } catch (err) {
        // Backoff errors when the maximum number of attempts is reached. Break
        // out of the loop to preserve the last error.
        break;
      }

      const response = await sendAxiosRequest<Req, Res>(
        config._getRequestUrl(apiType),
        restApiName,
        methodName,
        params,
        {
          ...overrides,
          timeout: config.requestTimeout
        }
      );

      if (response.status === 200) {
        logDebug(restApiName, `Successful request: ${restApiName}`);
        return response.data;
      } else {
        logInfo(
          restApiName,
          `Request failed: ${restApiName}, ${response.status}, ${response.data}`
        );
        lastError = new Error(response.status + ': ' + response.data);
      }
    } catch (err) {
      if (!axios.isAxiosError(err) || err.response === undefined) {
        throw err;
      }
      // TODO: Standardize all errors into AlchemyError
      lastError = new Error(
        err.response.status + ': ' + JSON.stringify(err.response.data)
      );
      if (!isRetryableHttpError(err, apiType)) {
        break;
      }
    }
  }
  return Promise.reject(lastError);
}

function isRetryableHttpError(
  err: AxiosError,
  apiType: AlchemyApiType
): boolean {
  // TODO: remove 500s after webhooks are more stable.
  const retryableCodes =
    apiType === AlchemyApiType.WEBHOOK ? [429, 500, 503] : [429, 503];
  return (
    err.response !== undefined && retryableCodes.includes(err.response.status)
  );
}

/**
 * Fetches all pages in a paginated endpoint, given a `pageKey` field that
 * represents the property name containing the next page token.
 *
 * @internal
 */
export async function* paginateEndpoint<
  ReqPageKey extends string,
  ResPageKey extends string,
  Req extends Partial<Record<string, any> & Record<ReqPageKey, string>>,
  Res extends Partial<Record<string, any> & Record<ResPageKey, string>>
>(
  config: AlchemyConfig,
  apiType: AlchemyApiType,
  restApiName: string,
  methodName: string,
  reqPageKey: ReqPageKey,
  resPageKey: ResPageKey,
  params: Req
): AsyncIterable<Res> {
  let hasNext = true;
  const requestParams = { ...params };
  while (hasNext) {
    const response = await requestHttpWithBackoff<Req, Res>(
      config,
      apiType,
      restApiName,
      methodName,
      requestParams
    );
    yield response;
    if (response[resPageKey] !== null) {
      requestParams[reqPageKey] = response[resPageKey] as any;
    } else {
      hasNext = false;
    }
  }
}
