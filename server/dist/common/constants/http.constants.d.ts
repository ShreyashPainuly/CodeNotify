export declare const ENV: {
    readonly PORT: string;
    readonly NODE_ENV: string;
};
export declare const PLATFORM_URLS: {
    readonly CODEFORCES: "https://codeforces.com/api";
    readonly LEETCODE: "https://leetcode.com/graphql";
    readonly CODECHEF: "https://www.codechef.com/api/list/contests/all";
    readonly ATCODER: "https://atcoder.jp/contests/?lang=en";
    readonly ATCODER_PROBLEMS: "https://kenkoooo.com/atcoder/resources/contests.json";
};
export declare const PLATFORM_ENV: {
    readonly CODEFORCES_API: string;
    readonly LEETCODE_API: string;
};
export declare const HTTP_CONFIG: {
    readonly USER_AGENT: "CodeNotify/1.0";
    readonly DEFAULT_TIMEOUT: 15000;
    readonly DEFAULT_RETRY_ATTEMPTS: 3;
    readonly DEFAULT_RETRY_DELAY: 1000;
};
export declare const PLATFORM_TIMEOUTS: {
    readonly CODEFORCES: 10000;
    readonly LEETCODE: 15000;
    readonly CODECHEF: 15000;
    readonly ATCODER: 15000;
};
export declare const PLATFORM_ADAPTERS_TOKEN = "PLATFORM_ADAPTERS";
export declare const PLATFORM_METADATA: {
    readonly CODEFORCES_API_BASE: "https://codeforces.com/api";
    readonly CODEFORCES_CONTEST_ENDPOINT: "/contest.list";
    readonly LEETCODE_GRAPHQL_ENDPOINT: "https://leetcode.com/graphql";
    readonly CODECHEF_CONTEST_URL_BASE: "https://www.codechef.com/";
    readonly ATCODER_CONTEST_URL_BASE: "https://atcoder.jp/contests/";
    readonly LEETCODE_CONTEST_URL_BASE: "https://leetcode.com/contest/";
};
export declare const LEETCODE_HEADERS: {
    readonly CONTENT_TYPE: "application/json";
    readonly ORIGIN: "https://leetcode.com";
    readonly REFERER: "https://leetcode.com";
};
export declare const CONTEST_LIMITS: {
    readonly CODECHEF_PAST_CONTESTS: 20;
    readonly ATCODER_DAYS_FILTER: 30;
};
export declare const TIME_CONSTANTS: {
    readonly SECONDS_TO_MS: 1000;
    readonly MINUTES_TO_SECONDS: 60;
    readonly HOURS_TO_SECONDS: 3600;
    readonly DAYS_TO_SECONDS: 86400;
};
