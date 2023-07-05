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

[src/types/types.ts:1093](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L1093)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [TransfersNftResponse](TransfersNftResponse.md) to use for
pagination.

#### Defined in

[src/types/types.ts:1105](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L1105)

___

### tokenType

• `Optional` **tokenType**: [`ERC721`](../enums/NftTokenType.md#erc721) \| [`ERC1155`](../enums/NftTokenType.md#erc1155)

Filter mints by ERC721 vs ERC1155 contracts. If omitted, defaults to all
NFTs.

#### Defined in

[src/types/types.ts:1099](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L1099)
