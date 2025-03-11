import { setup } from '../index';
import { logger } from '../utils/logger';

// Mock the logger
jest.mock('../utils/logger', () => ({
    logger: {
        setLevel: jest.fn(),
        info: jest.fn(),
        debug: jest.fn()
    }
}));

describe('SDK Setup', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('setup initializes with default options', () => {
        const sdk = setup();

        expect(sdk.options).toEqual({
            enableEthersExtensions: true,
            logLevel: 'info',
            cliConfig: {}
        });

        expect(logger.setLevel).toHaveBeenCalledWith('info');
        expect(logger.info).toHaveBeenCalledWith('Initializing AnyFlow SDK');
    });

    test('setup accepts custom options', () => {
        const customOptions = {
            enableEthersExtensions: false,
            logLevel: 'debug' as const,
            cliConfig: { testKey: 'testValue' }
        };

        const sdk = setup(customOptions);

        expect(sdk.options).toEqual(customOptions);
        expect(logger.setLevel).toHaveBeenCalledWith('debug');
    });
}); 