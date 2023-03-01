[alchemy-sdk](../README.md) / [Exports](../modules.md) / BigNumber

# Class: BigNumber

## Implements

- `Hexable`

## Table of contents

### Constructors

- [constructor](BigNumber.md#constructor)

### Properties

- [\_hex](BigNumber.md#_hex)
- [\_isBigNumber](BigNumber.md#_isbignumber)

### Methods

- [abs](BigNumber.md#abs)
- [add](BigNumber.md#add)
- [and](BigNumber.md#and)
- [div](BigNumber.md#div)
- [eq](BigNumber.md#eq)
- [fromTwos](BigNumber.md#fromtwos)
- [gt](BigNumber.md#gt)
- [gte](BigNumber.md#gte)
- [isNegative](BigNumber.md#isnegative)
- [isZero](BigNumber.md#iszero)
- [lt](BigNumber.md#lt)
- [lte](BigNumber.md#lte)
- [mask](BigNumber.md#mask)
- [mod](BigNumber.md#mod)
- [mul](BigNumber.md#mul)
- [or](BigNumber.md#or)
- [pow](BigNumber.md#pow)
- [shl](BigNumber.md#shl)
- [shr](BigNumber.md#shr)
- [sub](BigNumber.md#sub)
- [toBigInt](BigNumber.md#tobigint)
- [toHexString](BigNumber.md#tohexstring)
- [toJSON](BigNumber.md#tojson)
- [toNumber](BigNumber.md#tonumber)
- [toString](BigNumber.md#tostring)
- [toTwos](BigNumber.md#totwos)
- [xor](BigNumber.md#xor)
- [from](BigNumber.md#from)
- [isBigNumber](BigNumber.md#isbignumber)

## Constructors

### constructor

• **new BigNumber**(`constructorGuard`, `hex`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `constructorGuard` | `any` |
| `hex` | `string` |

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:7

## Properties

### \_hex

• `Readonly` **\_hex**: `string`

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:5

___

### \_isBigNumber

• `Readonly` **\_isBigNumber**: `boolean`

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:6

## Methods

### abs

▸ **abs**(): [`BigNumber`](BigNumber.md)

#### Returns

[`BigNumber`](BigNumber.md)

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:10

___

### add

▸ **add**(`other`): [`BigNumber`](BigNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

[`BigNumber`](BigNumber.md)

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:11

___

### and

▸ **and**(`other`): [`BigNumber`](BigNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

[`BigNumber`](BigNumber.md)

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:17

___

### div

▸ **div**(`other`): [`BigNumber`](BigNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

[`BigNumber`](BigNumber.md)

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:13

___

### eq

▸ **eq**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`boolean`

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:23

___

### fromTwos

▸ **fromTwos**(`value`): [`BigNumber`](BigNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`BigNumber`](BigNumber.md)

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:8

___

### gt

▸ **gt**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`boolean`

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:26

___

### gte

▸ **gte**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`boolean`

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:27

___

### isNegative

▸ **isNegative**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:28

___

### isZero

▸ **isZero**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:29

___

### lt

▸ **lt**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`boolean`

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:24

___

### lte

▸ **lte**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`boolean`

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:25

___

### mask

▸ **mask**(`value`): [`BigNumber`](BigNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`BigNumber`](BigNumber.md)

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:20

___

### mod

▸ **mod**(`other`): [`BigNumber`](BigNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

[`BigNumber`](BigNumber.md)

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:15

___

### mul

▸ **mul**(`other`): [`BigNumber`](BigNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

[`BigNumber`](BigNumber.md)

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:14

___

### or

▸ **or**(`other`): [`BigNumber`](BigNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

[`BigNumber`](BigNumber.md)

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:18

___

### pow

▸ **pow**(`other`): [`BigNumber`](BigNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

[`BigNumber`](BigNumber.md)

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:16

___

### shl

▸ **shl**(`value`): [`BigNumber`](BigNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`BigNumber`](BigNumber.md)

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:21

___

### shr

▸ **shr**(`value`): [`BigNumber`](BigNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`BigNumber`](BigNumber.md)

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:22

___

### sub

▸ **sub**(`other`): [`BigNumber`](BigNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

[`BigNumber`](BigNumber.md)

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:12

___

### toBigInt

▸ **toBigInt**(): `bigint`

#### Returns

`bigint`

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:31

___

### toHexString

▸ **toHexString**(): `string`

#### Returns

`string`

#### Implementation of

Hexable.toHexString

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:33

___

### toJSON

▸ **toJSON**(`key?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key?` | `string` |

#### Returns

`any`

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:34

___

### toNumber

▸ **toNumber**(): `number`

#### Returns

`number`

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:30

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:32

___

### toTwos

▸ **toTwos**(`value`): [`BigNumber`](BigNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`BigNumber`](BigNumber.md)

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:9

___

### xor

▸ **xor**(`other`): [`BigNumber`](BigNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

[`BigNumber`](BigNumber.md)

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:19

___

### from

▸ `Static` **from**(`value`): [`BigNumber`](BigNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

[`BigNumber`](BigNumber.md)

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:35

___

### isBigNumber

▸ `Static` **isBigNumber**(`value`): value is BigNumber

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is BigNumber

#### Defined in

node_modules/@ethersproject/bignumber/lib/bignumber.d.ts:36
