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

[src/types/types.ts:1567](https://github.com/alchemyplatform/alchemy-sdk-js/blob/30d9ef5/src/types/types.ts#L1567)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key used to fetch the remaining addresses.

#### Defined in

[src/types/types.ts:1571](https://github.com/alchemyplatform/alchemy-sdk-js/blob/30d9ef5/src/types/types.ts#L1571)

___

### totalCount

• **totalCount**: `number`

The total number of addresses.

#### Defined in

[src/types/types.ts:1569](https://github.com/alchemyplatform/alchemy-sdk-js/blob/30d9ef5/src/types/types.ts#L1569)
