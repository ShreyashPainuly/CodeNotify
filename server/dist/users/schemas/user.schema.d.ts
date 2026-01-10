import { Document, Types } from 'mongoose';
import type { UserPreferences } from '../dto/user.dto';
export interface UserDocument extends Document {
    _id: Types.ObjectId;
    id: string;
    email: string;
    password: string;
    name: string;
    phoneNumber?: string;
    role: 'user' | 'admin';
    preferences: UserPreferences;
    isActive: boolean;
    isEmailVerified: boolean;
    refreshToken?: string;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class User {
    email: string;
    password: string;
    name: string;
    phoneNumber?: string;
    role: string;
    preferences: UserPreferences;
    isActive: boolean;
    isEmailVerified: boolean;
    refreshToken?: string;
    lastLogin?: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
