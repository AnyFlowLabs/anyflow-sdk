/**
 * Ethers.js Contract Extensions
 * 
 * This module extends the functionality of ethers.js Contract classes.
 */

import { logger } from '../../utils/logger';

/**
 * Enhanced Contract Deployment extensions
 */
export const contractExtensions = {
    /**
     * Initialize contract extensions
     */
    initialize: () => {
        logger.debug('Initializing contract deployment extensions');

        try {
            // Check if the project is using the ethers library
            const isEthersAvailable = (() => {
                try {
                    require.resolve('ethers');
                    return true;
                } catch (error) {
                    return false;
                }
            })();

            if (!isEthersAvailable) {
                logger.info('Ethers library not found, skipping contract deployment extensions');
                return;
            }

            // Import ethers dynamically since we've confirmed it exists
            const { BaseContract, ContractFactory } = require('ethers');

            // Store the original deploy method
            const originalDeploy = ContractFactory.prototype.deploy;

            if (!originalDeploy) {
                logger.warn('AnyFlow: ethers.deploy() method not found... This can lead to unexpected behavior when you use the deterministic addresses feature.');
                return;
            }

            // Override the deploy method
            ContractFactory.prototype.deploy = async function (...args: Array<any>) {
                logger.info(`[DEPLOY] Contract deployment initiated`);
                logger.debug(`[DEPLOY] Deployment arguments:`, args);

                // Call the original deploy method with the same context and arguments
                const result = await originalDeploy.apply(this, args);

                const tx = await result.deploymentTransaction();

                if (!tx) {
                    throw new Error("Deployment transaction not found");
                }

                logger.info(`[DEPLOY] Waiting for transaction receipt...`);
                const receipt = await tx.wait();

                logger.info(`[DEPLOY] Transaction receipt address: ${receipt?.contractAddress}`);

                if (receipt?.contractAddress) {
                    return new BaseContract(receipt?.contractAddress, this.interface, this.runner, tx);
                }

                // Return the result to maintain the original behavior
                return result;
            };

            logger.debug('Enhanced contract deployment functionality initialized');
        } catch (error) {
            logger.warn('Failed to initialize contract deployment extensions', error);
        }
    }
};
