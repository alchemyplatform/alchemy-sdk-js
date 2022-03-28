/**
 * Given a REST endpoint, method, and params, sends the request with axios and returns the response.
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

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
  const config = {
    method: 'get',
    url: methodUrl,
    params
  } as AxiosRequestConfig;
  return axios(config);
}
