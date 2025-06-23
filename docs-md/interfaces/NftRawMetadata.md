[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftRawMetadata

# Interface: NftRawMetadata

The raw metadata for the NFT based on the metadata URI on the NFT contract.

## Table of contents

### Properties

- [error](NftRawMetadata.md#error)
- [metadata](NftRawMetadata.md#metadata)
- [tokenUri](NftRawMetadata.md#tokenuri)

## Properties

### error

• `Optional` **error**: `string`

Error message if the raw metadata could not be fetched.

#### Defined in

[src/types/nft-types.ts:1318](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/nft-types.ts#L1318)

___

### metadata

• **metadata**: `Record`<`string`, `any`\>

The raw metadata parsed from the raw token URI.

#### Defined in

[src/types/nft-types.ts:1316](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/nft-types.ts#L1316)

___

### tokenUri

• `Optional` **tokenUri**: `string`

The raw token URI on the NFT contract.

#### Defined in

[src/types/nft-types.ts:1314](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/nft-types.ts#L1314)
