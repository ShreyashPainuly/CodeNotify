import { z } from 'zod';
export declare const SendCustomEmailSchema: z.ZodObject<{
    to: z.ZodUnion<readonly [z.ZodEmail, z.ZodArray<z.ZodString>]>;
    subject: z.ZodString;
    html: z.ZodString;
    text: z.ZodOptional<z.ZodString>;
    replyTo: z.ZodOptional<z.ZodEmail>;
}, z.core.$strip>;
export type SendCustomEmailDto = z.infer<typeof SendCustomEmailSchema>;
export declare const SendBulkEmailSchema: z.ZodObject<{
    userIds: z.ZodArray<z.ZodString>;
    subject: z.ZodString;
    html: z.ZodString;
    text: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type SendBulkEmailDto = z.infer<typeof SendBulkEmailSchema>;
export declare const SendAnnouncementSchema: z.ZodObject<{
    subject: z.ZodString;
    title: z.ZodString;
    message: z.ZodString;
    actionUrl: z.ZodOptional<z.ZodURL>;
    actionText: z.ZodOptional<z.ZodString>;
    filters: z.ZodOptional<z.ZodObject<{
        platforms: z.ZodOptional<z.ZodArray<z.ZodString>>;
        isActive: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type SendAnnouncementDto = z.infer<typeof SendAnnouncementSchema>;
export declare const SendContestReminderSchema: z.ZodObject<{
    contestId: z.ZodString;
    userIds: z.ZodArray<z.ZodString>;
    customMessage: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type SendContestReminderDto = z.infer<typeof SendContestReminderSchema>;
