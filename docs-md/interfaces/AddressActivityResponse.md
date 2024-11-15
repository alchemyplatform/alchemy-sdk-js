[alchemy-sdk](../README.md) / [Exports](../modules.md) / AddressActivityResponse

# Interface: AddressActivityResponse

Response object for the [NotifyNamespace.getAddresses](../classes/NotifyNamespace.md#getaddresses) method.

## Table of contents

### Properties

- [addresses](AddressActivityResponse.md#addresses)
- [pageKey](AddressActivityResponse.md#pagekey)
- [totalCount](AddressActivityResponse.md#totalcount)

## Properties

### addresses

• **addresses**: `string`[]

The addresses for the webhook.

#### Defined in

[src/types/types.ts:1190](https://github.com/alchemyplatform/alchemy-sdk-js/blob/44aa50c/src/types/types.ts#L1190)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key used to fetch the remaining addresses.

#### Defined in

[src/types/types.ts:1194](https://github.com/alchemyplatform/alchemy-sdk-js/blob/44aa50c/src/types/types.ts#L1194)

___

### totalCount

• **totalCount**: `number`

The total number of addresses.

#### Defined in

[src/types/types.ts:1192](https://github.com/alchemyplatform/alchemy-sdk-js/blob/44aa50c/src/types/types.ts#L1192)
