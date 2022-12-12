[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftExcludeFilters

# Enumeration: NftExcludeFilters

Enum of NFT filters that can be applied to a [getNftsForOwner](../classes/NftNamespace.md#getnftsforowner) request.
NFTs that match one or more of these filters are excluded from the response.

**`beta`**

## Table of contents

### Enumeration members

- [AIRDROPS](NftExcludeFilters.md#airdrops)
- [SPAM](NftExcludeFilters.md#spam)

## Enumeration members

### AIRDROPS

• **AIRDROPS** = `"AIRDROPS"`

Exclude NFTs that have been airdropped to a user.

#### Defined in

[src/types/types.ts:618](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/types/types.ts#L618)

___

### SPAM

• **SPAM** = `"SPAM"`

Exclude NFTs that have been classified as spam.

#### Defined in

[src/types/types.ts:615](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/types/types.ts#L615)
