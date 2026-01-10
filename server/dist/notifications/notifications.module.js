"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const notifications_service_1 = require("./notifications.service");
const notifications_controller_1 = require("./notifications.controller");
const email_notification_service_1 = require("./services/email-notification.service");
const whatsapp_notification_service_1 = require("./services/whatsapp-notification.service");
const push_notification_service_1 = require("./services/push-notification.service");
const admin_email_service_1 = require("./services/admin-email.service");
const user_schema_1 = require("../users/schemas/user.schema");
const contest_schema_1 = require("../contests/schemas/contest.schema");
const notification_schema_1 = require("./schemas/notification.schema");
let NotificationsModule = class NotificationsModule {
};
exports.NotificationsModule = NotificationsModule;
exports.NotificationsModule = NotificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: contest_schema_1.Contest.name, schema: contest_schema_1.ContestSchema },
                { name: notification_schema_1.Notification.name, schema: notification_schema_1.NotificationSchema },
            ]),
        ],
        providers: [
            notifications_service_1.NotificationsService,
            email_notification_service_1.EmailNotificationService,
            whatsapp_notification_service_1.WhatsAppNotificationService,
            push_notification_service_1.PushNotificationService,
            admin_email_service_1.AdminEmailService,
        ],
        controllers: [notifications_controller_1.NotificationsController],
        exports: [notifications_service_1.NotificationsService, email_notification_service_1.EmailNotificationService],
    })
], NotificationsModule);
//# sourceMappingURL=notifications.module.js.map