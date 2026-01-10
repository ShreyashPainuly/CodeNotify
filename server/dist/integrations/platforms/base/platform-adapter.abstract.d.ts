import { Logger } from '@nestjs/common';
import { PlatformAdapter, PlatformConfig, ContestData } from './platform.interface';
import { ContestPlatform } from '../../../contests/schemas/contest.schema';
export declare abstract class BasePlatformAdapter implements PlatformAdapter {
    readonly config: PlatformConfig;
    protected readonly logger: Logger;
    constructor(config: PlatformConfig);
    abstract readonly platformName: ContestPlatform;
    abstract fetchContests(): Promise<ContestData[]>;
    abstract fetchUpcomingContests(): Promise<ContestData[]>;
    abstract fetchRunningContests(): Promise<ContestData[]>;
    abstract transformToInternalFormat(data: any): ContestData;
    protected makeRequest<T>(url: string, options?: RequestInit): Promise<T>;
    healthCheck(): Promise<boolean>;
    protected sleep(ms: number): Promise<void>;
    protected getErrorMessage(error: unknown): string;
    protected unixToDate(timestamp: number): Date;
    protected calculateDuration(startTime: Date, endTime: Date): number;
    protected filterUpcoming(contests: ContestData[]): ContestData[];
    protected filterRunning(contests: ContestData[]): ContestData[];
}
