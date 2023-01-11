[alchemy-sdk](../README.md) / [Exports](../modules.md) / BaseNftContract

# Interface: BaseNftContract

Alchemy representation of a base NFT contract that doesn't contain metadata.

The BaseNftContract does not hold any metadata information and only contains
the address. The NftContract additionally contains the tokenType, name,
symbol, and more.

## Hierarchy

- **`BaseNftContract`**

  ↳ [`NftContract`](NftContract.md)

## Table of contents

### Properties

- [address](BaseNftContract.md#address)

## Properties

### address

• **address**: `string`

The address of the contract.

#### Defined in

[src/api/nft.ts:21](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/api/nft.ts#L21)
