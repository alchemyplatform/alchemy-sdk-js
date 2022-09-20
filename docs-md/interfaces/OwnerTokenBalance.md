[alchemy-sdk](../README.md) / [Exports](../modules.md) / OwnerTokenBalance

# Interface: OwnerTokenBalance

An object representing a single owned tokenID and associated balance.

## Table of contents

### Properties

- [tokenId](OwnerTokenBalance.md#tokenId)
- [balance](OwnerTokenBalance.md#balance)

## Properties

### tokenId

• `Readonly` **tokenId**: `string`

### balance

• `Readonly` **balance**: `number`

Number of copies of `tokenId` owned by the associated owner. For ERC-721 tokens
this will always be equal to 1.
