[alchemy-sdk](../README.md) / [Exports](../modules.md) / DeployResult

# Interface: DeployResult

The response object for the [findContractDeployer](../classes/CoreNamespace.md#findcontractdeployer) function.

## Table of contents

### Properties

- [blockNumber](DeployResult.md#blocknumber)
- [deployerAddress](DeployResult.md#deployeraddress)

## Properties

### blockNumber

• **blockNumber**: `number`

The block number the contract was deployed in.

#### Defined in

[src/types/types.ts:598](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L598)

___

### deployerAddress

• `Optional` **deployerAddress**: `string`

The address of the contract deployer, if it is available.

#### Defined in

[src/types/types.ts:595](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L595)
