import { Document } from 'mongoose';
export type ContestDocument = Contest & Document;
export declare enum ContestPlatform {
    CODEFORCES = "codeforces",
    LEETCODE = "leetcode",
    CODECHEF = "codechef",
    ATCODER = "atcoder"
}
export declare enum ContestPhase {
    BEFORE = "BEFORE",
    CODING = "CODING",
    PENDING_SYSTEM_TEST = "PENDING_SYSTEM_TEST",
    SYSTEM_TEST = "SYSTEM_TEST",
    FINISHED = "FINISHED",
    UPCOMING = "UPCOMING",
    RUNNING = "RUNNING",
    ENDED = "ENDED",
    NOT_STARTED = "NOT_STARTED",
    STARTED = "STARTED",
    COMPLETED = "COMPLETED"
}
export declare enum ContestType {
    CF = "CF",
    IOI = "IOI",
    ICPC = "ICPC",
    WEEKLY = "WEEKLY",
    BIWEEKLY = "BIWEEKLY",
    LONG = "LONG",
    COOK_OFF = "COOK_OFF",
    LUNCH_TIME = "LUNCH_TIME",
    STARTERS = "STARTERS",
    ABC = "ABC",
    ARC = "ARC",
    AGC = "AGC",
    AHC = "AHC"
}
export declare enum DifficultyLevel {
    BEGINNER = "BEGINNER",
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD",
    EXPERT = "EXPERT"
}
interface PlatformMetadata {
    frozen?: boolean;
    relativeTimeSeconds?: number;
    icpcRegion?: string;
    season?: string;
    titleSlug?: string;
    premiumOnly?: boolean;
    division?: string;
    rated?: boolean;
    ratedRange?: string;
    penalty?: number;
}
export declare class Contest {
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
    platformMetadata: PlatformMetadata;
    isActive: boolean;
    isNotified: boolean;
    lastSyncedAt?: Date;
    get isUpcoming(): boolean;
    get isRunning(): boolean;
    get isFinished(): boolean;
    get timeUntilStart(): number;
    get timeUntilEnd(): number;
}
export declare const ContestSchema: import("mongoose").Schema<Contest, import("mongoose").Model<Contest, any, any, any, Document<unknown, any, Contest, any, {}> & Contest & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Contest, Document<unknown, {}, import("mongoose").FlatRecord<Contest>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Contest> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export {};
