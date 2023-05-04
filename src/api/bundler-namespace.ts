import {
  UserOperation,
  UserOperationEstimateGasResponse,
  UserOperationReceipt,
  UserOperationRequest
} from '../types/types';
import { deepHexlify } from '../util/util';
import { AlchemyConfig } from './alchemy-config';

/**
 * The Bundler namespace contains methods used for interacting performing user operations and
 * checking on the state of submitted operations.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the transact
 * namespace via `alchemy.bundler`.
 */
export class BundlerNamespace {
  /** @internal */
  constructor(private readonly config: AlchemyConfig) {}

  /**
   * Sends a User Operation
   *
   * Sends a user operation to the provided bundler client evm network, and
   * returns a user operation hash on successful submission. The gas fields, if left empty,
   * will be estimated prior to submitting the UserOperation
   *
   * @param userOperation - The user operation.
   * @beta
   */
  async sendUserOperation(
    userOperation: UserOperationRequest
  ): Promise<string> {
    const provider = await this.config.getProvider();
    if (
      !userOperation.callGasLimit ||
      !userOperation.preVerificationGas ||
      !userOperation.verificationGasLimit
    ) {
      const gasEstimates = await this.estimateUserOperationGas(userOperation);
      userOperation.callGasLimit = gasEstimates.callGasLimit;
      userOperation.preVerificationGas = gasEstimates.preVerificationGas;
      userOperation.verificationGasLimit = gasEstimates.verificationGasLimit;
    }

    if (!userOperation.maxFeePerGas || !userOperation.maxPriorityFeePerGas) {
      const feeData = await provider.getFeeData();
      userOperation.maxFeePerGas = feeData.maxFeePerGas;
      userOperation.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
    }

    return provider._send(
      'eth_sendUserOperation',
      [this.hexlifyUserOpFields(userOperation)],
      'sendUserOperation'
    );
  }

  /**
   * Get a User Operation by Hash
   *
   * This method returns the user operation object based on the
   * provided user operation hash.
   *
   * @param userOpHash - The hash of the user operation.
   * @beta
   */
  async getUserOperationByHash(userOpHash: string): Promise<UserOperation> {
    const provider = await this.config.getProvider();
    return provider._send(
      'eth_getUserOperationByHash',
      [userOpHash],
      'getUserOperationByHash'
    );
  }

  /**
   * Get Client Supported Entry Points - Gets the entry point contract address that starts the execution
   * of an account abstracted transaction.
   *
   * Note: Unlike traditional Ethereum transactions where the recipient address is the entry point,
   * with account abstraction, the sender can specify an entry point contract that processes the transaction,
   * and performs necessary actions and returns the result.
   *
   * Returns an array of the entry point addresses that are
   * supported by the Alchemy bundler client. The Entrypoint
   * is a key component of the 4337 spec and is required in
   * the processing of UserOperations. It handles verification
   * and execution of UserOps.
   *
   * @beta
   */
  async supportedEntryPoints(): Promise<string[]> {
    const provider = await this.config.getProvider();
    return provider._send(
      'eth_supportedEntryPoints',
      [],
      'supportedEntryPoints'
    );
  }

  /**
   * Get a User Operation Receipt
   *
   * This method returns the user operation receipt based on the
   * provided user operation hash.
   *
   * @param userOpHash - The hash of the user operation.
   * @beta
   */
  async getUserOperationReceipt(
    userOpHash: string
  ): Promise<UserOperationReceipt> {
    const provider = await this.config.getProvider();
    return provider._send(
      'eth_getUserOperationReceipt',
      [userOpHash],
      'getUserOperationReceipt'
    );
  }

  /**
   * Estimates the Gas Values for a UserOperation.
   *
   * This method returns gas estimates based on the provided user operation request.
   *
   * @param userOperation - The user operation.
   * @beta
   */
  async estimateUserOperationGas(
    userOperation: UserOperationRequest
  ): Promise<UserOperationEstimateGasResponse> {
    const provider = await this.config.getProvider();
    return provider._send(
      'eth_estimateUserOperationGas',
      [this.hexlifyUserOpFields(userOperation)],
      'estimateUserOperationGas'
    );
  }

  private hexlifyUserOpFields(
    userOperation: UserOperationRequest
  ): UserOperationRequest {
    return deepHexlify(userOperation);
  }
}
