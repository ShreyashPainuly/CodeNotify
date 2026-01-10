import { ContestPlatform, ContestPhase, ContestType, DifficultyLevel } from '../../../contests/schemas/contest.schema';
export interface ContestData {
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
    platformMetadata?: Record<string, any>;
    isActive?: boolean;
    lastSyncedAt?: Date;
}
export interface PlatformAdapter {
    readonly platformName: ContestPlatform;
    fetchContests(): Promise<ContestData[]>;
    fetchUpcomingContests(): Promise<ContestData[]>;
    fetchRunningContests(): Promise<ContestData[]>;
    transformToInternalFormat(data: any): ContestData;
    healthCheck(): Promise<boolean>;
}
export interface PlatformConfig {
    enabled: boolean;
    apiUrl: string;
    timeout: number;
    rateLimit?: {
        maxRequests: number;
        windowMs: number;
    };
    retryAttempts?: number;
    retryDelay?: number;
}
export interface PlatformSyncResult {
    platform: ContestPlatform;
    synced: number;
    updated: number;
    failed: number;
    timestamp: Date;
    errors?: string[];
}
