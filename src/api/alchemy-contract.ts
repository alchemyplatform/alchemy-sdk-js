import {
  Contract as EthersContract,
  ContractFactory as EthersContractFactory
} from 'ethers';

/**
 * The Contract class is a wrapper around the Contract class from ethers.js and
 * is exported here for convenience.
 *
 * @public
 */
// TODO: support passing in Alchemy instance into the contract.
export class Contract extends EthersContract {}

/**
 * The ContractFactory class is a wrapper around the ContractFactory class from
 * ethers.js and is exported here for convenience.
 *
 * @public
 */
export class ContractFactory extends EthersContractFactory {}
