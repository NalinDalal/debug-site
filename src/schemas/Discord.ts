import {z} from "zod";

export const DiscordSchema = z.object({
    email: z.string().email("Please enter a valid email address")
});

export type Discord = z.infer<typeof DiscordSchema>;