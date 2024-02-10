/**
 * Given a REST endpoint, method, and params, sends the request with axios and
 * returns the response.
 */
import { AxiosRequestConfig, AxiosResponse } from 'axios';
/**
 * Helper function to send http requests using Axis.
 *
 * @private
 */
export declare function sendAxiosRequest<Req, Res>(baseUrl: string, restApiName: string, methodName: string, params: Req, overrides?: AxiosRequestConfig): Promise<AxiosResponse<Res>>;
