"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncRequestDto = exports.BulkCreateContestDto = exports.PlatformStatsDto = exports.ContestStatsDto = exports.ContestQueryDto = exports.UpdateContestDto = exports.CreateContestDto = exports.SyncRequestSchema = exports.BulkCreateContestSchema = exports.PlatformStatsSchema = exports.ContestStatsSchema = exports.ContestQuerySchema = exports.UpdateContestSchema = exports.CreateContestSchema = void 0;
const zod_1 = require("zod");
const nestjs_zod_1 = require("nestjs-zod");
const contest_schema_1 = require("../schemas/contest.schema");
const PlatformMetadataSchema = zod_1.z
    .object({
    frozen: zod_1.z.boolean().optional(),
    relativeTimeSeconds: zod_1.z.number().optional(),
    icpcRegion: zod_1.z.string().optional(),
    season: zod_1.z.string().optional(),
    titleSlug: zod_1.z.string().optional(),
    premiumOnly: zod_1.z.boolean().optional(),
    division: zod_1.z.string().optional(),
    rated: zod_1.z.boolean().optional(),
    ratedRange: zod_1.z.string().optional(),
    penalty: zod_1.z.number().optional(),
})
    .optional();
exports.CreateContestSchema = zod_1.z
    .object({
    platformId: zod_1.z.string().min(1, 'Platform ID is required'),
    name: zod_1.z.string().min(1, 'Contest name is required'),
    platform: zod_1.z.enum(contest_schema_1.ContestPlatform),
    phase: zod_1.z.enum(contest_schema_1.ContestPhase),
    type: zod_1.z.enum(contest_schema_1.ContestType),
    startTime: zod_1.z.coerce.date(),
    endTime: zod_1.z.coerce.date(),
    durationMinutes: zod_1.z.number().positive('Duration must be positive'),
    description: zod_1.z.string().optional(),
    websiteUrl: zod_1.z.url().optional(),
    registrationUrl: zod_1.z.url().optional(),
    preparedBy: zod_1.z.string().optional(),
    difficulty: zod_1.z.enum(contest_schema_1.DifficultyLevel).optional(),
    participantCount: zod_1.z.number().min(0).optional(),
    problemCount: zod_1.z.number().min(0).optional(),
    country: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    platformMetadata: PlatformMetadataSchema,
    isActive: zod_1.z.boolean().default(true),
})
    .refine((data) => data.endTime > data.startTime, {
    message: 'End time must be after start time',
    path: ['endTime'],
});
exports.UpdateContestSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(1).optional(),
    phase: zod_1.z.enum(contest_schema_1.ContestPhase).optional(),
    type: zod_1.z.enum(contest_schema_1.ContestType).optional(),
    startTime: zod_1.z.coerce.date().optional(),
    endTime: zod_1.z.coerce.date().optional(),
    durationMinutes: zod_1.z.number().positive().optional(),
    description: zod_1.z.string().optional(),
    websiteUrl: zod_1.z.url().optional(),
    registrationUrl: zod_1.z.string().url().optional(),
    preparedBy: zod_1.z.string().optional(),
    difficulty: zod_1.z.enum(contest_schema_1.DifficultyLevel).optional(),
    participantCount: zod_1.z.number().min(0).optional(),
    problemCount: zod_1.z.number().min(0).optional(),
    country: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    platformMetadata: PlatformMetadataSchema,
    isActive: zod_1.z.boolean().optional(),
    isNotified: zod_1.z.boolean().optional(),
})
    .partial()
    .refine((data) => {
    if (data.startTime && data.endTime) {
        return data.endTime > data.startTime;
    }
    return true;
}, {
    message: 'End time must be after start time',
    path: ['endTime'],
});
exports.ContestQuerySchema = zod_1.z.object({
    platform: zod_1.z.enum(contest_schema_1.ContestPlatform).optional(),
    phase: zod_1.z.enum(contest_schema_1.ContestPhase).optional(),
    type: zod_1.z.enum(contest_schema_1.ContestType).optional(),
    difficulty: zod_1.z.enum(contest_schema_1.DifficultyLevel).optional(),
    isActive: zod_1.z.boolean().optional(),
    isNotified: zod_1.z.boolean().optional(),
    search: zod_1.z.string().optional(),
    startDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().optional(),
    country: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    limit: zod_1.z.coerce.number().min(1).max(100).default(20),
    offset: zod_1.z.coerce.number().min(0).default(0),
    sortBy: zod_1.z
        .enum(['startTime', 'endTime', 'name', 'participantCount'])
        .default('startTime'),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('asc'),
});
exports.ContestStatsSchema = zod_1.z.object({
    totalContests: zod_1.z.number(),
    upcomingContests: zod_1.z.number(),
    runningContests: zod_1.z.number(),
    finishedContests: zod_1.z.number(),
    platformBreakdown: zod_1.z.record(zod_1.z.string(), zod_1.z.number()),
    typeBreakdown: zod_1.z.record(zod_1.z.string(), zod_1.z.number()),
    difficultyBreakdown: zod_1.z.record(zod_1.z.string(), zod_1.z.number()),
});
exports.PlatformStatsSchema = zod_1.z.object({
    platform: zod_1.z.enum(contest_schema_1.ContestPlatform),
    totalContests: zod_1.z.number(),
    upcomingContests: zod_1.z.number(),
    runningContests: zod_1.z.number(),
    finishedContests: zod_1.z.number(),
    averageDuration: zod_1.z.number(),
    averageParticipants: zod_1.z.number(),
    lastSyncTime: zod_1.z.date().optional(),
});
exports.BulkCreateContestSchema = zod_1.z.object({
    contests: zod_1.z.array(exports.CreateContestSchema).min(1).max(100),
});
exports.SyncRequestSchema = zod_1.z.object({
    forceSync: zod_1.z.boolean().optional().default(false),
}).optional().default({ forceSync: false });
class CreateContestDto extends (0, nestjs_zod_1.createZodDto)(exports.CreateContestSchema) {
}
exports.CreateContestDto = CreateContestDto;
class UpdateContestDto extends (0, nestjs_zod_1.createZodDto)(exports.UpdateContestSchema) {
}
exports.UpdateContestDto = UpdateContestDto;
class ContestQueryDto extends (0, nestjs_zod_1.createZodDto)(exports.ContestQuerySchema) {
}
exports.ContestQueryDto = ContestQueryDto;
class ContestStatsDto extends (0, nestjs_zod_1.createZodDto)(exports.ContestStatsSchema) {
}
exports.ContestStatsDto = ContestStatsDto;
class PlatformStatsDto extends (0, nestjs_zod_1.createZodDto)(exports.PlatformStatsSchema) {
}
exports.PlatformStatsDto = PlatformStatsDto;
class BulkCreateContestDto extends (0, nestjs_zod_1.createZodDto)(exports.BulkCreateContestSchema) {
}
exports.BulkCreateContestDto = BulkCreateContestDto;
class SyncRequestDto extends (0, nestjs_zod_1.createZodDto)(exports.SyncRequestSchema) {
}
exports.SyncRequestDto = SyncRequestDto;
//# sourceMappingURL=contest.dto.js.map