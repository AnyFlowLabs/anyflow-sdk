/**
 * SDK Configuration Options
 */

/**
 * Configuration options for the AnyFlow SDK
 */
export interface SDKOptions {
    /**
     * Enable extensions for ethers.js v6
     * @default true
     */
    enableEthersExtensions: boolean;

    /**
     * Log level for SDK operations
     * @default 'info'
     */
    logLevel: 'debug' | 'info' | 'warn' | 'error' | 'none';

    /**
     * Custom configuration for CLI integration
     * @default {}
     */
    cliConfig: Record<string, unknown>;
}

/**
 * Default SDK configuration options
 */
export const defaultOptions: SDKOptions = {
    enableEthersExtensions: true,
    logLevel: 'info',
    cliConfig: {}
}; 