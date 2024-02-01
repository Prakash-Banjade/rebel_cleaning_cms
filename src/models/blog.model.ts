import { z } from "zod";
import { User } from "./user.model";

export interface Blog {
    id: string;
    title: string;
    content: string;
    coverImage: string;
    createdAt: string;
    updatedAt: string;
    author: User
}

export const blogFormSchema = z.object({
    title: z.string().min(3).max(100),
    content: z.string(),
    coverImage: z.instanceof(File).optional()
})

export type BlogFormSchemaType = z.infer<typeof blogFormSchema>
