[alchemy-sdk](../README.md) / [Exports](../modules.md) / DecodedLog

# Interface: DecodedLog

Decoded representation of the debug log that is part of a
[SimulationDebugLog](SimulationDebugLog.md).

## Table of contents

### Properties

- [authority](DecodedLog.md#authority)
- [eventName](DecodedLog.md#eventname)
- [inputs](DecodedLog.md#inputs)

## Properties

### authority

• **authority**: [`ETHERSCAN`](../enums/DecodingAuthority.md#etherscan)

The source used to provide the decoded log.

#### Defined in

[src/types/types.ts:1050](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1050)

___

### eventName

• **eventName**: `string`

The decoded name of the log event.

#### Defined in

[src/types/types.ts:1046](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1046)

___

### inputs

• **inputs**: [`DecodedLogInput`](DecodedLogInput.md)[]

The decoded inputs to the log.

#### Defined in

[src/types/types.ts:1048](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1048)
