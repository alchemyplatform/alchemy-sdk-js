[alchemy-evm-js](../README.md) / [Exports](../modules.md) / DeployResult

# Interface: DeployResult

The response object for the [findContractDeployer](../modules.md#findcontractdeployer) function.

## Table of contents

### Properties

- [blockNumber](DeployResult.md#blocknumber)
- [deployerAddress](DeployResult.md#deployeraddress)

## Properties

### blockNumber

• `Readonly` **blockNumber**: `number`

The block number the contract was deployed in.

#### Defined in

[types/types.ts:429](https://github.com/alchemyplatform/alchemy-evm-js/blob/0259d36/src/types/types.ts#L429)

___

### deployerAddress

• `Optional` `Readonly` **deployerAddress**: `string`

The address of the contract deployer, if it is available.

#### Defined in

[types/types.ts:426](https://github.com/alchemyplatform/alchemy-evm-js/blob/0259d36/src/types/types.ts#L426)
