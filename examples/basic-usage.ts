/**
 * Basic usage example for AnyFlow SDK inside a hardhat project
 */
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import anyflow from 'anyflow-sdk';

const anyflow = anyflow.setup();

const config: HardhatUserConfig = {
    solidity: "0.8.28",
    ...anyflow.getHardhatConfig(),
};

export default config;