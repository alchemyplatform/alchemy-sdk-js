[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / DeployResult

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

[src/types/types.ts:448](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0fdf0d4/src/types/types.ts#L448)

___

### deployerAddress

• `Optional` `Readonly` **deployerAddress**: `string`

The address of the contract deployer, if it is available.

#### Defined in

[src/types/types.ts:445](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0fdf0d4/src/types/types.ts#L445)
