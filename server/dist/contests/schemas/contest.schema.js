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
exports.ContestSchema = exports.Contest = exports.DifficultyLevel = exports.ContestType = exports.ContestPhase = exports.ContestPlatform = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var ContestPlatform;
(function (ContestPlatform) {
    ContestPlatform["CODEFORCES"] = "codeforces";
    ContestPlatform["LEETCODE"] = "leetcode";
    ContestPlatform["CODECHEF"] = "codechef";
    ContestPlatform["ATCODER"] = "atcoder";
})(ContestPlatform || (exports.ContestPlatform = ContestPlatform = {}));
var ContestPhase;
(function (ContestPhase) {
    ContestPhase["BEFORE"] = "BEFORE";
    ContestPhase["CODING"] = "CODING";
    ContestPhase["PENDING_SYSTEM_TEST"] = "PENDING_SYSTEM_TEST";
    ContestPhase["SYSTEM_TEST"] = "SYSTEM_TEST";
    ContestPhase["FINISHED"] = "FINISHED";
    ContestPhase["UPCOMING"] = "UPCOMING";
    ContestPhase["RUNNING"] = "RUNNING";
    ContestPhase["ENDED"] = "ENDED";
    ContestPhase["NOT_STARTED"] = "NOT_STARTED";
    ContestPhase["STARTED"] = "STARTED";
    ContestPhase["COMPLETED"] = "COMPLETED";
})(ContestPhase || (exports.ContestPhase = ContestPhase = {}));
var ContestType;
(function (ContestType) {
    ContestType["CF"] = "CF";
    ContestType["IOI"] = "IOI";
    ContestType["ICPC"] = "ICPC";
    ContestType["WEEKLY"] = "WEEKLY";
    ContestType["BIWEEKLY"] = "BIWEEKLY";
    ContestType["LONG"] = "LONG";
    ContestType["COOK_OFF"] = "COOK_OFF";
    ContestType["LUNCH_TIME"] = "LUNCH_TIME";
    ContestType["STARTERS"] = "STARTERS";
    ContestType["ABC"] = "ABC";
    ContestType["ARC"] = "ARC";
    ContestType["AGC"] = "AGC";
    ContestType["AHC"] = "AHC";
})(ContestType || (exports.ContestType = ContestType = {}));
var DifficultyLevel;
(function (DifficultyLevel) {
    DifficultyLevel["BEGINNER"] = "BEGINNER";
    DifficultyLevel["EASY"] = "EASY";
    DifficultyLevel["MEDIUM"] = "MEDIUM";
    DifficultyLevel["HARD"] = "HARD";
    DifficultyLevel["EXPERT"] = "EXPERT";
})(DifficultyLevel || (exports.DifficultyLevel = DifficultyLevel = {}));
let Contest = class Contest {
    platformId;
    name;
    platform;
    phase;
    type;
    startTime;
    endTime;
    durationMinutes;
    description;
    websiteUrl;
    registrationUrl;
    preparedBy;
    difficulty;
    participantCount;
    problemCount;
    country;
    city;
    platformMetadata;
    isActive;
    isNotified;
    lastSyncedAt;
    get isUpcoming() {
        return this.startTime > new Date();
    }
    get isRunning() {
        const now = new Date();
        return this.startTime <= now && this.endTime >= now;
    }
    get isFinished() {
        return this.endTime < new Date();
    }
    get timeUntilStart() {
        return Math.max(0, this.startTime.getTime() - Date.now());
    }
    get timeUntilEnd() {
        return Math.max(0, this.endTime.getTime() - Date.now());
    }
};
exports.Contest = Contest;
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], Contest.prototype, "platformId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], Contest.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ContestPlatform, index: true }),
    __metadata("design:type", String)
], Contest.prototype, "platform", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ContestPhase, index: true }),
    __metadata("design:type", String)
], Contest.prototype, "phase", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ContestType }),
    __metadata("design:type", String)
], Contest.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", Date)
], Contest.prototype, "startTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Contest.prototype, "endTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Contest.prototype, "durationMinutes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Contest.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Contest.prototype, "websiteUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Contest.prototype, "registrationUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Contest.prototype, "preparedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: DifficultyLevel }),
    __metadata("design:type", String)
], Contest.prototype, "difficulty", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Contest.prototype, "participantCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Contest.prototype, "problemCount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Contest.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Contest.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], Contest.prototype, "platformMetadata", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true, index: true }),
    __metadata("design:type", Boolean)
], Contest.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Contest.prototype, "isNotified", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Contest.prototype, "lastSyncedAt", void 0);
exports.Contest = Contest = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Contest);
exports.ContestSchema = mongoose_1.SchemaFactory.createForClass(Contest);
exports.ContestSchema.index({ platform: 1, startTime: 1 });
exports.ContestSchema.index({ platform: 1, phase: 1 });
exports.ContestSchema.index({ startTime: 1, isActive: 1 });
exports.ContestSchema.index({ phase: 1, isActive: 1 });
exports.ContestSchema.index({ platformId: 1, platform: 1 }, { unique: true });
exports.ContestSchema.index({ name: 'text', description: 'text' });
exports.ContestSchema.index({ isNotified: 1, startTime: 1 });
exports.ContestSchema.index({ lastSyncedAt: 1 });
exports.ContestSchema.virtual('isUpcoming').get(function () {
    if (!this.startTime)
        return false;
    return this.startTime > new Date();
});
exports.ContestSchema.virtual('isRunning').get(function () {
    if (!this.startTime || !this.endTime)
        return false;
    const now = new Date();
    return this.startTime <= now && this.endTime >= now;
});
exports.ContestSchema.virtual('isFinished').get(function () {
    if (!this.endTime)
        return false;
    return this.endTime < new Date();
});
exports.ContestSchema.virtual('timeUntilStart').get(function () {
    if (!this.startTime)
        return 0;
    return Math.max(0, this.startTime.getTime() - Date.now());
});
exports.ContestSchema.virtual('timeUntilEnd').get(function () {
    if (!this.endTime)
        return 0;
    return Math.max(0, this.endTime.getTime() - Date.now());
});
exports.ContestSchema.set('toJSON', { virtuals: true });
exports.ContestSchema.set('toObject', { virtuals: true });
//# sourceMappingURL=contest.schema.js.map