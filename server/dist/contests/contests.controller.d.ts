import { ContestsService } from './contests.service';
import { ContestPlatform, DifficultyLevel, ContestType } from './schemas/contest.schema';
import { CreateContestDto, UpdateContestDto, ContestQueryDto, BulkCreateContestDto, SyncRequestDto, type ContestResponseDto, type PaginatedContestResponseDto, type ContestStatsDto, type PlatformStatsDto } from './dto/contest.dto';
export declare class ContestsController {
    private readonly contestsService;
    private readonly logger;
    constructor(contestsService: ContestsService);
    healthCheck(): {
        status: string;
        timestamp: string;
    };
    getContestStats(): Promise<ContestStatsDto>;
    getPlatformStats(platform: ContestPlatform): Promise<PlatformStatsDto>;
    getUpcomingContests(platform?: ContestPlatform): Promise<ContestResponseDto[]>;
    getRunningContests(platform?: ContestPlatform): Promise<ContestResponseDto[]>;
    getFinishedContests(platform?: ContestPlatform): Promise<ContestResponseDto[]>;
    searchContests(query: string): Promise<ContestResponseDto[]>;
    filterByDifficulty(level: DifficultyLevel): Promise<ContestResponseDto[]>;
    filterByType(type: ContestType): Promise<ContestResponseDto[]>;
    findByPlatform(platform: ContestPlatform, query: ContestQueryDto): Promise<ContestResponseDto[]>;
    syncAllPlatforms(): Promise<{
        message: string;
        results: Record<string, {
            synced: number;
            updated: number;
            failed: number;
        }>;
    }>;
    syncPlatform(platform: ContestPlatform, syncRequest: SyncRequestDto): Promise<{
        message: string;
        platform: ContestPlatform;
        synced: number;
        updated: number;
        failed: number;
    }>;
    bulkCreate(bulkCreateDto: BulkCreateContestDto): Promise<ContestResponseDto[]>;
    create(createContestDto: CreateContestDto): Promise<ContestResponseDto>;
    findAll(query: ContestQueryDto): Promise<PaginatedContestResponseDto>;
    findById(id: string): Promise<ContestResponseDto>;
    update(id: string, updateContestDto: UpdateContestDto): Promise<ContestResponseDto>;
    delete(id: string): Promise<void>;
}
