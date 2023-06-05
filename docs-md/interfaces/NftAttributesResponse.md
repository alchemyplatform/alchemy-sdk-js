[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftAttributesResponse

# Interface: NftAttributesResponse

Summary of the attribute prevalence for the specified NFT contract.

## Table of contents

### Properties

- [contractAddress](NftAttributesResponse.md#contractaddress)
- [summary](NftAttributesResponse.md#summary)
- [totalSupply](NftAttributesResponse.md#totalsupply)

## Properties

### contractAddress

• **contractAddress**: `string`

The specified NFT contract's address.

#### Defined in

[src/types/types.ts:1404](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1404)

___

### summary

• **summary**: `Record`<`string`, `Record`<`string`, `number`\>\>

The attribute prevalence of each trait grouped by the trait type for the
provided NFT.

#### Defined in

[src/types/types.ts:1413](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1413)

___

### totalSupply

• **totalSupply**: `number`

The specified NFT contract's total supply.

#### Defined in

[src/types/types.ts:1407](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1407)
