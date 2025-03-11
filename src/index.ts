/**
 * AnyFlow SDK - Main entry point
 * 
 * This SDK provides utilities and extensions for blockchain development,
 * particularly focused on enhancing ethers.js v6 functionality and providing
 * dependencies for the AnyFlow CLI tool.
 */

import { ethersExtensions } from './extensions/ethers';
import { SDKOptions, defaultOptions } from './types/options';
import { logger } from './utils/logger';
import * as frameworkExtensions from './framework';
/**
 * Initialize the AnyFlow SDK with the provided options.
 * This function should be called once at the beginning of your application.
 * 
 * @param options Configuration options for the SDK
 * @returns The initialized SDK instance
 */
export function setup(options: Partial<SDKOptions> = {}) {
    const mergedOptions: SDKOptions = {
        ...defaultOptions,
        ...options
    };

    // Set logger level based on options
    logger.setLevel(mergedOptions.logLevel);
    logger.info('Initializing AnyFlow SDK');

    // Initialize ethers extensions if enabled
    if (mergedOptions.enableEthersExtensions) {
        ethersExtensions.initialize();
    }

    logger.info('AnyFlow SDK initialized successfully');
    return {
        options: mergedOptions,
        // Add additional SDK functionality here
    };
}

// Export types and utilities
export * from './types';
export * from './utils';

// Export ethers extensions
export * from './extensions/ethers';

// Export framework extensions
export * from './framework';

export default {
    setup,
    ...frameworkExtensions,
}