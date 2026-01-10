import { UsersService } from './users.service';
import { UpdateUserDto, GetUserByIdDto, type UserPreferences, GetAllUsersDto, UpdateUserRoleDto, UpdateUserRoleBodyDto, DeleteUserDto } from './dto/user.dto';
import type { UserDocument } from './schemas/user.schema';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(query: GetAllUsersDto): Promise<{
        users: Array<{
            id: string;
            email: string;
            name: string;
            phoneNumber?: string;
            role: string;
            preferences: UserPreferences;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        }>;
        total: number;
        limit: number;
        offset: number;
    }>;
    getProfile(user: UserDocument): {
        id: string;
        email: string;
        name: string;
        phoneNumber?: string;
        role: 'user' | 'admin';
        preferences: UserPreferences;
        isActive: boolean;
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
    getUserById(params: GetUserByIdDto): Promise<{
        id: string;
        email: string;
        name: string;
        phoneNumber?: string;
        preferences: UserPreferences;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deactivateAccount(user: UserDocument): Promise<{
        message: string;
    }>;
    activateAccount(user: UserDocument): Promise<{
        message: string;
    }>;
    updateUserRole(params: UpdateUserRoleDto, body: UpdateUserRoleBodyDto): Promise<{
        id: string;
        email: string;
        name: string;
        role: string;
        message: string;
    }>;
    deleteUser(params: DeleteUserDto): Promise<{
        message: string;
    }>;
}
