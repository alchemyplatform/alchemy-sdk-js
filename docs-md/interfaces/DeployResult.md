[alchemy-sdk](../README.md) / [Exports](../modules.md) / DeployResult

# Interface: DeployResult

The response object for the [findContractDeployer](../classes/CoreNamespace.md#findcontractdeployer) function.

## Table of contents

### Properties

- [blockNumber](DeployResult.md#blocknumber)
- [deployerAddress](DeployResult.md#deployeraddress)

## Properties

### blockNumber

• `Readonly` **blockNumber**: `number`

The block number the contract was deployed in.

#### Defined in

[src/types/types.ts:1747](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L1747)

___

### deployerAddress

• `Optional` `Readonly` **deployerAddress**: `string`

The address of the contract deployer, if it is available.

#### Defined in

[src/types/types.ts:1744](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L1744)
