# Contributing to the Alchemy JS SDK

We'd love for you to contribute and help make the Alchemy SDK even better!

## Issues and Feature Requests

Before you create a new issue, please search the [existing issues](https://github.com/alchemyplatform/alchemy-sdk-js/issues?q=is%3Aissue).
Otherwise, please create a new issue and fill out the issue template.

## Codebase Overview

The Alchemy SDK contains multiple namespaces that encapsulate different functionality. See the `README.md` for a list of
namespaces and their methods.

We use [TypeScript](https://www.typescriptlang.org/) to provide type safety and documentation for the SDK. Here is a
brief overview of the codebase:
- `src`: Contains the source code for the SDK.
- `src/index.ts`: The entry point for the SDK. All developer facing classes and methods are exported here.
- `src/types`: Contains the TypeScript type definitions that are used and exported by the SDK.
- `src/api`: Contains the source code for exported Alchemy API namespaces and relevant classes/methods.
- `src/interal`: Contains the source code for internal helpers and implementations not intended for public use.

## Running Tests

To run the unit tests:

```bash
yarn test
```

To run the integration tests, first copy over the `sample-alchemy.env` file to `alchemy.env` and set your Alchemy API
key. Then run:

```bash
yarn test-integration
```
