import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { CreateUserDto } from '../auth/dto/auth.dto';
import { UpdateUserDto, UserPreferences } from './dto/user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    createUser(createUserDto: CreateUserDto): Promise<UserDocument>;
    getUserById(id: string): Promise<UserDocument | null>;
    findByEmail(email: string): Promise<UserDocument | null>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument>;
    updateRefreshToken(id: string, refreshToken: string | null): Promise<void>;
    updateLastLogin(id: string): Promise<void>;
    updateEmailVerification(id: string, isVerified: boolean): Promise<void>;
    deactivateUser(id: string): Promise<UserDocument>;
    activateUser(id: string): Promise<UserDocument>;
    getAllUsers(): Promise<UserDocument[]>;
    getAllUsersWithPagination(limit: number, offset: number): Promise<{
        users: UserDocument[];
        total: number;
    }>;
    updateUserRole(userId: string, role: 'user' | 'admin'): Promise<UserDocument>;
    deleteUserById(userId: string): Promise<void>;
    deleteUser(id: string): Promise<void>;
    getProfile(user: UserDocument): {
        id: string;
        email: string;
        name: string;
        phoneNumber?: string;
        role: 'user' | 'admin';
        preferences: UserPreferences;
        isActive: boolean;
        isEmailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        lastLogin?: Date;
    };
    updateProfile(user: UserDocument, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        phoneNumber?: string;
        preferences: UserPreferences;
    }>;
    getUserByIdWithFormatting(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        phoneNumber?: string;
        preferences: UserPreferences;
        isActive: boolean;
        isEmailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deactivateAccount(user: UserDocument): Promise<{
        message: string;
    }>;
    activateAccount(user: UserDocument): Promise<{
        message: string;
    }>;
}
