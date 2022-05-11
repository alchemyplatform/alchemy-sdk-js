[alchemy-sdk](../README.md) / [Exports](../modules.md) / BaseNft

# Class: BaseNft

Alchemy representation of a base NFT that doesn't contain metadata.

## Hierarchy

- **`BaseNft`**

  ↳ [`Nft`](Nft.md)

  ↳ [`OwnedBaseNft`](../interfaces/OwnedBaseNft.md)

## Table of contents

### Constructors

- [constructor](BaseNft.md#constructor)

### Properties

- [contract](BaseNft.md#contract)
- [tokenId](BaseNft.md#tokenid)
- [tokenType](BaseNft.md#tokentype)

## Constructors

### constructor

• `Protected` **new BaseNft**(`address`, `tokenId`, `tokenType`)

This constructor should never be called directly. All Nft instances should
be created from a backend response via the `fromResponse` method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `tokenId` | `string` |
| `tokenType` | [`NftTokenType`](../enums/NftTokenType.md) |

#### Defined in

[api/nft.ts:27](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9f71253/src/api/nft.ts#L27)

## Properties

### contract

• `Readonly` **contract**: [`NftContract`](../interfaces/NftContract.md)

#### Defined in

[api/nft.ts:21](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9f71253/src/api/nft.ts#L21)

___

### tokenId

• `Readonly` **tokenId**: `string`

___

### tokenType

• `Readonly` **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)
