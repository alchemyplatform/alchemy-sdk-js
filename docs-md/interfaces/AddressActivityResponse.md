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

[src/types/types.ts:1248](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1248)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key used to fetch the remaining addresses.

#### Defined in

[src/types/types.ts:1252](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1252)

___

### totalCount

• **totalCount**: `number`

The total number of addresses.

#### Defined in

[src/types/types.ts:1250](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1250)
