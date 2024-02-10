import { Network as NetworkFromEthers } from '@ethersproject/networks';
import { CommunityResourcable, JsonRpcProvider } from '@ethersproject/providers';
/**
 * SDK's custom implementation of ethers.js's 'AlchemyProvider'.
 *
 * Do not call this constructor directly. Instead, instantiate an instance of
 * {@link Alchemy} and call {@link Alchemy.config.getProvider()}.
 *
 * @public
 */
export declare class AlchemyProvider extends JsonRpcProvider implements CommunityResourcable {
    readonly apiKey: string;
    readonly maxRetries: number;
    readonly batchRequests: boolean;
    /**
     * Overrides the method in ethers.js's `StaticJsonRpcProvider` class. This
     * method is called when calling methods on the parent class `BaseProvider`.
     *
     * @override
     */
    detectNetwork(): Promise<NetworkFromEthers>;
    _startPending(): void;
    /**
     * Overrides the ether's `isCommunityResource()` method. Returns true if the
     * current api key is the default key.
     *
     * @override
     */
    isCommunityResource(): boolean;
    /**
     * Overrides the base {@link JsonRpcProvider.send} method to implement custom
     * logic for sending requests to Alchemy.
     *
     * @param method The method name to use for the request.
     * @param params The parameters to use for the request.
     * @override
     * @public
     */
    send(method: string, params: Array<any>): Promise<any>;
    /**
     * Overrides the base `Formatter` class inherited from ethers to support
     * returning custom fields in Ethers response types.
     *
     * For context, ethers has a `Formatter` class that is used to format the
     * response from a JSON-RPC request. Any fields that are not defined in the
     * `Formatter` class are removed from the returned response. By modifying the
     * `Formatter` class in this method, we can add support for fields that are
     * not defined in ethers.
     */
    private modifyFormatter;
}
