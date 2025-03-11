/**
 * Logger utility for the AnyFlow SDK
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'none';

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
    'debug': 0,
    'info': 1,
    'warn': 2,
    'error': 3,
    'none': 4
};

/**
 * Logger class for SDK operations
 */
export class Logger {
    private level: LogLevel;

    constructor(level: LogLevel = 'info') {
        this.level = level;
    }

    /**
     * Set the log level
     */
    setLevel(level: LogLevel): void {
        this.level = level;
    }

    /**
     * Check if a message at the given level should be logged
     */
    private shouldLog(messageLevel: LogLevel): boolean {
        return LOG_LEVEL_PRIORITY[messageLevel] >= LOG_LEVEL_PRIORITY[this.level];
    }

    /**
     * Log a debug message
     */
    debug(message: string, ...args: any[]): void {
        if (this.shouldLog('debug')) {
            console.debug(`[AnyFlow SDK] ${message}`, ...args);
        }
    }

    /**
     * Log an info message
     */
    info(message: string, ...args: any[]): void {
        if (this.shouldLog('info')) {
            console.info(`[AnyFlow SDK] ${message}`, ...args);
        }
    }

    /**
     * Log a warning message
     */
    warn(message: string, ...args: any[]): void {
        if (this.shouldLog('warn')) {
            console.warn(`[AnyFlow SDK] ${message}`, ...args);
        }
    }

    /**
     * Log an error message
     */
    error(message: string, ...args: any[]): void {
        if (this.shouldLog('error')) {
            console.error(`[AnyFlow SDK] ${message}`, ...args);
        }
    }
}

// Create a default logger instance
export const logger = new Logger(); 