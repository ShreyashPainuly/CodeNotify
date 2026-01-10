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
exports.CodeforcesAdapter = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const platform_adapter_abstract_1 = require("../base/platform-adapter.abstract");
const contest_schema_1 = require("../../../contests/schemas/contest.schema");
const common_constants_1 = require("../../../common/common.constants");
let CodeforcesAdapter = class CodeforcesAdapter extends platform_adapter_abstract_1.BasePlatformAdapter {
    configService;
    platformName = contest_schema_1.ContestPlatform.CODEFORCES;
    apiBaseUrl = common_constants_1.PLATFORM_URLS.CODEFORCES;
    constructor(configService) {
        const config = {
            enabled: true,
            apiUrl: common_constants_1.PLATFORM_URLS.CODEFORCES,
            timeout: common_constants_1.PLATFORM_TIMEOUTS.CODEFORCES,
            retryAttempts: common_constants_1.HTTP_CONFIG.DEFAULT_RETRY_ATTEMPTS,
            retryDelay: common_constants_1.HTTP_CONFIG.DEFAULT_RETRY_DELAY,
        };
        super(config);
        this.configService = configService;
    }
    async fetchContests() {
        this.logger.log('Fetching contests from Codeforces API');
        try {
            const data = await this.makeRequest(`${this.apiBaseUrl}${common_constants_1.PLATFORM_METADATA.CODEFORCES_CONTEST_ENDPOINT}`);
            if (data.status !== 'OK') {
                throw new Error('Codeforces API returned error status');
            }
            this.logger.log(`Successfully fetched ${data.result.length} contests from Codeforces`);
            return data.result.map((contest) => this.transformToInternalFormat(contest));
        }
        catch (error) {
            this.logger.error(`Failed to fetch contests from Codeforces: ${this.getErrorMessage(error)}`);
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
    transformToInternalFormat(cfContest) {
        const startTime = cfContest.startTimeSeconds
            ? this.unixToDate(cfContest.startTimeSeconds)
            : new Date();
        const endTime = cfContest.startTimeSeconds
            ? this.unixToDate(cfContest.startTimeSeconds + cfContest.durationSeconds)
            : new Date(Date.now() + cfContest.durationSeconds * 1000);
        const phaseMap = {
            BEFORE: contest_schema_1.ContestPhase.BEFORE,
            CODING: contest_schema_1.ContestPhase.CODING,
            PENDING_SYSTEM_TEST: contest_schema_1.ContestPhase.PENDING_SYSTEM_TEST,
            SYSTEM_TEST: contest_schema_1.ContestPhase.SYSTEM_TEST,
            FINISHED: contest_schema_1.ContestPhase.FINISHED,
        };
        const typeMap = {
            CF: contest_schema_1.ContestType.CF,
            IOI: contest_schema_1.ContestType.IOI,
            ICPC: contest_schema_1.ContestType.ICPC,
        };
        return {
            platformId: cfContest.id.toString(),
            platform: contest_schema_1.ContestPlatform.CODEFORCES,
            name: cfContest.name,
            type: typeMap[cfContest.type] || contest_schema_1.ContestType.CF,
            phase: phaseMap[cfContest.phase] || contest_schema_1.ContestPhase.BEFORE,
            startTime,
            endTime,
            durationMinutes: Math.floor(cfContest.durationSeconds / 60),
            websiteUrl: `https://codeforces.com/contest/${cfContest.id}`,
            isActive: cfContest.phase === 'BEFORE' || cfContest.phase === 'CODING',
            platformMetadata: {
                frozen: cfContest.frozen,
                relativeTimeSeconds: cfContest.relativeTimeSeconds,
            },
            lastSyncedAt: new Date(),
        };
    }
};
exports.CodeforcesAdapter = CodeforcesAdapter;
exports.CodeforcesAdapter = CodeforcesAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CodeforcesAdapter);
//# sourceMappingURL=codeforces.adapter.js.map