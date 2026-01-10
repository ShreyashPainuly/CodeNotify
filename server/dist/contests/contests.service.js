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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ContestsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const contest_schema_1 = require("./schemas/contest.schema");
const platforms_module_1 = require("../integrations/platforms/platforms.module");
let ContestsService = ContestsService_1 = class ContestsService {
    contestModel;
    logger = new common_1.Logger(ContestsService_1.name);
    platformAdapters = new Map();
    constructor(contestModel, adapters) {
        this.contestModel = contestModel;
        adapters.forEach((adapter) => {
            this.platformAdapters.set(adapter.platformName, adapter);
            this.logger.log(`Registered platform adapter: ${adapter.platformName}`);
        });
    }
    getErrorMessage(error) {
        if (error instanceof Error) {
            return error.message;
        }
        return String(error);
    }
    getErrorStack(error) {
        if (error instanceof Error) {
            return error.stack;
        }
        return undefined;
    }
    async create(createContestDto) {
        try {
            const existingContest = await this.contestModel.findOne({
                platformId: createContestDto.platformId,
                platform: createContestDto.platform,
            });
            if (existingContest) {
                throw new common_1.ConflictException(`Contest with platformId ${createContestDto.platformId} already exists for ${createContestDto.platform}`);
            }
            const contest = new this.contestModel({
                ...createContestDto,
                lastSyncedAt: new Date(),
            });
            const savedContest = await contest.save();
            this.logger.log(`Created contest: ${savedContest.name} (${savedContest.platform})`);
            return this.transformToResponseDto(savedContest);
        }
        catch (error) {
            this.logger.error(`Failed to create contest: ${this.getErrorMessage(error)}`, this.getErrorStack(error));
            throw error;
        }
    }
    async bulkCreate(bulkCreateDto) {
        try {
            const contests = bulkCreateDto.contests.map((contest) => ({
                ...contest,
                lastSyncedAt: new Date(),
            }));
            const savedContests = await this.contestModel.insertMany(contests, {
                ordered: false,
                rawResult: false,
            });
            this.logger.log(`Bulk created ${savedContests.length} contests`);
            return savedContests.map((contest) => this.transformToResponseDto(contest));
        }
        catch (error) {
            this.logger.error(`Failed to bulk create contests: ${this.getErrorMessage(error)}`, this.getErrorStack(error));
            throw error;
        }
    }
    async findAll(query) {
        try {
            const filter = this.buildFilterQuery(query);
            const sortOptions = this.buildSortOptions(query.sortBy, query.sortOrder);
            const [contests, total] = await Promise.all([
                this.contestModel
                    .find(filter)
                    .sort(sortOptions)
                    .skip(query.offset)
                    .limit(query.limit)
                    .exec(),
                this.contestModel.countDocuments(filter),
            ]);
            const data = contests.map((contest) => this.transformToResponseDto(contest));
            return {
                data,
                pagination: {
                    total,
                    limit: query.limit,
                    offset: query.offset,
                    hasNext: query.offset + query.limit < total,
                    hasPrev: query.offset > 0,
                },
            };
        }
        catch (error) {
            this.logger.error(`Failed to find contests: ${this.getErrorMessage(error)}`, this.getErrorStack(error));
            throw error;
        }
    }
    async findById(id) {
        try {
            const contest = await this.contestModel.findById(id).exec();
            if (!contest) {
                throw new common_1.NotFoundException(`Contest with ID ${id} not found`);
            }
            return this.transformToResponseDto(contest);
        }
        catch (error) {
            this.logger.error(`Failed to find contest by ID ${id}: ${this.getErrorMessage(error)}`, this.getErrorStack(error));
            throw error;
        }
    }
    async findByPlatformId(platformId, platform) {
        try {
            const contest = await this.contestModel
                .findOne({ platformId, platform })
                .exec();
            return contest ? this.transformToResponseDto(contest) : null;
        }
        catch (error) {
            this.logger.error(`Failed to find contest by platform ID: ${this.getErrorMessage(error)}`, this.getErrorStack(error));
            throw error;
        }
    }
    async update(id, updateContestDto) {
        try {
            const contest = await this.contestModel
                .findByIdAndUpdate(id, updateContestDto, { new: true })
                .exec();
            if (!contest) {
                throw new common_1.NotFoundException(`Contest with ID ${id} not found`);
            }
            this.logger.log(`Updated contest: ${contest.name} (${contest.platform})`);
            return this.transformToResponseDto(contest);
        }
        catch (error) {
            this.logger.error(`Failed to update contest ${id}: ${this.getErrorMessage(error)}`, this.getErrorStack(error));
            throw error;
        }
    }
    async delete(id) {
        try {
            const result = await this.contestModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new common_1.NotFoundException(`Contest with ID ${id} not found`);
            }
            this.logger.log(`Deleted contest: ${result.name} (${result.platform})`);
        }
        catch (error) {
            this.logger.error(`Failed to delete contest ${id}: ${this.getErrorMessage(error)}`, this.getErrorStack(error));
            throw error;
        }
    }
    async findByPlatform(platform, query) {
        try {
            const filter = { platform, isActive: true };
            if (query?.phase)
                filter.phase = query.phase;
            if (query?.type)
                filter.type = query.type;
            if (query?.difficulty)
                filter.difficulty = query.difficulty;
            const contests = await this.contestModel
                .find(filter)
                .sort({ startTime: 1 })
                .limit(query?.limit || 50)
                .exec();
            return contests.map((contest) => this.transformToResponseDto(contest));
        }
        catch (error) {
            this.logger.error(`Failed to find contests by platform ${platform}: ${this.getErrorMessage(error)}`, this.getErrorStack(error));
            throw error;
        }
    }
    async findUpcoming(platform) {
        try {
            const filter = {
                startTime: { $gt: new Date() },
                isActive: true,
            };
            if (platform)
                filter.platform = platform;
            const contests = await this.contestModel
                .find(filter)
                .sort({ startTime: 1 })
                .limit(50)
                .exec();
            return contests.map((contest) => this.transformToResponseDto(contest));
        }
        catch (error) {
            this.logger.error(`Failed to find upcoming contests: ${this.getErrorMessage(error)}`, this.getErrorStack(error));
            throw error;
        }
    }
    async findRunning(platform) {
        try {
            const now = new Date();
            const filter = {
                startTime: { $lte: now },
                endTime: { $gte: now },
                isActive: true,
            };
            if (platform)
                filter.platform = platform;
            const contests = await this.contestModel
                .find(filter)
                .sort({ startTime: 1 })
                .exec();
            return contests.map((contest) => this.transformToResponseDto(contest));
        }
        catch (error) {
            this.logger.error(`Failed to find running contests: ${this.getErrorMessage(error)}`, this.getErrorStack(error));
            throw error;
        }
    }
    async findFinished(platform) {
        try {
            const filter = {
                endTime: { $lt: new Date() },
                isActive: true,
            };
            if (platform)
                filter.platform = platform;
            const contests = await this.contestModel
                .find(filter)
                .sort({ endTime: -1 })
                .limit(50)
                .exec();
            return contests.map((contest) => this.transformToResponseDto(contest));
        }
        catch (error) {
            this.logger.error(`Failed to find finished contests: ${this.getErrorMessage(error)}`, this.getErrorStack(error));
            throw error;
        }
    }
    async searchContests(searchQuery) {
        try {
            const contests = await this.contestModel
                .find({
                $text: { $search: searchQuery },
                isActive: true,
            }, { score: { $meta: 'textScore' } })
                .sort({ score: { $meta: 'textScore' } })
                .limit(20)
                .exec();
            return contests.map((contest) => this.transformToResponseDto(contest));
        }
        catch (error) {
            this.logger.error(`Failed to search contests: ${this.getErrorMessage(error)}`, this.getErrorStack(error));
            throw error;
        }
    }
    async filterByDifficulty(difficulty) {
        try {
            const contests = await this.contestModel
                .find({ difficulty, isActive: true })
                .sort({ startTime: 1 })
                .limit(50)
                .exec();
            return contests.map((contest) => this.transformToResponseDto(contest));
        }
        catch (error) {
            this.logger.error(`Failed to filter by difficulty: ${this.getErrorMessage(error)}`, this.getErrorStack(error));
            throw error;
        }
    }
    async filterByType(type) {
        try {
            const contests = await this.contestModel
                .find({ type, isActive: true })
                .sort({ startTime: 1 })
                .limit(50)
                .exec();
            return contests.map((contest) => this.transformToResponseDto(contest));
        }
        catch (error) {
            this.logger.error(`Failed to filter by type: ${this.getErrorMessage(error)}`, this.getErrorStack(error));
            throw error;
        }
    }
    async getContestStats() {
        try {
            const now = new Date();
            const [totalContests, upcomingContests, runningContests, finishedContests, platformBreakdown, typeBreakdown, difficultyBreakdown,] = await Promise.all([
                this.contestModel.countDocuments({ isActive: true }),
                this.contestModel.countDocuments({
                    startTime: { $gt: now },
                    isActive: true,
                }),
                this.contestModel.countDocuments({
                    startTime: { $lte: now },
                    endTime: { $gte: now },
                    isActive: true,
                }),
                this.contestModel.countDocuments({
                    endTime: { $lt: now },
                    isActive: true,
                }),
                this.contestModel.aggregate([
                    { $match: { isActive: true } },
                    { $group: { _id: '$platform', count: { $sum: 1 } } },
                ]),
                this.contestModel.aggregate([
                    { $match: { isActive: true } },
                    { $group: { _id: '$type', count: { $sum: 1 } } },
                ]),
                this.contestModel.aggregate([
                    { $match: { isActive: true, difficulty: { $exists: true } } },
                    { $group: { _id: '$difficulty', count: { $sum: 1 } } },
                ]),
            ]);
            return {
                totalContests,
                upcomingContests,
                runningContests,
                finishedContests,
                platformBreakdown: this.transformBreakdown(platformBreakdown),
                typeBreakdown: this.transformBreakdown(typeBreakdown),
                difficultyBreakdown: this.transformBreakdown(difficultyBreakdown),
            };
        }
        catch (error) {
            this.logger.error(`Failed to get contest stats: ${this.getErrorMessage(error)}`, this.getErrorStack(error));
            throw error;
        }
    }
    async getPlatformStats(platform) {
        try {
            const now = new Date();
            const filter = { platform, isActive: true };
            const [totalContests, upcomingContests, runningContests, finishedContests, avgStats, lastSync,] = await Promise.all([
                this.contestModel.countDocuments(filter),
                this.contestModel.countDocuments({
                    ...filter,
                    startTime: { $gt: now },
                }),
                this.contestModel.countDocuments({
                    ...filter,
                    startTime: { $lte: now },
                    endTime: { $gte: now },
                }),
                this.contestModel.countDocuments({ ...filter, endTime: { $lt: now } }),
                this.contestModel.aggregate([
                    { $match: filter },
                    {
                        $group: {
                            _id: null,
                            avgDuration: { $avg: '$durationMinutes' },
                            avgParticipants: { $avg: '$participantCount' },
                        },
                    },
                ]),
                this.contestModel
                    .findOne(filter, { lastSyncedAt: 1 })
                    .sort({ lastSyncedAt: -1 }),
            ]);
            return {
                platform,
                totalContests,
                upcomingContests,
                runningContests,
                finishedContests,
                averageDuration: avgStats[0]?.avgDuration ?? 0,
                averageParticipants: avgStats[0]?.avgParticipants ?? 0,
                lastSyncTime: lastSync?.lastSyncedAt,
            };
        }
        catch (error) {
            this.logger.error(`Failed to get platform stats for ${platform}: ${this.getErrorMessage(error)}`, this.getErrorStack(error));
            throw error;
        }
    }
    buildFilterQuery(query) {
        const filter = {};
        if (query.platform)
            filter.platform = query.platform;
        if (query.phase)
            filter.phase = query.phase;
        if (query.type)
            filter.type = query.type;
        if (query.difficulty)
            filter.difficulty = query.difficulty;
        if (query.isActive !== undefined)
            filter.isActive = query.isActive;
        if (query.isNotified !== undefined)
            filter.isNotified = query.isNotified;
        if (query.country)
            filter.country = query.country;
        if (query.city)
            filter.city = query.city;
        if (query.startDate || query.endDate) {
            const timeFilter = {};
            if (query.startDate)
                timeFilter.$gte = query.startDate;
            if (query.endDate)
                timeFilter.$lte = query.endDate;
            filter.startTime = timeFilter;
        }
        if (query.search) {
            filter.$text = { $search: query.search };
        }
        return filter;
    }
    buildSortOptions(sortBy, sortOrder) {
        const order = sortOrder === 'desc' ? -1 : 1;
        return { [sortBy]: order };
    }
    transformToResponseDto(contest) {
        return {
            id: String(contest._id),
            platformId: contest.platformId,
            name: contest.name,
            platform: contest.platform,
            phase: contest.phase,
            type: contest.type,
            startTime: contest.startTime,
            endTime: contest.endTime,
            durationMinutes: contest.durationMinutes,
            description: contest.description,
            websiteUrl: contest.websiteUrl,
            registrationUrl: contest.registrationUrl,
            preparedBy: contest.preparedBy,
            difficulty: contest.difficulty,
            participantCount: contest.participantCount,
            problemCount: contest.problemCount,
            country: contest.country,
            city: contest.city,
            platformMetadata: contest.platformMetadata,
            isActive: contest.isActive,
            isNotified: contest.isNotified,
            lastSyncedAt: contest.lastSyncedAt,
            createdAt: contest.createdAt ?? new Date(),
            updatedAt: contest.updatedAt ?? new Date(),
        };
    }
    transformBreakdown(breakdown) {
        return breakdown.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
        }, {});
    }
    async syncPlatform(platform) {
        this.logger.log(`Syncing contests from platform: ${platform}`);
        const adapter = this.platformAdapters.get(platform);
        if (!adapter) {
            throw new Error(`Platform ${platform} not registered or not enabled`);
        }
        try {
            const contests = await adapter.fetchContests();
            return await this.upsertContests(contests);
        }
        catch (error) {
            this.logger.error(`Failed to sync ${platform}: ${this.getErrorMessage(error)}`);
            throw error;
        }
    }
    async syncAllPlatforms() {
        this.logger.log('Syncing contests from all platforms');
        const results = {};
        for (const [platform] of this.platformAdapters) {
            try {
                this.logger.log(`Syncing ${platform}...`);
                results[platform] = await this.syncPlatform(platform);
            }
            catch (error) {
                this.logger.error(`Failed to sync ${platform}: ${this.getErrorMessage(error)}`);
                results[platform] = { synced: 0, updated: 0, failed: 0 };
            }
        }
        return results;
    }
    async upsertContests(contests) {
        let synced = 0;
        let updated = 0;
        let failed = 0;
        for (const contestData of contests) {
            try {
                const existing = await this.contestModel.findOne({
                    platformId: contestData.platformId,
                    platform: contestData.platform,
                });
                if (existing) {
                    await this.contestModel.updateOne({ _id: existing._id }, { $set: { ...contestData, lastSyncedAt: new Date() } });
                    updated++;
                }
                else {
                    await this.contestModel.create({
                        ...contestData,
                        lastSyncedAt: new Date(),
                    });
                    synced++;
                }
            }
            catch (error) {
                this.logger.error(`Failed to upsert contest ${contestData.platformId}: ${this.getErrorMessage(error)}`);
                failed++;
            }
        }
        this.logger.log(`Sync completed: ${synced} new, ${updated} updated, ${failed} failed`);
        return { synced, updated, failed };
    }
};
exports.ContestsService = ContestsService;
exports.ContestsService = ContestsService = ContestsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(contest_schema_1.Contest.name)),
    __param(1, (0, common_1.Inject)(platforms_module_1.PLATFORM_ADAPTERS)),
    __metadata("design:paramtypes", [mongoose_2.Model, Array])
], ContestsService);
//# sourceMappingURL=contests.service.js.map