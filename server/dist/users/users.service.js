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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
let UsersService = class UsersService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(createUserDto) {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
    async getUserById(id) {
        return this.userModel.findById(id).exec();
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async updateUser(id, updateUserDto) {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .exec();
        if (!updatedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        return updatedUser;
    }
    async updateRefreshToken(id, refreshToken) {
        await this.userModel
            .findByIdAndUpdate(id, { refreshToken: refreshToken })
            .exec();
    }
    async updateLastLogin(id) {
        await this.userModel
            .findByIdAndUpdate(id, { lastLogin: new Date() })
            .exec();
    }
    async updateEmailVerification(id, isVerified) {
        await this.userModel
            .findByIdAndUpdate(id, { isEmailVerified: isVerified })
            .exec();
    }
    async deactivateUser(id) {
        const user = await this.userModel
            .findByIdAndUpdate(id, { isActive: false }, { new: true })
            .exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async activateUser(id) {
        const user = await this.userModel
            .findByIdAndUpdate(id, { isActive: true }, { new: true })
            .exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async getAllUsers() {
        return this.userModel
            .find({ isActive: true })
            .select('-password -refreshToken')
            .exec();
    }
    async getAllUsersWithPagination(limit, offset) {
        const [users, total] = await Promise.all([
            this.userModel
                .find()
                .select('-password -refreshToken')
                .skip(offset)
                .limit(limit)
                .sort({ createdAt: -1 })
                .exec(),
            this.userModel.countDocuments().exec(),
        ]);
        return { users, total };
    }
    async updateUserRole(userId, role) {
        const user = await this.userModel
            .findByIdAndUpdate(userId, { role }, { new: true })
            .select('-password -refreshToken')
            .exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async deleteUserById(userId) {
        const result = await this.userModel.findByIdAndDelete(userId).exec();
        if (!result) {
            throw new common_1.NotFoundException('User not found');
        }
    }
    async deleteUser(id) {
        const result = await this.userModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('User not found');
        }
    }
    getProfile(user) {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber,
            role: user.role,
            preferences: user.preferences,
            isActive: user.isActive,
            isEmailVerified: user.isEmailVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            lastLogin: user.lastLogin,
        };
    }
    async updateProfile(user, updateUserDto) {
        const updatedUser = await this.updateUser(user.id, updateUserDto);
        return {
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            phoneNumber: updatedUser.phoneNumber,
            preferences: updatedUser.preferences,
        };
    }
    async getUserByIdWithFormatting(id) {
        const user = await this.getUserById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber,
            preferences: user.preferences,
            isActive: user.isActive,
            isEmailVerified: user.isEmailVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    async deactivateAccount(user) {
        await this.deactivateUser(user.id);
        return { message: 'Account deactivated successfully' };
    }
    async activateAccount(user) {
        await this.activateUser(user.id);
        return { message: 'Account activated successfully' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map