[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetMintedNftsOptions

# Interface: GetMintedNftsOptions

Optional parameters object for the [NftNamespace.getMintedNfts](../classes/NftNamespace.md#getmintednfts) method.

## Table of contents

### Properties

- [contractAddresses](GetMintedNftsOptions.md#contractaddresses)
- [pageKey](GetMintedNftsOptions.md#pagekey)
- [tokenType](GetMintedNftsOptions.md#tokentype)

## Properties

### contractAddresses

• `Optional` **contractAddresses**: `string`[]

List of NFT contract addresses to filter mints by. If omitted, defaults to
all contract addresses.

#### Defined in

[src/types/types.ts:974](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L974)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [GetMintedNftsResponse](GetMintedNftsResponse.md) to use for
pagination.

#### Defined in

[src/types/types.ts:986](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L986)

___

### tokenType

• `Optional` **tokenType**: [`ERC721`](../enums/NftTokenType.md#erc721) \| [`ERC1155`](../enums/NftTokenType.md#erc1155)

Filter mints by ERC721 vs ERC1155 contracts. If omitted, defaults to all
NFTs.

#### Defined in

[src/types/types.ts:980](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L980)
