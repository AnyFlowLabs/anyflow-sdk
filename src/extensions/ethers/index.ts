/**
 * Ethers.js v6 Extensions
 * 
 * This module provides extensions and enhancements for the ethers.js v6 library.
 */

import { logger } from '../../utils/logger';
import { contractExtensions } from './contract';

/**
 * Ethers extensions module
 */
export const ethersExtensions = {
    /**
     * Initialize all ethers.js extensions
     */
    initialize: () => {
        logger.info('Initializing ethers.js extensions');

        // Initialize all extension modules
        contractExtensions.initialize();

        logger.debug('Ethers.js extensions initialized');
    }
};

// Export individual extension modules
export * from './contract'; 