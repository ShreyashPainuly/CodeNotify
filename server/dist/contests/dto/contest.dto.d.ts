import { z } from 'zod';
import { ContestPlatform, ContestPhase, ContestType, DifficultyLevel } from '../schemas/contest.schema';
export declare const CreateContestSchema: z.ZodObject<{
    platformId: z.ZodString;
    name: z.ZodString;
    platform: z.ZodEnum<typeof ContestPlatform>;
    phase: z.ZodEnum<typeof ContestPhase>;
    type: z.ZodEnum<typeof ContestType>;
    startTime: z.ZodCoercedDate<unknown>;
    endTime: z.ZodCoercedDate<unknown>;
    durationMinutes: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
    websiteUrl: z.ZodOptional<z.ZodURL>;
    registrationUrl: z.ZodOptional<z.ZodURL>;
    preparedBy: z.ZodOptional<z.ZodString>;
    difficulty: z.ZodOptional<z.ZodEnum<typeof DifficultyLevel>>;
    participantCount: z.ZodOptional<z.ZodNumber>;
    problemCount: z.ZodOptional<z.ZodNumber>;
    country: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    platformMetadata: z.ZodOptional<z.ZodObject<{
        frozen: z.ZodOptional<z.ZodBoolean>;
        relativeTimeSeconds: z.ZodOptional<z.ZodNumber>;
        icpcRegion: z.ZodOptional<z.ZodString>;
        season: z.ZodOptional<z.ZodString>;
        titleSlug: z.ZodOptional<z.ZodString>;
        premiumOnly: z.ZodOptional<z.ZodBoolean>;
        division: z.ZodOptional<z.ZodString>;
        rated: z.ZodOptional<z.ZodBoolean>;
        ratedRange: z.ZodOptional<z.ZodString>;
        penalty: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export declare const UpdateContestSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    phase: z.ZodOptional<z.ZodOptional<z.ZodEnum<typeof ContestPhase>>>;
    type: z.ZodOptional<z.ZodOptional<z.ZodEnum<typeof ContestType>>>;
    startTime: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    endTime: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    durationMinutes: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    websiteUrl: z.ZodOptional<z.ZodOptional<z.ZodURL>>;
    registrationUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    preparedBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    difficulty: z.ZodOptional<z.ZodOptional<z.ZodEnum<typeof DifficultyLevel>>>;
    participantCount: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    problemCount: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    country: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    city: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    platformMetadata: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        frozen: z.ZodOptional<z.ZodBoolean>;
        relativeTimeSeconds: z.ZodOptional<z.ZodNumber>;
        icpcRegion: z.ZodOptional<z.ZodString>;
        season: z.ZodOptional<z.ZodString>;
        titleSlug: z.ZodOptional<z.ZodString>;
        premiumOnly: z.ZodOptional<z.ZodBoolean>;
        division: z.ZodOptional<z.ZodString>;
        rated: z.ZodOptional<z.ZodBoolean>;
        ratedRange: z.ZodOptional<z.ZodString>;
        penalty: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>;
    isActive: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    isNotified: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const ContestQuerySchema: z.ZodObject<{
    platform: z.ZodOptional<z.ZodEnum<typeof ContestPlatform>>;
    phase: z.ZodOptional<z.ZodEnum<typeof ContestPhase>>;
    type: z.ZodOptional<z.ZodEnum<typeof ContestType>>;
    difficulty: z.ZodOptional<z.ZodEnum<typeof DifficultyLevel>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    isNotified: z.ZodOptional<z.ZodBoolean>;
    search: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    endDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    country: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    offset: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    sortBy: z.ZodDefault<z.ZodEnum<{
        name: "name";
        startTime: "startTime";
        endTime: "endTime";
        participantCount: "participantCount";
    }>>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export declare const ContestStatsSchema: z.ZodObject<{
    totalContests: z.ZodNumber;
    upcomingContests: z.ZodNumber;
    runningContests: z.ZodNumber;
    finishedContests: z.ZodNumber;
    platformBreakdown: z.ZodRecord<z.ZodString, z.ZodNumber>;
    typeBreakdown: z.ZodRecord<z.ZodString, z.ZodNumber>;
    difficultyBreakdown: z.ZodRecord<z.ZodString, z.ZodNumber>;
}, z.core.$strip>;
export declare const PlatformStatsSchema: z.ZodObject<{
    platform: z.ZodEnum<typeof ContestPlatform>;
    totalContests: z.ZodNumber;
    upcomingContests: z.ZodNumber;
    runningContests: z.ZodNumber;
    finishedContests: z.ZodNumber;
    averageDuration: z.ZodNumber;
    averageParticipants: z.ZodNumber;
    lastSyncTime: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
export declare const BulkCreateContestSchema: z.ZodObject<{
    contests: z.ZodArray<z.ZodObject<{
        platformId: z.ZodString;
        name: z.ZodString;
        platform: z.ZodEnum<typeof ContestPlatform>;
        phase: z.ZodEnum<typeof ContestPhase>;
        type: z.ZodEnum<typeof ContestType>;
        startTime: z.ZodCoercedDate<unknown>;
        endTime: z.ZodCoercedDate<unknown>;
        durationMinutes: z.ZodNumber;
        description: z.ZodOptional<z.ZodString>;
        websiteUrl: z.ZodOptional<z.ZodURL>;
        registrationUrl: z.ZodOptional<z.ZodURL>;
        preparedBy: z.ZodOptional<z.ZodString>;
        difficulty: z.ZodOptional<z.ZodEnum<typeof DifficultyLevel>>;
        participantCount: z.ZodOptional<z.ZodNumber>;
        problemCount: z.ZodOptional<z.ZodNumber>;
        country: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        platformMetadata: z.ZodOptional<z.ZodObject<{
            frozen: z.ZodOptional<z.ZodBoolean>;
            relativeTimeSeconds: z.ZodOptional<z.ZodNumber>;
            icpcRegion: z.ZodOptional<z.ZodString>;
            season: z.ZodOptional<z.ZodString>;
            titleSlug: z.ZodOptional<z.ZodString>;
            premiumOnly: z.ZodOptional<z.ZodBoolean>;
            division: z.ZodOptional<z.ZodString>;
            rated: z.ZodOptional<z.ZodBoolean>;
            ratedRange: z.ZodOptional<z.ZodString>;
            penalty: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        isActive: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const SyncRequestSchema: z.ZodDefault<z.ZodOptional<z.ZodObject<{
    forceSync: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>>>;
declare const CreateContestDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    platformId: z.ZodString;
    name: z.ZodString;
    platform: z.ZodEnum<typeof ContestPlatform>;
    phase: z.ZodEnum<typeof ContestPhase>;
    type: z.ZodEnum<typeof ContestType>;
    startTime: z.ZodCoercedDate<unknown>;
    endTime: z.ZodCoercedDate<unknown>;
    durationMinutes: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
    websiteUrl: z.ZodOptional<z.ZodURL>;
    registrationUrl: z.ZodOptional<z.ZodURL>;
    preparedBy: z.ZodOptional<z.ZodString>;
    difficulty: z.ZodOptional<z.ZodEnum<typeof DifficultyLevel>>;
    participantCount: z.ZodOptional<z.ZodNumber>;
    problemCount: z.ZodOptional<z.ZodNumber>;
    country: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    platformMetadata: z.ZodOptional<z.ZodObject<{
        frozen: z.ZodOptional<z.ZodBoolean>;
        relativeTimeSeconds: z.ZodOptional<z.ZodNumber>;
        icpcRegion: z.ZodOptional<z.ZodString>;
        season: z.ZodOptional<z.ZodString>;
        titleSlug: z.ZodOptional<z.ZodString>;
        premiumOnly: z.ZodOptional<z.ZodBoolean>;
        division: z.ZodOptional<z.ZodString>;
        rated: z.ZodOptional<z.ZodBoolean>;
        ratedRange: z.ZodOptional<z.ZodString>;
        penalty: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class CreateContestDto extends CreateContestDto_base {
}
declare const UpdateContestDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    phase: z.ZodOptional<z.ZodOptional<z.ZodEnum<typeof ContestPhase>>>;
    type: z.ZodOptional<z.ZodOptional<z.ZodEnum<typeof ContestType>>>;
    startTime: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    endTime: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    durationMinutes: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    websiteUrl: z.ZodOptional<z.ZodOptional<z.ZodURL>>;
    registrationUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    preparedBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    difficulty: z.ZodOptional<z.ZodOptional<z.ZodEnum<typeof DifficultyLevel>>>;
    participantCount: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    problemCount: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    country: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    city: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    platformMetadata: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        frozen: z.ZodOptional<z.ZodBoolean>;
        relativeTimeSeconds: z.ZodOptional<z.ZodNumber>;
        icpcRegion: z.ZodOptional<z.ZodString>;
        season: z.ZodOptional<z.ZodString>;
        titleSlug: z.ZodOptional<z.ZodString>;
        premiumOnly: z.ZodOptional<z.ZodBoolean>;
        division: z.ZodOptional<z.ZodString>;
        rated: z.ZodOptional<z.ZodBoolean>;
        ratedRange: z.ZodOptional<z.ZodString>;
        penalty: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>;
    isActive: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    isNotified: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class UpdateContestDto extends UpdateContestDto_base {
}
declare const ContestQueryDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    platform: z.ZodOptional<z.ZodEnum<typeof ContestPlatform>>;
    phase: z.ZodOptional<z.ZodEnum<typeof ContestPhase>>;
    type: z.ZodOptional<z.ZodEnum<typeof ContestType>>;
    difficulty: z.ZodOptional<z.ZodEnum<typeof DifficultyLevel>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    isNotified: z.ZodOptional<z.ZodBoolean>;
    search: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    endDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    country: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    offset: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    sortBy: z.ZodDefault<z.ZodEnum<{
        name: "name";
        startTime: "startTime";
        endTime: "endTime";
        participantCount: "participantCount";
    }>>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class ContestQueryDto extends ContestQueryDto_base {
}
declare const ContestStatsDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    totalContests: z.ZodNumber;
    upcomingContests: z.ZodNumber;
    runningContests: z.ZodNumber;
    finishedContests: z.ZodNumber;
    platformBreakdown: z.ZodRecord<z.ZodString, z.ZodNumber>;
    typeBreakdown: z.ZodRecord<z.ZodString, z.ZodNumber>;
    difficultyBreakdown: z.ZodRecord<z.ZodString, z.ZodNumber>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class ContestStatsDto extends ContestStatsDto_base {
}
declare const PlatformStatsDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    platform: z.ZodEnum<typeof ContestPlatform>;
    totalContests: z.ZodNumber;
    upcomingContests: z.ZodNumber;
    runningContests: z.ZodNumber;
    finishedContests: z.ZodNumber;
    averageDuration: z.ZodNumber;
    averageParticipants: z.ZodNumber;
    lastSyncTime: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class PlatformStatsDto extends PlatformStatsDto_base {
}
declare const BulkCreateContestDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    contests: z.ZodArray<z.ZodObject<{
        platformId: z.ZodString;
        name: z.ZodString;
        platform: z.ZodEnum<typeof ContestPlatform>;
        phase: z.ZodEnum<typeof ContestPhase>;
        type: z.ZodEnum<typeof ContestType>;
        startTime: z.ZodCoercedDate<unknown>;
        endTime: z.ZodCoercedDate<unknown>;
        durationMinutes: z.ZodNumber;
        description: z.ZodOptional<z.ZodString>;
        websiteUrl: z.ZodOptional<z.ZodURL>;
        registrationUrl: z.ZodOptional<z.ZodURL>;
        preparedBy: z.ZodOptional<z.ZodString>;
        difficulty: z.ZodOptional<z.ZodEnum<typeof DifficultyLevel>>;
        participantCount: z.ZodOptional<z.ZodNumber>;
        problemCount: z.ZodOptional<z.ZodNumber>;
        country: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        platformMetadata: z.ZodOptional<z.ZodObject<{
            frozen: z.ZodOptional<z.ZodBoolean>;
            relativeTimeSeconds: z.ZodOptional<z.ZodNumber>;
            icpcRegion: z.ZodOptional<z.ZodString>;
            season: z.ZodOptional<z.ZodString>;
            titleSlug: z.ZodOptional<z.ZodString>;
            premiumOnly: z.ZodOptional<z.ZodBoolean>;
            division: z.ZodOptional<z.ZodString>;
            rated: z.ZodOptional<z.ZodBoolean>;
            ratedRange: z.ZodOptional<z.ZodString>;
            penalty: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        isActive: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class BulkCreateContestDto extends BulkCreateContestDto_base {
}
declare const SyncRequestDto_base: import("nestjs-zod").ZodDto<z.ZodDefault<z.ZodOptional<z.ZodObject<{
    forceSync: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>>>> & {
    io: "input";
};
export declare class SyncRequestDto extends SyncRequestDto_base {
}
export interface ContestResponseDto {
    id: string;
    platformId: string;
    name: string;
    platform: ContestPlatform;
    phase: ContestPhase;
    type: ContestType;
    startTime: Date;
    endTime: Date;
    durationMinutes: number;
    description?: string;
    websiteUrl?: string;
    registrationUrl?: string;
    preparedBy?: string;
    difficulty?: DifficultyLevel;
    participantCount?: number;
    problemCount?: number;
    country?: string;
    city?: string;
    platformMetadata: Record<string, any>;
    isActive: boolean;
    isNotified: boolean;
    lastSyncedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    isUpcoming?: boolean;
    isRunning?: boolean;
    isFinished?: boolean;
    timeUntilStart?: number;
    timeUntilEnd?: number;
}
export interface PaginatedContestResponseDto {
    data: ContestResponseDto[];
    pagination: {
        total: number;
        limit: number;
        offset: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}
export {};
