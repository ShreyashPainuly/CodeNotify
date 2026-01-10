"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIME_CONSTANTS = exports.CONTEST_LIMITS = exports.LEETCODE_HEADERS = exports.PLATFORM_METADATA = exports.PLATFORM_ADAPTERS_TOKEN = exports.PLATFORM_TIMEOUTS = exports.HTTP_CONFIG = exports.PLATFORM_ENV = exports.PLATFORM_URLS = exports.ENV = void 0;
exports.ENV = {
    PORT: process.env.PORT || '8000',
    NODE_ENV: process.env.NODE_ENV || 'dev',
};
exports.PLATFORM_URLS = {
    CODEFORCES: 'https://codeforces.com/api',
    LEETCODE: 'https://leetcode.com/graphql',
    CODECHEF: 'https://www.codechef.com/api/list/contests/all',
    ATCODER: 'https://atcoder.jp/contests/?lang=en',
    ATCODER_PROBLEMS: 'https://kenkoooo.com/atcoder/resources/contests.json',
};
exports.PLATFORM_ENV = {
    CODEFORCES_API: process.env.CODEFORCES_API || 'https://codeforces.com/api',
    LEETCODE_API: process.env.LEETCODE_API || 'https://leetcode.com/graphql',
};
exports.HTTP_CONFIG = {
    USER_AGENT: 'CodeNotify/1.0',
    DEFAULT_TIMEOUT: 15000,
    DEFAULT_RETRY_ATTEMPTS: 3,
    DEFAULT_RETRY_DELAY: 1000,
};
exports.PLATFORM_TIMEOUTS = {
    CODEFORCES: 10000,
    LEETCODE: 15000,
    CODECHEF: 15000,
    ATCODER: 15000,
};
exports.PLATFORM_ADAPTERS_TOKEN = 'PLATFORM_ADAPTERS';
exports.PLATFORM_METADATA = {
    CODEFORCES_API_BASE: 'https://codeforces.com/api',
    CODEFORCES_CONTEST_ENDPOINT: '/contest.list',
    LEETCODE_GRAPHQL_ENDPOINT: 'https://leetcode.com/graphql',
    CODECHEF_CONTEST_URL_BASE: 'https://www.codechef.com/',
    ATCODER_CONTEST_URL_BASE: 'https://atcoder.jp/contests/',
    LEETCODE_CONTEST_URL_BASE: 'https://leetcode.com/contest/',
};
exports.LEETCODE_HEADERS = {
    CONTENT_TYPE: 'application/json',
    ORIGIN: 'https://leetcode.com',
    REFERER: 'https://leetcode.com',
};
exports.CONTEST_LIMITS = {
    CODECHEF_PAST_CONTESTS: 20,
    ATCODER_DAYS_FILTER: 30,
};
exports.TIME_CONSTANTS = {
    SECONDS_TO_MS: 1000,
    MINUTES_TO_SECONDS: 60,
    HOURS_TO_SECONDS: 3600,
    DAYS_TO_SECONDS: 86400,
};
//# sourceMappingURL=http.constants.js.map