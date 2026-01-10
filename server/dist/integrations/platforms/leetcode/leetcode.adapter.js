"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeetCodeAdapter = void 0;
const common_1 = require("@nestjs/common");
const platform_adapter_abstract_1 = require("../base/platform-adapter.abstract");
const contest_schema_1 = require("../../../contests/schemas/contest.schema");
const common_constants_1 = require("../../../common/common.constants");
let LeetCodeAdapter = class LeetCodeAdapter extends platform_adapter_abstract_1.BasePlatformAdapter {
    platformName = contest_schema_1.ContestPlatform.LEETCODE;
    graphqlEndpoint = common_constants_1.PLATFORM_URLS.LEETCODE;
    constructor() {
        const config = {
            enabled: true,
            apiUrl: common_constants_1.PLATFORM_URLS.LEETCODE,
            timeout: common_constants_1.PLATFORM_TIMEOUTS.LEETCODE,
            retryAttempts: common_constants_1.HTTP_CONFIG.DEFAULT_RETRY_ATTEMPTS,
            retryDelay: common_constants_1.HTTP_CONFIG.DEFAULT_RETRY_DELAY,
        };
        super(config);
    }
    async fetchContests() {
        this.logger.log('Fetching contests from LeetCode GraphQL API');
        try {
            const query = `
        query allContests {
          allContests {
            title
            titleSlug
            startTime
            duration
            originStartTime
            isVirtual
            cardImg
            description
          }
        }
      `;
            const response = await this.makeGraphQLRequest(query);
            if (!response.data?.allContests) {
                this.logger.warn('No contests found in LeetCode response');
                return [];
            }
            const contests = response.data.allContests.map((contest) => this.transformToInternalFormat(contest));
            this.logger.log(`Successfully fetched ${contests.length} contests from LeetCode`);
            return contests;
        }
        catch (error) {
            this.logger.error(`Failed to fetch contests from LeetCode: ${this.getErrorMessage(error)}`);
            throw error;
        }
    }
    async fetchUpcomingContests() {
        const contests = await this.fetchContests();
        return this.filterUpcoming(contests);
    }
    async fetchRunningContests() {
        const contests = await this.fetchContests();
        return this.filterRunning(contests);
    }
    transformToInternalFormat(lcContest) {
        const startTime = this.unixToDate(lcContest.startTime);
        const endTime = new Date(startTime.getTime() + lcContest.duration * 1000);
        const now = new Date();
        let phase;
        if (startTime > now) {
            phase = contest_schema_1.ContestPhase.BEFORE;
        }
        else if (endTime > now) {
            phase = contest_schema_1.ContestPhase.CODING;
        }
        else {
            phase = contest_schema_1.ContestPhase.FINISHED;
        }
        let type = contest_schema_1.ContestType.WEEKLY;
        if (lcContest.title.toLowerCase().includes('biweekly')) {
            type = contest_schema_1.ContestType.BIWEEKLY;
        }
        else if (lcContest.title.toLowerCase().includes('weekly')) {
            type = contest_schema_1.ContestType.WEEKLY;
        }
        return {
            platformId: lcContest.titleSlug,
            platform: contest_schema_1.ContestPlatform.LEETCODE,
            name: lcContest.title,
            type,
            phase,
            startTime,
            endTime,
            durationMinutes: Math.floor(lcContest.duration / 60),
            description: lcContest.description,
            websiteUrl: `${common_constants_1.PLATFORM_METADATA.LEETCODE_CONTEST_URL_BASE}${lcContest.titleSlug}`,
            isActive: phase === contest_schema_1.ContestPhase.BEFORE || phase === contest_schema_1.ContestPhase.CODING,
            platformMetadata: {
                titleSlug: lcContest.titleSlug,
                isVirtual: lcContest.isVirtual,
                cardImg: lcContest.cardImg,
                originStartTime: lcContest.originStartTime,
            },
            lastSyncedAt: new Date(),
        };
    }
    async makeGraphQLRequest(query) {
        const maxAttempts = this.config.retryAttempts || 3;
        const retryDelay = this.config.retryDelay || 1000;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
                const response = await fetch(this.graphqlEndpoint, {
                    method: 'POST',
                    signal: controller.signal,
                    headers: {
                        'Content-Type': common_constants_1.LEETCODE_HEADERS.CONTENT_TYPE,
                        'User-Agent': common_constants_1.HTTP_CONFIG.USER_AGENT,
                        Origin: common_constants_1.LEETCODE_HEADERS.ORIGIN,
                        Referer: common_constants_1.LEETCODE_HEADERS.REFERER,
                    },
                    body: JSON.stringify({ query }),
                });
                clearTimeout(timeoutId);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                const data = (await response.json());
                return data;
            }
            catch (error) {
                this.logger.error(`GraphQL request failed (attempt ${attempt}/${maxAttempts}): ${this.getErrorMessage(error)}`);
                if (error instanceof Error && error.name === 'AbortError') {
                    throw new Error('LeetCode GraphQL request timed out');
                }
                if (attempt === maxAttempts) {
                    throw new Error(`Failed to fetch data from LeetCode after ${maxAttempts} attempts`);
                }
                await this.sleep(retryDelay * attempt);
            }
        }
        throw new Error('Failed to fetch data from LeetCode');
    }
    async healthCheck() {
        try {
            const query = `
        query {
          allContests {
            title
          }
        }
      `;
            await this.makeGraphQLRequest(query);
            return true;
        }
        catch (error) {
            this.logger.error(`Health check failed for LeetCode: ${this.getErrorMessage(error)}`);
            return false;
        }
    }
};
exports.LeetCodeAdapter = LeetCodeAdapter;
exports.LeetCodeAdapter = LeetCodeAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LeetCodeAdapter);
//# sourceMappingURL=leetcode.adapter.js.map