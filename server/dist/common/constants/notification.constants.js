"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WHATSAPP = exports.NOTIFICATIONS = exports.EMAIL = void 0;
exports.EMAIL = {
    get RESEND_API_KEY() {
        return process.env.RESEND_API_KEY || '';
    },
    get EMAIL_FROM() {
        return process.env.EMAIL_FROM || 'CodeNotify <noreply@yashkumarsingh.tech>';
    },
};
exports.NOTIFICATIONS = {
    ENABLED: process.env.NOTIFICATIONS_ENABLED === 'true' ||
        process.env.NOTIFICATIONS_ENABLED === undefined,
    WINDOW_HOURS: parseInt(process.env.NOTIFICATION_WINDOW_HOURS || '24', 10),
};
exports.WHATSAPP = {
    API_KEY: process.env.WHATSAPP_API_KEY || '',
    PHONE_ID: process.env.WHATSAPP_PHONE_ID || '',
    BUSINESS_ACCOUNT_ID: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || '',
};
//# sourceMappingURL=notification.constants.js.map