export interface EmailResult {
    email: string;
    success: boolean;
    messageId?: string;
    error?: string;
}
export interface UserEmailResult {
    userId: string;
    email: string;
    username: string;
    success: boolean;
    messageId?: string;
    error?: string;
}
export interface CustomEmailResponse {
    total: number;
    successful: number;
    failed: number;
    results: EmailResult[];
}
export interface BulkEmailResponse {
    total: number;
    successful: number;
    failed: number;
    results: UserEmailResult[];
}
export interface AnnouncementResponse {
    total: number;
    successful: number;
    failed: number;
    filters?: {
        platforms?: string[];
        isActive?: boolean;
    };
    results: UserEmailResult[];
}
export interface ContestReminderResponse {
    contest: {
        id: string;
        name: string;
        platform: string;
        startTime: Date;
    };
    total: number;
    successful: number;
    failed: number;
    results: UserEmailResult[];
}
export interface UserFilters {
    'preferences.platforms'?: {
        $in: string[];
    };
    isActive?: boolean;
}
