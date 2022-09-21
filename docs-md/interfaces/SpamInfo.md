[alchemy-sdk](../README.md) / [Exports](../modules.md) / SpamInfo

# Interface: SpamInfo

Detailed information about why an NFT contract is considered to be spam.

## Table of contents

### Properties

- [classifications](SpamInfo.md#classifications)
- [isSpam](SpamInfo.md#isSpam)

## Properties

### classifications

• **classifications**: `string`[]

A list of reasons why Alchemy considers an NFT to be spam. For more info, visit [the Alchemy docs](https://docs.alchemy.com/reference/nft-api-quickstart#how-can-i-understand-why-a-particular-nft-collection-is-marked-as-spam)

#### Defined in

[src/types/types.ts:420](https://github.com/alchemyplatform/alchemy-sdk-js/blob/560b3e2/src/types/types.ts#L420)

---

### isSpam

• **isSpam**: `boolean`

True if Alchemy considers the associated NFT contract to be spam; otherwise false.

#### Defined in

[src/types/types.ts:417](https://github.com/alchemyplatform/alchemy-sdk-js/blob/560b3e2/src/types/types.ts#L417)
