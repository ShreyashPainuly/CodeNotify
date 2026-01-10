import { z } from 'zod';
export declare const UpdateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<{
        user: "user";
        admin: "admin";
    }>>;
    preferences: z.ZodOptional<z.ZodObject<{
        platforms: z.ZodOptional<z.ZodArray<z.ZodEnum<{
            codeforces: "codeforces";
            leetcode: "leetcode";
            codechef: "codechef";
            atcoder: "atcoder";
        }>>>;
        alertFrequency: z.ZodOptional<z.ZodEnum<{
            immediate: "immediate";
            daily: "daily";
            weekly: "weekly";
        }>>;
        contestTypes: z.ZodOptional<z.ZodArray<z.ZodString>>;
        notificationChannels: z.ZodOptional<z.ZodObject<{
            whatsapp: z.ZodOptional<z.ZodBoolean>;
            email: z.ZodOptional<z.ZodBoolean>;
            push: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>>;
        notifyBefore: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const GetUserByIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const GetAllUsersSchema: z.ZodObject<{
    limit: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
    offset: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
}, z.core.$strip>;
export declare const UpdateUserRoleSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const UpdateUserRoleBodySchema: z.ZodObject<{
    role: z.ZodEnum<{
        user: "user";
        admin: "admin";
    }>;
}, z.core.$strip>;
export declare const DeleteUserSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
declare const UpdateUserDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<{
        user: "user";
        admin: "admin";
    }>>;
    preferences: z.ZodOptional<z.ZodObject<{
        platforms: z.ZodOptional<z.ZodArray<z.ZodEnum<{
            codeforces: "codeforces";
            leetcode: "leetcode";
            codechef: "codechef";
            atcoder: "atcoder";
        }>>>;
        alertFrequency: z.ZodOptional<z.ZodEnum<{
            immediate: "immediate";
            daily: "daily";
            weekly: "weekly";
        }>>;
        contestTypes: z.ZodOptional<z.ZodArray<z.ZodString>>;
        notificationChannels: z.ZodOptional<z.ZodObject<{
            whatsapp: z.ZodOptional<z.ZodBoolean>;
            email: z.ZodOptional<z.ZodBoolean>;
            push: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>>;
        notifyBefore: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class UpdateUserDto extends UpdateUserDto_base {
}
declare const GetUserByIdDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>> & {
    io: "input";
};
export declare class GetUserByIdDto extends GetUserByIdDto_base {
}
declare const GetAllUsersDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    limit: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
    offset: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class GetAllUsersDto extends GetAllUsersDto_base {
}
declare const UpdateUserRoleDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>> & {
    io: "input";
};
export declare class UpdateUserRoleDto extends UpdateUserRoleDto_base {
}
declare const UpdateUserRoleBodyDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    role: z.ZodEnum<{
        user: "user";
        admin: "admin";
    }>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class UpdateUserRoleBodyDto extends UpdateUserRoleBodyDto_base {
}
declare const DeleteUserDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>> & {
    io: "input";
};
export declare class DeleteUserDto extends DeleteUserDto_base {
}
export interface UserPreferences {
    platforms: ('codeforces' | 'leetcode' | 'codechef' | 'atcoder')[];
    alertFrequency: 'immediate' | 'daily' | 'weekly';
    contestTypes: string[];
    notificationChannels?: {
        whatsapp: boolean;
        email: boolean;
        push: boolean;
    };
    notifyBefore?: number;
}
export {};
