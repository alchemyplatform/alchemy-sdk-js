[alchemy-sdk](../README.md) / [Exports](../modules.md) / TransactionJobStatusResponse

# Interface: TransactionJobStatusResponse

Response object for the [TransactNamespace.getTransactionJobStatus](../classes/TransactNamespace.md#gettransactionjobstatus) method.

## Table of contents

### Properties

- [jobStatus](TransactionJobStatusResponse.md#jobstatus)
- [minedTransactionHash](TransactionJobStatusResponse.md#minedtransactionhash)
- [transactionHashesAttempted](TransactionJobStatusResponse.md#transactionhashesattempted)

## Properties

### jobStatus

• **jobStatus**: `string`

The status of the transaction job.

#### Defined in

[src/types/types.ts:1086](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/types/types.ts#L1086)

___

### minedTransactionHash

• `Optional` **minedTransactionHash**: `string`

The final mined transaction hash if the job was completed successfully.

#### Defined in

[src/types/types.ts:1092](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/types/types.ts#L1092)

___

### transactionHashesAttempted

• **transactionHashesAttempted**: `string`[]

An array of the submitted transactions hashes that have been attempted.

#### Defined in

[src/types/types.ts:1089](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/types/types.ts#L1089)
