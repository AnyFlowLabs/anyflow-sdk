import { HardhatUserConfig } from "hardhat/config";
import AnyflowHardhatConfig from './hardhat.config';

/**
 * Simple deep merge function that concatenates arrays
 *
 * @param target The target object
 * @param sources The source objects to merge
 * @returns The merged object
 */
function deepMerge<T extends Record<string, any>>(target: T, ...sources: Record<string, any>[]): T {
    if (!sources.length) return target;

    const source = sources.shift();
    if (source === undefined) return target;

    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            // Handle arrays by concatenating them
            if (Array.isArray(source[key])) {
                if (!target[key as keyof T]) {
                    Object.assign(target, { [key]: [] });
                } else if (!Array.isArray(target[key as keyof T])) {
                    (target as any)[key] = [target[key as keyof T]];
                }
                (target as any)[key] = [...(target as any)[key], ...source[key]];
            }
            // Handle nested objects with recursive merge
            else if (isObject(source[key])) {
                if (!target[key as keyof T]) Object.assign(target, { [key]: {} });
                deepMerge(target[key as keyof T], source[key]);
            }
            // Handle primitive values with direct assignment
            else {
                Object.assign(target, { [key]: source[key] });
            }
        });
    }

    return deepMerge(target, ...sources);
}

/**
 * Check if value is an object
 *
 * @param item The item to check
 * @returns Whether the item is an object
 */
function isObject(item: any): boolean {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Get the raw hardhat config defined for AnyFlow
 *
 * @returns The hardhat config
 */
export function getHardhatConfig(): HardhatUserConfig {
    return AnyflowHardhatConfig;
}

/**
 * Deep merge the hardhat config with the provided config
 *
 * @param config The config to merge
 * @returns The merged config
 */
export function mergeHardhatConfig(config: HardhatUserConfig): HardhatUserConfig {
    return deepMerge({} as HardhatUserConfig, AnyflowHardhatConfig, config);
}