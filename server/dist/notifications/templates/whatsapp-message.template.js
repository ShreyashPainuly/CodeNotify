"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatWhatsAppMessage = formatWhatsAppMessage;
function formatWhatsAppMessage(payload) {
    return `
🚨 *Contest Alert*

*${payload.contestName}*

📱 Platform: ${payload.platform.toUpperCase()}
⏰ Starts in: *${payload.hoursUntilStart} hours*
📅 Start Time: ${payload.startTime.toLocaleString()}

Good luck! 🎯

Manage your preferences: https://codenotify.com/preferences
    `.trim();
}
//# sourceMappingURL=whatsapp-message.template.js.map