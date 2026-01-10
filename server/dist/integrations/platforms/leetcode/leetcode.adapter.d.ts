import { BasePlatformAdapter } from '../base/platform-adapter.abstract';
import { ContestData } from '../base/platform.interface';
import { ContestPlatform } from '../../../contests/schemas/contest.schema';
interface LeetCodeContest {
    title: string;
    titleSlug: string;
    startTime: number;
    duration: number;
    originStartTime: number;
    isVirtual: boolean;
    cardImg?: string;
    description?: string;
}
export declare class LeetCodeAdapter extends BasePlatformAdapter {
    readonly platformName = ContestPlatform.LEETCODE;
    private readonly graphqlEndpoint;
    constructor();
    fetchContests(): Promise<ContestData[]>;
    fetchUpcomingContests(): Promise<ContestData[]>;
    fetchRunningContests(): Promise<ContestData[]>;
    transformToInternalFormat(lcContest: LeetCodeContest): ContestData;
    private makeGraphQLRequest;
    healthCheck(): Promise<boolean>;
}
export {};
