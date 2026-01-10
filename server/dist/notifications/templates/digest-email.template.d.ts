export declare function formatDigestEmail(contests: Array<{
    name: string;
    platform: string;
    startTime: Date;
    hoursUntilStart: number;
    websiteUrl?: string;
}>, frequency: 'daily' | 'weekly'): string;
