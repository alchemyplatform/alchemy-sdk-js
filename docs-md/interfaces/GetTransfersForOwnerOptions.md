[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetTransfersForOwnerOptions

# Interface: GetTransfersForOwnerOptions

Optional parameters object for the [NftNamespace.getTransfersForOwner](../classes/NftNamespace.md#gettransfersforowner) method.

## Table of contents

### Properties

- [contractAddresses](GetTransfersForOwnerOptions.md#contractaddresses)
- [pageKey](GetTransfersForOwnerOptions.md#pagekey)
- [tokenType](GetTransfersForOwnerOptions.md#tokentype)

## Properties

### contractAddresses

• `Optional` **contractAddresses**: `string`[]

List of NFT contract addresses to filter mints by. If omitted, defaults to
all contract addresses.

#### Defined in

[src/types/types.ts:586](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L586)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [TransfersNftResponse](TransfersNftResponse.md) to use for
pagination.

#### Defined in

[src/types/types.ts:598](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L598)

___

### tokenType

• `Optional` **tokenType**: [`ERC721`](../enums/NftTokenType.md#erc721) \| [`ERC1155`](../enums/NftTokenType.md#erc1155)

Filter mints by ERC721 vs ERC1155 contracts. If omitted, defaults to all
NFTs.

#### Defined in

[src/types/types.ts:592](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L592)
