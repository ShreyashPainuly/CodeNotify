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
var ContestsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestsController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const contests_service_1 = require("./contests.service");
const contest_schema_1 = require("./schemas/contest.schema");
const contest_dto_1 = require("./dto/contest.dto");
const enum_validation_pipe_1 = require("../common/pipes/enum-validation.pipe");
const public_decorator_1 = require("../common/decorators/public.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const guards_1 = require("../common/guards");
const decorators_1 = require("../common/decorators");
let ContestsController = ContestsController_1 = class ContestsController {
    contestsService;
    logger = new common_1.Logger(ContestsController_1.name);
    constructor(contestsService) {
        this.contestsService = contestsService;
    }
    healthCheck() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
        };
    }
    async getContestStats() {
        this.logger.log('Getting contest statistics');
        return this.contestsService.getContestStats();
    }
    async getPlatformStats(platform) {
        this.logger.log(`Getting platform statistics for: ${platform}`);
        return this.contestsService.getPlatformStats(platform);
    }
    async getUpcomingContests(platform) {
        this.logger.log(`Finding upcoming contests for platform: ${platform || 'all'}`);
        return this.contestsService.findUpcoming(platform);
    }
    async getRunningContests(platform) {
        this.logger.log(`Finding running contests for platform: ${platform || 'all'}`);
        return this.contestsService.findRunning(platform);
    }
    async getFinishedContests(platform) {
        this.logger.log(`Finding finished contests for platform: ${platform || 'all'}`);
        return this.contestsService.findFinished(platform);
    }
    async searchContests(query) {
        if (!query || query.trim().length === 0) {
            throw new common_1.BadRequestException('Search query parameter "q" is required');
        }
        this.logger.log(`Searching contests with query: ${query}`);
        return this.contestsService.searchContests(query);
    }
    async filterByDifficulty(level) {
        this.logger.log(`Filtering contests by difficulty: ${level}`);
        return this.contestsService.filterByDifficulty(level);
    }
    async filterByType(type) {
        this.logger.log(`Filtering contests by type: ${type}`);
        return this.contestsService.filterByType(type);
    }
    async findByPlatform(platform, query) {
        this.logger.log(`Finding contests for platform: ${platform}`);
        return this.contestsService.findByPlatform(platform, query);
    }
    async syncAllPlatforms() {
        this.logger.log('Syncing all platforms');
        const results = await this.contestsService.syncAllPlatforms();
        return {
            message: 'Sync completed for all platforms',
            results,
        };
    }
    async syncPlatform(platform, syncRequest) {
        this.logger.log(`Syncing platform: ${platform} (force: ${syncRequest.forceSync})`);
        const result = await this.contestsService.syncPlatform(platform);
        return {
            message: `Sync completed for ${platform}`,
            platform,
            ...result,
        };
    }
    async bulkCreate(bulkCreateDto) {
        this.logger.log(`Bulk creating ${bulkCreateDto.contests.length} contests`);
        return this.contestsService.bulkCreate(bulkCreateDto);
    }
    async create(createContestDto) {
        this.logger.log(`Creating contest: ${createContestDto.name}`);
        return this.contestsService.create(createContestDto);
    }
    async findAll(query) {
        this.logger.log(`Finding contests with query: ${JSON.stringify(query)}`);
        return this.contestsService.findAll(query);
    }
    async findById(id) {
        this.logger.log(`Finding contest by ID: ${id}`);
        return this.contestsService.findById(id);
    }
    async update(id, updateContestDto) {
        this.logger.log(`Updating contest: ${id}`);
        return this.contestsService.update(id, updateContestDto);
    }
    async delete(id) {
        this.logger.log(`Deleting contest: ${id}`);
        return this.contestsService.delete(id);
    }
};
exports.ContestsController = ContestsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], ContestsController.prototype, "healthCheck", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContestsController.prototype, "getContestStats", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('stats/:platform'),
    __param(0, (0, common_1.Param)('platform', new enum_validation_pipe_1.EnumValidationPipe(contest_schema_1.ContestPlatform, 'platform'))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContestsController.prototype, "getPlatformStats", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('upcoming'),
    __param(0, (0, common_1.Query)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContestsController.prototype, "getUpcomingContests", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('running'),
    __param(0, (0, common_1.Query)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContestsController.prototype, "getRunningContests", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('finished'),
    __param(0, (0, common_1.Query)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContestsController.prototype, "getFinishedContests", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContestsController.prototype, "searchContests", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('difficulty/:level'),
    __param(0, (0, common_1.Param)('level', new enum_validation_pipe_1.EnumValidationPipe(contest_schema_1.DifficultyLevel, 'difficulty level'))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContestsController.prototype, "filterByDifficulty", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('type/:type'),
    __param(0, (0, common_1.Param)('type', new enum_validation_pipe_1.EnumValidationPipe(contest_schema_1.ContestType, 'contest type'))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContestsController.prototype, "filterByType", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('platform/:platform'),
    __param(0, (0, common_1.Param)('platform', new enum_validation_pipe_1.EnumValidationPipe(contest_schema_1.ContestPlatform, 'platform'))),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, contest_dto_1.ContestQueryDto]),
    __metadata("design:returntype", Promise)
], ContestsController.prototype, "findByPlatform", null);
__decorate([
    (0, throttler_1.Throttle)({ long: { limit: 100, ttl: 3600000 } }),
    (0, common_1.Post)('sync/all'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContestsController.prototype, "syncAllPlatforms", null);
__decorate([
    (0, throttler_1.Throttle)({ long: { limit: 100, ttl: 3600000 } }),
    (0, common_1.Post)('sync/:platform'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('platform', new enum_validation_pipe_1.EnumValidationPipe(contest_schema_1.ContestPlatform, 'platform'))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, contest_dto_1.SyncRequestDto]),
    __metadata("design:returntype", Promise)
], ContestsController.prototype, "syncPlatform", null);
__decorate([
    (0, throttler_1.Throttle)({ long: { limit: 50, ttl: 3600000 } }),
    (0, common_1.Post)('bulk'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contest_dto_1.BulkCreateContestDto]),
    __metadata("design:returntype", Promise)
], ContestsController.prototype, "bulkCreate", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contest_dto_1.CreateContestDto]),
    __metadata("design:returntype", Promise)
], ContestsController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contest_dto_1.ContestQueryDto]),
    __metadata("design:returntype", Promise)
], ContestsController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContestsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, contest_dto_1.UpdateContestDto]),
    __metadata("design:returntype", Promise)
], ContestsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContestsController.prototype, "delete", null);
exports.ContestsController = ContestsController = ContestsController_1 = __decorate([
    (0, common_1.Controller)('contests'),
    __metadata("design:paramtypes", [contests_service_1.ContestsService])
], ContestsController);
//# sourceMappingURL=contests.controller.js.map