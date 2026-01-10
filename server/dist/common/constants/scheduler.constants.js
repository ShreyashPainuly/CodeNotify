"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEDULER = void 0;
exports.SCHEDULER = {
    CONTEST_SYNC_ENABLED: process.env.CONTEST_SYNC_ENABLED === 'true' ||
        process.env.CONTEST_SYNC_ENABLED === undefined,
    CONTEST_SYNC_INTERVAL: process.env.CONTEST_SYNC_INTERVAL || '0 */6 * * *',
    CONTEST_CLEANUP_ENABLED: process.env.CONTEST_CLEANUP_ENABLED === 'true' ||
        process.env.CONTEST_CLEANUP_ENABLED === undefined,
    CONTEST_CLEANUP_DAYS: parseInt(process.env.CONTEST_CLEANUP_DAYS || '90', 10),
};
//# sourceMappingURL=scheduler.constants.js.map