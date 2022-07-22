[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / DeployResult

# Interface: DeployResult

The response object for the {@link findContractDeployer} function.

## Table of contents

### Properties

- [blockNumber](DeployResult.md#blocknumber)
- [deployerAddress](DeployResult.md#deployeraddress)

## Properties

### blockNumber

• `Readonly` **blockNumber**: `number`

The block number the contract was deployed in.

#### Defined in

[src/types/types.ts:562](https://github.com/alchemyplatform/alchemy-sdk-js/blob/598aca2/src/types/types.ts#L562)

___

### deployerAddress

• `Optional` `Readonly` **deployerAddress**: `string`

The address of the contract deployer, if it is available.

#### Defined in

[src/types/types.ts:559](https://github.com/alchemyplatform/alchemy-sdk-js/blob/598aca2/src/types/types.ts#L559)
