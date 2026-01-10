import { BasePlatformAdapter } from '../base/platform-adapter.abstract';
import { ContestData } from '../base/platform.interface';
import { ContestPlatform } from '../../../contests/schemas/contest.schema';
export declare class CodeChefAdapter extends BasePlatformAdapter {
    readonly platformName = ContestPlatform.CODECHEF;
    private readonly apiEndpoint;
    constructor();
    fetchContests(): Promise<ContestData[]>;
    fetchUpcomingContests(): Promise<ContestData[]>;
    fetchRunningContests(): Promise<ContestData[]>;
    transformToInternalFormat(data: any): ContestData;
    private transformCodeChefContest;
}
