import { BasePlatformAdapter } from '../base/platform-adapter.abstract';
import { ContestData } from '../base/platform.interface';
import { ContestPlatform } from '../../../contests/schemas/contest.schema';
export declare class AtCoderAdapter extends BasePlatformAdapter {
    readonly platformName = ContestPlatform.ATCODER;
    private readonly apiEndpoint;
    constructor();
    fetchContests(): Promise<ContestData[]>;
    fetchUpcomingContests(): Promise<ContestData[]>;
    fetchRunningContests(): Promise<ContestData[]>;
    transformToInternalFormat(acContest: any): ContestData;
}
