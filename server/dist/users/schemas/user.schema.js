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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let User = class User {
    email;
    password;
    name;
    phoneNumber;
    role;
    preferences;
    isActive;
    isEmailVerified;
    refreshToken;
    lastLogin;
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['user', 'admin'], default: 'user' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            platforms: [
                {
                    type: String,
                    enum: ['codeforces', 'leetcode', 'codechef', 'atcoder'],
                },
            ],
            alertFrequency: {
                type: String,
                enum: ['immediate', 'daily', 'weekly'],
                default: 'immediate',
            },
            contestTypes: [String],
            notificationChannels: {
                type: {
                    whatsapp: { type: Boolean, default: true },
                    email: { type: Boolean, default: true },
                    push: { type: Boolean, default: false },
                },
                default: {
                    whatsapp: true,
                    email: true,
                    push: false,
                },
            },
            notifyBefore: { type: Number, default: 24 },
        },
        default: {
            platforms: ['codeforces', 'leetcode'],
            alertFrequency: 'immediate',
            contestTypes: [],
            notificationChannels: {
                whatsapp: true,
                email: true,
                push: false,
            },
            notifyBefore: 24,
        },
    }),
    __metadata("design:type", Object)
], User.prototype, "preferences", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailVerified", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], User.prototype, "lastLogin", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
exports.UserSchema.set('toJSON', {
    virtuals: true,
});
exports.UserSchema.set('toObject', {
    virtuals: true,
});
//# sourceMappingURL=user.schema.js.map