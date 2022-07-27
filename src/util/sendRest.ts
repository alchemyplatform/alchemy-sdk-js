/**
 * Given a REST endpoint, method, and params, sends the request with axios and
 * returns the response.
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { VERSION } from '../version';
import { IS_BROWSER } from './util';

/**
 * Helper function to send http requests using Axis.
 *
 * @private
 */
// TODO: Support other methods besides GET + other http options.
export function sendAxiosRequest<Req, Res>(
  baseUrl: string,
  methodName: string,
  params: Req
): Promise<AxiosResponse<Res>> {
  const methodUrl = baseUrl + '/' + methodName;
  const config: AxiosRequestConfig = {
    headers: IS_BROWSER
      ? {
          'Alchemy-Ethers-Sdk-Version': VERSION
        }
      : {
          'Alchemy-Ethers-Sdk-Version': VERSION,
          'Accept-Encoding': 'gzip'
        },
    method: 'get',
    url: methodUrl,
    params
  };
  return axios(config);
}
