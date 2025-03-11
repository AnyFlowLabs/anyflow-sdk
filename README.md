# AnyFlow SDK

A TypeScript SDK for extending functionality of blockchain projects and providing dependencies for the AnyFlow CLI tool.

## Features

- Simple setup with a single function call
- Extensions for ethers.js v6
- Utilities for blockchain development
- Integration with AnyFlow CLI

## Installation

```bash
npm install anyflow-sdk
```

## Usage

### Basic Setup

```typescript
/**
 * Basic usage example for AnyFlow SDK inside a hardhat project
 */
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import anyflow from 'anyflow-sdk';

anyflow.setup();

const config: HardhatUserConfig = {
    solidity: "0.8.28",
};

export default anyflow.mergeHardhatConfig(config);
```


## API Reference

### `setup(options)`

Initializes the AnyFlow SDK with the provided options.

#### Options

- `enableEthersExtensions` (boolean): Enable extensions for ethers.js v6. Default: `true`
- `logLevel` (string): Log level for SDK operations. Options: 'debug', 'info', 'warn', 'error', 'none'. Default: `'info'`
- `cliConfig` (object): Custom configuration for CLI integration. Default: `{}`

Contributing
We welcome contributions to the AnyFlow SDK! Please see the CONTRIBUTING.md file for details on how to contribute.

## Development

### GitHub Workflows

This project uses GitHub Actions for continuous integration:

- **Pull Request Workflow**: Automatically runs linting, tests, and build when a PR is created or updated
- **Master Branch Workflow**: Runs when code is merged to master/main, ensuring the codebase remains stable
- **Release Workflow**: A manual workflow that can be triggered to publish new versions to npm

### Publishing

To publish a new version of the SDK:

1. Ensure all tests pass locally: `npm test`
2. Use one of the release scripts based on the type of changes:
   - For bug fixes: `npm run release:patch`
   - For new features: `npm run release:minor`
   - For breaking changes: `npm run release:major`
3. Publish to npm: `npm run publish:npm`

Alternatively, you can use the GitHub Release workflow to handle versioning and publishing automatically.

## License

This project is licensed under the ISC License.