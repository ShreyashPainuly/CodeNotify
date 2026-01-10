"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePlatformAdapter = void 0;
const common_1 = require("@nestjs/common");
const common_constants_1 = require("../../../common/common.constants");
class BasePlatformAdapter {
    config;
    logger;
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async makeRequest(url, options) {
        const maxAttempts = this.config.retryAttempts || 3;
        const retryDelay = this.config.retryDelay || 1000;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal,
                    headers: {
                        'User-Agent': common_constants_1.HTTP_CONFIG.USER_AGENT,
                        ...options?.headers,
                    },
                });
                clearTimeout(timeoutId);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return (await response.json());
            }
            catch (error) {
                this.logger.error(`Request failed (attempt ${attempt}/${maxAttempts}): ${this.getErrorMessage(error)}`);
                if (attempt === maxAttempts) {
                    throw new Error(`Failed to fetch data from ${this.platformName} after ${maxAttempts} attempts`);
                }
                await this.sleep(retryDelay * attempt);
            }
        }
        throw new Error(`Failed to fetch data from ${this.platformName}`);
    }
    async healthCheck() {
        try {
            await this.makeRequest(this.config.apiUrl);
            return true;
        }
        catch (error) {
            this.logger.error(`Health check failed for ${this.platformName}: ${this.getErrorMessage(error)}`);
            return false;
        }
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    getErrorMessage(error) {
        if (error instanceof Error) {
            return error.message;
        }
        if (typeof error === 'object' && error !== null) {
            return JSON.stringify(error);
        }
        return String(error);
    }
    unixToDate(timestamp) {
        return new Date(timestamp * 1000);
    }
    calculateDuration(startTime, endTime) {
        return Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));
    }
    filterUpcoming(contests) {
        const now = new Date();
        return contests.filter((contest) => contest.startTime > now);
    }
    filterRunning(contests) {
        const now = new Date();
        return contests.filter((contest) => contest.startTime <= now && contest.endTime >= now);
    }
}
exports.BasePlatformAdapter = BasePlatformAdapter;
//# sourceMappingURL=platform-adapter.abstract.js.map