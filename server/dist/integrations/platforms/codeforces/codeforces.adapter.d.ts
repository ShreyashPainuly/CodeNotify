import { ConfigService } from '@nestjs/config';
import { BasePlatformAdapter } from '../base/platform-adapter.abstract';
import { ContestData } from '../base/platform.interface';
import { ContestPlatform } from '../../../contests/schemas/contest.schema';
interface CodeforcesContest {
    id: number;
    name: string;
    type: string;
    phase: string;
    frozen: boolean;
    durationSeconds: number;
    startTimeSeconds?: number;
    relativeTimeSeconds?: number;
}
export declare class CodeforcesAdapter extends BasePlatformAdapter {
    private readonly configService;
    readonly platformName = ContestPlatform.CODEFORCES;
    private readonly apiBaseUrl;
    constructor(configService: ConfigService);
    fetchContests(): Promise<ContestData[]>;
    fetchUpcomingContests(): Promise<ContestData[]>;
    fetchRunningContests(): Promise<ContestData[]>;
    transformToInternalFormat(cfContest: CodeforcesContest): ContestData;
}
export {};
