[alchemy-sdk](../README.md) / [Exports](../modules.md) / SendPrivateTransactionOptions

# Interface: SendPrivateTransactionOptions

Options for the [TransactNamespace.sendPrivateTransaction](../classes/TransactNamespace.md#sendprivatetransaction) method.

## Table of contents

### Properties

- [fast](SendPrivateTransactionOptions.md#fast)

## Properties

### fast

• **fast**: `boolean`

Whether to use fast-mode. Defaults to false. Please note that fast mode
transactions cannot be cancelled using
[TransactNamespace.cancelPrivateTransaction](../classes/TransactNamespace.md#cancelprivatetransaction). method.

See [https://docs.flashbots.net/flashbots-protect/rpc/fast-mode](https://docs.flashbots.net/flashbots-protect/rpc/fast-mode) for
more details.

#### Defined in

[src/types/types.ts:642](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fd39d10/src/types/types.ts#L642)
