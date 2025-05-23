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

[src/types/nft-types.ts:879](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/nft-types.ts#L879)

___

### summary

• **summary**: `Record`<`string`, `Record`<`string`, `number`\>\>

The attribute prevalence of each trait grouped by the trait type for the
provided NFT.

#### Defined in

[src/types/nft-types.ts:888](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/nft-types.ts#L888)

___

### totalSupply

• **totalSupply**: `string`

The specified NFT contract's total supply.

#### Defined in

[src/types/nft-types.ts:882](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/nft-types.ts#L882)
