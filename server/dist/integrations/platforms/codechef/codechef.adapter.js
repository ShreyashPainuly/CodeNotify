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
exports.CodeChefAdapter = void 0;
const common_1 = require("@nestjs/common");
const platform_adapter_abstract_1 = require("../base/platform-adapter.abstract");
const contest_schema_1 = require("../../../contests/schemas/contest.schema");
const common_constants_1 = require("../../../common/common.constants");
let CodeChefAdapter = class CodeChefAdapter extends platform_adapter_abstract_1.BasePlatformAdapter {
    platformName = contest_schema_1.ContestPlatform.CODECHEF;
    apiEndpoint = common_constants_1.PLATFORM_URLS.CODECHEF;
    constructor() {
        const config = {
            enabled: true,
            apiUrl: common_constants_1.PLATFORM_URLS.CODECHEF,
            timeout: common_constants_1.PLATFORM_TIMEOUTS.CODECHEF,
            retryAttempts: common_constants_1.HTTP_CONFIG.DEFAULT_RETRY_ATTEMPTS,
            retryDelay: common_constants_1.HTTP_CONFIG.DEFAULT_RETRY_DELAY,
        };
        super(config);
    }
    async fetchContests() {
        this.logger.log('Fetching contests from CodeChef API');
        try {
            const response = await this.makeRequest(this.apiEndpoint);
            if (response.status !== 'success') {
                this.logger.warn('CodeChef API returned non-success status');
                return [];
            }
            const allContests = [];
            if (response.present_contests) {
                allContests.push(...response.present_contests.map((contest) => this.transformCodeChefContest(contest, 'present')));
            }
            if (response.future_contests) {
                allContests.push(...response.future_contests.map((contest) => this.transformCodeChefContest(contest, 'future')));
            }
            if (response.past_contests) {
                const recentPast = response.past_contests.slice(0, common_constants_1.CONTEST_LIMITS.CODECHEF_PAST_CONTESTS);
                allContests.push(...recentPast.map((contest) => this.transformCodeChefContest(contest, 'past')));
            }
            this.logger.log(`Successfully fetched ${allContests.length} contests from CodeChef`);
            return allContests;
        }
        catch (error) {
            this.logger.error(`Failed to fetch contests from CodeChef: ${this.getErrorMessage(error)}`);
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
    transformToInternalFormat(data) {
        return this.transformCodeChefContest(data, 'future');
    }
    transformCodeChefContest(ccContest, category) {
        const startTime = new Date(ccContest.contest_start_date_iso);
        const endTime = new Date(ccContest.contest_end_date_iso);
        const now = new Date();
        let phase;
        if (category === 'future' || startTime > now) {
            phase = contest_schema_1.ContestPhase.BEFORE;
        }
        else if (category === 'present' || (startTime <= now && endTime > now)) {
            phase = contest_schema_1.ContestPhase.CODING;
        }
        else {
            phase = contest_schema_1.ContestPhase.FINISHED;
        }
        let type = contest_schema_1.ContestType.LONG;
        const name = ccContest.contest_name.toLowerCase();
        const code = ccContest.contest_code.toLowerCase();
        if (name.includes('starters') || code.includes('start')) {
            type = contest_schema_1.ContestType.STARTERS;
        }
        else if (name.includes('lunchtime') ||
            name.includes('lunch time') ||
            code.includes('ltime')) {
            type = contest_schema_1.ContestType.LUNCH_TIME;
        }
        else if (name.includes('cookoff') ||
            name.includes('cook-off') ||
            name.includes('cook off') ||
            code.includes('cook')) {
            type = contest_schema_1.ContestType.COOK_OFF;
        }
        else if (name.includes('long')) {
            type = contest_schema_1.ContestType.LONG;
        }
        let difficulty;
        if (type === contest_schema_1.ContestType.STARTERS) {
            difficulty = contest_schema_1.DifficultyLevel.BEGINNER;
        }
        else if (type === contest_schema_1.ContestType.LUNCH_TIME) {
            difficulty = contest_schema_1.DifficultyLevel.MEDIUM;
        }
        else if (type === contest_schema_1.ContestType.COOK_OFF) {
            difficulty = contest_schema_1.DifficultyLevel.MEDIUM;
        }
        else if (type === contest_schema_1.ContestType.LONG) {
            difficulty = contest_schema_1.DifficultyLevel.HARD;
        }
        return {
            platformId: ccContest.contest_code,
            platform: contest_schema_1.ContestPlatform.CODECHEF,
            name: ccContest.contest_name,
            type,
            phase,
            startTime,
            endTime,
            durationMinutes: this.calculateDuration(startTime, endTime),
            websiteUrl: `${common_constants_1.PLATFORM_METADATA.CODECHEF_CONTEST_URL_BASE}${ccContest.contest_code}`,
            participantCount: ccContest.distinct_users || 0,
            difficulty,
            isActive: phase === contest_schema_1.ContestPhase.BEFORE || phase === contest_schema_1.ContestPhase.CODING,
            platformMetadata: {
                contest_code: ccContest.contest_code,
                contest_type: ccContest.contest_type,
                distinct_users: ccContest.distinct_users,
            },
            lastSyncedAt: new Date(),
        };
    }
};
exports.CodeChefAdapter = CodeChefAdapter;
exports.CodeChefAdapter = CodeChefAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CodeChefAdapter);
//# sourceMappingURL=codechef.adapter.js.map