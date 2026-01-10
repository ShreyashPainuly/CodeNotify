import { Model } from 'mongoose';
import { ContestDocument, ContestPlatform, DifficultyLevel, ContestType } from './schemas/contest.schema';
import { CreateContestDto, UpdateContestDto, ContestQueryDto, ContestStatsDto, PlatformStatsDto, BulkCreateContestDto, ContestResponseDto, PaginatedContestResponseDto } from './dto/contest.dto';
import { PlatformAdapter } from '../integrations/platforms/base/platform.interface';
export declare class ContestsService {
    private contestModel;
    private readonly logger;
    private platformAdapters;
    constructor(contestModel: Model<ContestDocument>, adapters: PlatformAdapter[]);
    private getErrorMessage;
    private getErrorStack;
    create(createContestDto: CreateContestDto): Promise<ContestResponseDto>;
    bulkCreate(bulkCreateDto: BulkCreateContestDto): Promise<ContestResponseDto[]>;
    findAll(query: ContestQueryDto): Promise<PaginatedContestResponseDto>;
    findById(id: string): Promise<ContestResponseDto>;
    findByPlatformId(platformId: string, platform: ContestPlatform): Promise<ContestResponseDto | null>;
    update(id: string, updateContestDto: UpdateContestDto): Promise<ContestResponseDto>;
    delete(id: string): Promise<void>;
    findByPlatform(platform: ContestPlatform, query?: Partial<ContestQueryDto>): Promise<ContestResponseDto[]>;
    findUpcoming(platform?: ContestPlatform): Promise<ContestResponseDto[]>;
    findRunning(platform?: ContestPlatform): Promise<ContestResponseDto[]>;
    findFinished(platform?: ContestPlatform): Promise<ContestResponseDto[]>;
    searchContests(searchQuery: string): Promise<ContestResponseDto[]>;
    filterByDifficulty(difficulty: DifficultyLevel): Promise<ContestResponseDto[]>;
    filterByType(type: ContestType): Promise<ContestResponseDto[]>;
    getContestStats(): Promise<ContestStatsDto>;
    getPlatformStats(platform: ContestPlatform): Promise<PlatformStatsDto>;
    private buildFilterQuery;
    private buildSortOptions;
    private transformToResponseDto;
    private transformBreakdown;
    syncPlatform(platform: ContestPlatform): Promise<{
        synced: number;
        updated: number;
        failed: number;
    }>;
    syncAllPlatforms(): Promise<Record<string, {
        synced: number;
        updated: number;
        failed: number;
    }>>;
    private upsertContests;
}
