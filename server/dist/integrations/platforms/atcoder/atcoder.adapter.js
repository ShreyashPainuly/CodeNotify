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
exports.AtCoderAdapter = void 0;
const common_1 = require("@nestjs/common");
const platform_adapter_abstract_1 = require("../base/platform-adapter.abstract");
const contest_schema_1 = require("../../../contests/schemas/contest.schema");
const common_constants_1 = require("../../../common/common.constants");
let AtCoderAdapter = class AtCoderAdapter extends platform_adapter_abstract_1.BasePlatformAdapter {
    platformName = contest_schema_1.ContestPlatform.ATCODER;
    apiEndpoint = common_constants_1.PLATFORM_URLS.ATCODER;
    constructor() {
        const config = {
            enabled: true,
            apiUrl: common_constants_1.PLATFORM_URLS.ATCODER,
            timeout: common_constants_1.PLATFORM_TIMEOUTS.ATCODER,
            retryAttempts: common_constants_1.HTTP_CONFIG.DEFAULT_RETRY_ATTEMPTS,
            retryDelay: common_constants_1.HTTP_CONFIG.DEFAULT_RETRY_DELAY,
        };
        super(config);
    }
    async fetchContests() {
        this.logger.log('Fetching contests from AtCoder');
        try {
            const contests = await this.makeRequest(common_constants_1.PLATFORM_URLS.ATCODER_PROBLEMS);
            if (!Array.isArray(contests)) {
                this.logger.warn('Invalid response from AtCoder API');
                return [];
            }
            const thirtyDaysAgo = Date.now() / common_constants_1.TIME_CONSTANTS.SECONDS_TO_MS -
                common_constants_1.CONTEST_LIMITS.ATCODER_DAYS_FILTER * common_constants_1.TIME_CONSTANTS.DAYS_TO_SECONDS;
            const recentContests = contests.filter((contest) => contest.start_epoch_second >= thirtyDaysAgo);
            const transformedContests = recentContests.map((contest) => this.transformToInternalFormat(contest));
            this.logger.log(`Successfully fetched ${transformedContests.length} contests from AtCoder`);
            return transformedContests;
        }
        catch (error) {
            this.logger.error(`Failed to fetch contests from AtCoder: ${this.getErrorMessage(error)}`);
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
    transformToInternalFormat(acContest) {
        const contest = acContest;
        const startTime = this.unixToDate(contest.start_epoch_second);
        const endTime = new Date(startTime.getTime() + contest.duration_second * 1000);
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
        let type = contest_schema_1.ContestType.ABC;
        const title = contest.title.toUpperCase();
        if (title.includes('ABC') || title.includes('BEGINNER')) {
            type = contest_schema_1.ContestType.ABC;
        }
        else if (title.includes('ARC') || title.includes('REGULAR')) {
            type = contest_schema_1.ContestType.ARC;
        }
        else if (title.includes('AGC') || title.includes('GRAND')) {
            type = contest_schema_1.ContestType.AGC;
        }
        else if (title.includes('AHC') || title.includes('HEURISTIC')) {
            type = contest_schema_1.ContestType.AHC;
        }
        let difficulty;
        if (type === contest_schema_1.ContestType.ABC) {
            difficulty = contest_schema_1.DifficultyLevel.BEGINNER;
        }
        else if (type === contest_schema_1.ContestType.ARC) {
            difficulty = contest_schema_1.DifficultyLevel.MEDIUM;
        }
        else if (type === contest_schema_1.ContestType.AGC) {
            difficulty = contest_schema_1.DifficultyLevel.EXPERT;
        }
        else if (type === contest_schema_1.ContestType.AHC) {
            difficulty = contest_schema_1.DifficultyLevel.HARD;
        }
        return {
            platformId: contest.id,
            platform: contest_schema_1.ContestPlatform.ATCODER,
            name: contest.title,
            type,
            phase,
            startTime,
            endTime,
            durationMinutes: Math.floor(contest.duration_second / 60),
            websiteUrl: `${common_constants_1.PLATFORM_METADATA.ATCODER_CONTEST_URL_BASE}${contest.id}`,
            difficulty,
            isActive: phase === contest_schema_1.ContestPhase.BEFORE || phase === contest_schema_1.ContestPhase.CODING,
            platformMetadata: {
                rate_change: contest.rate_change,
                contest_id: contest.id,
            },
            lastSyncedAt: new Date(),
        };
    }
};
exports.AtCoderAdapter = AtCoderAdapter;
exports.AtCoderAdapter = AtCoderAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AtCoderAdapter);
//# sourceMappingURL=atcoder.adapter.js.map