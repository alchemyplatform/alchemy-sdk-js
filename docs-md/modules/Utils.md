[alchemy-sdk](../README.md) / [Exports](../modules.md) / Utils

# Namespace: Utils

## Table of contents

### Functions

- [arrayify](Utils.md#arrayify)
- [concat](Utils.md#concat)
- [dnsEncode](Utils.md#dnsencode)
- [formatEther](Utils.md#formatether)
- [formatUnits](Utils.md#formatunits)
- [hashMessage](Utils.md#hashmessage)
- [hexConcat](Utils.md#hexconcat)
- [hexDataLength](Utils.md#hexdatalength)
- [hexDataSlice](Utils.md#hexdataslice)
- [hexStripZeros](Utils.md#hexstripzeros)
- [hexValue](Utils.md#hexvalue)
- [hexZeroPad](Utils.md#hexzeropad)
- [hexlify](Utils.md#hexlify)
- [id](Utils.md#id)
- [isBytes](Utils.md#isbytes)
- [isBytesLike](Utils.md#isbyteslike)
- [isHexString](Utils.md#ishexstring)
- [isValidName](Utils.md#isvalidname)
- [joinSignature](Utils.md#joinsignature)
- [namehash](Utils.md#namehash)
- [parseEther](Utils.md#parseether)
- [parseUnits](Utils.md#parseunits)
- [splitSignature](Utils.md#splitsignature)
- [stripZeros](Utils.md#stripzeros)
- [zeroPad](Utils.md#zeropad)

## Functions

### arrayify

▸ **arrayify**(`value`, `options?`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` \| `BytesLike` \| `Hexable` |
| `options?` | `DataOptions` |

#### Returns

`Uint8Array`

#### Defined in

node_modules/@ethersproject/bytes/lib/index.d.ts:28

___

### concat

▸ **concat**(`items`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | readonly `BytesLike`[] |

#### Returns

`Uint8Array`

#### Defined in

node_modules/@ethersproject/bytes/lib/index.d.ts:29

___

### dnsEncode

▸ **dnsEncode**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/hash/lib/namehash.d.ts:4

___

### formatEther

▸ **formatEther**(`wei`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `wei` | `BigNumberish` |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/units/lib/index.d.ts:5

___

### formatUnits

▸ **formatUnits**(`value`, `unitName?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `BigNumberish` |
| `unitName?` | `BigNumberish` |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/units/lib/index.d.ts:3

___

### hashMessage

▸ **hashMessage**(`message`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` \| `Bytes` |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/hash/lib/message.d.ts:3

___

### hexConcat

▸ **hexConcat**(`items`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | readonly `BytesLike`[] |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/bytes/lib/index.d.ts:36

___

### hexDataLength

▸ **hexDataLength**(`data`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `BytesLike` |

#### Returns

`number`

#### Defined in

node_modules/@ethersproject/bytes/lib/index.d.ts:34

___

### hexDataSlice

▸ **hexDataSlice**(`data`, `offset`, `endOffset?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `BytesLike` |
| `offset` | `number` |
| `endOffset?` | `number` |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/bytes/lib/index.d.ts:35

___

### hexStripZeros

▸ **hexStripZeros**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `BytesLike` |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/bytes/lib/index.d.ts:38

___

### hexValue

▸ **hexValue**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` \| `bigint` \| `BytesLike` \| `Hexable` |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/bytes/lib/index.d.ts:37

___

### hexZeroPad

▸ **hexZeroPad**(`value`, `length`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `BytesLike` |
| `length` | `number` |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/bytes/lib/index.d.ts:39

___

### hexlify

▸ **hexlify**(`value`, `options?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` \| `bigint` \| `BytesLike` \| `Hexable` |
| `options?` | `DataOptions` |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/bytes/lib/index.d.ts:33

___

### id

▸ **id**(`text`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/hash/lib/id.d.ts:1

___

### isBytes

▸ **isBytes**(`value`): value is Bytes

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is Bytes

#### Defined in

node_modules/@ethersproject/bytes/lib/index.d.ts:27

___

### isBytesLike

▸ **isBytesLike**(`value`): value is BytesLike

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is BytesLike

#### Defined in

node_modules/@ethersproject/bytes/lib/index.d.ts:26

___

### isHexString

▸ **isHexString**(`value`, `length?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `length?` | `number` |

#### Returns

`boolean`

#### Defined in

node_modules/@ethersproject/bytes/lib/index.d.ts:32

___

### isValidName

▸ **isValidName**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

node_modules/@ethersproject/hash/lib/namehash.d.ts:2

___

### joinSignature

▸ **joinSignature**(`signature`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `signature` | `SignatureLike` |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/bytes/lib/index.d.ts:41

___

### namehash

▸ **namehash**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/hash/lib/namehash.d.ts:3

___

### parseEther

▸ **parseEther**(`ether`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ether` | `string` |

#### Returns

`BigNumber`

#### Defined in

node_modules/@ethersproject/units/lib/index.d.ts:6

___

### parseUnits

▸ **parseUnits**(`value`, `unitName?`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `unitName?` | `BigNumberish` |

#### Returns

`BigNumber`

#### Defined in

node_modules/@ethersproject/units/lib/index.d.ts:4

___

### splitSignature

▸ **splitSignature**(`signature`): `Signature`

#### Parameters

| Name | Type |
| :------ | :------ |
| `signature` | `SignatureLike` |

#### Returns

`Signature`

#### Defined in

node_modules/@ethersproject/bytes/lib/index.d.ts:40

___

### stripZeros

▸ **stripZeros**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `BytesLike` |

#### Returns

`Uint8Array`

#### Defined in

node_modules/@ethersproject/bytes/lib/index.d.ts:30

___

### zeroPad

▸ **zeroPad**(`value`, `length`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `BytesLike` |
| `length` | `number` |

#### Returns

`Uint8Array`

#### Defined in

node_modules/@ethersproject/bytes/lib/index.d.ts:31
