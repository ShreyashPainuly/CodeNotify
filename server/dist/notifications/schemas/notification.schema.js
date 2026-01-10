"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSchema = exports.Notification = exports.NotificationType = exports.NotificationChannel = exports.NotificationStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["PENDING"] = "PENDING";
    NotificationStatus["SENT"] = "SENT";
    NotificationStatus["FAILED"] = "FAILED";
    NotificationStatus["RETRYING"] = "RETRYING";
})(NotificationStatus || (exports.NotificationStatus = NotificationStatus = {}));
var NotificationChannel;
(function (NotificationChannel) {
    NotificationChannel["EMAIL"] = "email";
    NotificationChannel["WHATSAPP"] = "whatsapp";
    NotificationChannel["PUSH"] = "push";
})(NotificationChannel || (exports.NotificationChannel = NotificationChannel = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["CONTEST_REMINDER"] = "CONTEST_REMINDER";
    NotificationType["CONTEST_STARTING"] = "CONTEST_STARTING";
    NotificationType["CONTEST_ENDING"] = "CONTEST_ENDING";
    NotificationType["DAILY_DIGEST"] = "DAILY_DIGEST";
    NotificationType["WEEKLY_DIGEST"] = "WEEKLY_DIGEST";
    NotificationType["SYSTEM_ALERT"] = "SYSTEM_ALERT";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
let Notification = class Notification {
    userId;
    contestId;
    type;
    title;
    message;
    payload;
    channels;
    deliveryStatus;
    status;
    scheduledAt;
    sentAt;
    failedAt;
    retryCount;
    maxRetries;
    lastRetryAt;
    nextRetryAt;
    error;
    errorHistory;
    isRead;
    readAt;
    isActive;
    expiresAt;
    get isDelivered() {
        return this.status === NotificationStatus.SENT;
    }
    get isFailed() {
        return this.status === NotificationStatus.FAILED;
    }
    get isPending() {
        return this.status === NotificationStatus.PENDING;
    }
    get canRetry() {
        return (this.retryCount < this.maxRetries &&
            (this.status === NotificationStatus.FAILED ||
                this.status === NotificationStatus.RETRYING));
    }
    get successfulChannels() {
        return this.deliveryStatus
            .filter((d) => d.status === NotificationStatus.SENT)
            .map((d) => d.channel);
    }
    get failedChannels() {
        return this.deliveryStatus
            .filter((d) => d.status === NotificationStatus.FAILED)
            .map((d) => d.channel);
    }
};
exports.Notification = Notification;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
    }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], Notification.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Contest', index: true }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], Notification.prototype, "contestId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: NotificationType, index: true }),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Notification.prototype, "payload", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], enum: NotificationChannel, required: true }),
    __metadata("design:type", Array)
], Notification.prototype, "channels", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, default: [] }),
    __metadata("design:type", Array)
], Notification.prototype, "deliveryStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: NotificationStatus,
        default: NotificationStatus.PENDING,
        index: true,
    }),
    __metadata("design:type", String)
], Notification.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", Date)
], Notification.prototype, "scheduledAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", Date)
], Notification.prototype, "sentAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Notification.prototype, "failedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Notification.prototype, "retryCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 3 }),
    __metadata("design:type", Number)
], Notification.prototype, "maxRetries", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Notification.prototype, "lastRetryAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Notification.prototype, "nextRetryAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Notification.prototype, "error", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, default: [] }),
    __metadata("design:type", Array)
], Notification.prototype, "errorHistory", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isRead", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Notification.prototype, "readAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true, index: true }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Notification.prototype, "expiresAt", void 0);
exports.Notification = Notification = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Notification);
exports.NotificationSchema = mongoose_1.SchemaFactory.createForClass(Notification);
exports.NotificationSchema.index({ userId: 1, createdAt: -1 });
exports.NotificationSchema.index({ userId: 1, status: 1 });
exports.NotificationSchema.index({ userId: 1, contestId: 1 }, { unique: true, sparse: true });
exports.NotificationSchema.index({ contestId: 1, createdAt: -1 });
exports.NotificationSchema.index({ status: 1, scheduledAt: 1 });
exports.NotificationSchema.index({ status: 1, nextRetryAt: 1 });
exports.NotificationSchema.index({ type: 1, createdAt: -1 });
exports.NotificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
exports.NotificationSchema.virtual('isDelivered').get(function () {
    return this.status === NotificationStatus.SENT;
});
exports.NotificationSchema.virtual('isFailed').get(function () {
    return this.status === NotificationStatus.FAILED;
});
exports.NotificationSchema.virtual('isPending').get(function () {
    return this.status === NotificationStatus.PENDING;
});
exports.NotificationSchema.virtual('canRetry').get(function () {
    return (this.retryCount < this.maxRetries &&
        (this.status === NotificationStatus.FAILED ||
            this.status === NotificationStatus.RETRYING));
});
exports.NotificationSchema.virtual('successfulChannels').get(function () {
    return this.deliveryStatus
        .filter((d) => d.status === NotificationStatus.SENT)
        .map((d) => d.channel);
});
exports.NotificationSchema.virtual('failedChannels').get(function () {
    return this.deliveryStatus
        .filter((d) => d.status === NotificationStatus.FAILED)
        .map((d) => d.channel);
});
exports.NotificationSchema.set('toJSON', { virtuals: true });
exports.NotificationSchema.set('toObject', { virtuals: true });
exports.NotificationSchema.pre('save', function (next) {
    if (!this.expiresAt) {
        const ninetyDaysFromNow = new Date();
        ninetyDaysFromNow.setDate(ninetyDaysFromNow.getDate() + 90);
        this.expiresAt = ninetyDaysFromNow;
    }
    next();
});
//# sourceMappingURL=notification.schema.js.map