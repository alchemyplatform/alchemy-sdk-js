import { Alchemy } from '../api/alchemy';
import { sendAxiosRequest } from '../util/sendRest';
import { logger } from '../util/util';
import { ExponentialBackoff } from './backoff';
import axios from 'axios';

/**
 * A wrapper function to make http requests and retry if the request fails.
 *
 * @param alchemy
 * @param method
 * @param params
 */
// TODO: Wrap Axios error in AlchemyError.
export async function requestHttp<Req, Res>(
  alchemy: Alchemy,
  method: string,
  params: Req
): Promise<Res> {
  let lastError: Error | undefined = undefined;
  const backoff = new ExponentialBackoff(alchemy.maxAttempts);
  for (let attempt = 0; attempt < alchemy.maxAttempts + 1; attempt++) {
    try {
      if (lastError !== undefined) {
        logger('requestHttp', `Retrying after error: ${lastError.message}`);
      }

      await backoff.backoff();
      const response = await sendAxiosRequest<Req, Res>(
        alchemy._getBaseUrl(),
        method,
        params
      );

      if (response.status === 200) {
        logger(method, `Successful request: ${method}`);
        return response.data;
      } else {
        logger(
          method,
          `Request failed: ${method}, ${response.status}, ${response.data}`
        );
        lastError = new Error(response.status + ': ' + response.data);
      }
    } catch (err) {
      if (!axios.isAxiosError(err)) {
        throw err;
      }
      // TODO: update 429 message to match http response type. Check with axios and httpstat.us
      if (err.response?.status === 429) {
        lastError = new Error(
          err.response.status + ': ' + err.response.data.message
        );
      }
    }
  }
  return Promise.reject(lastError);
}
