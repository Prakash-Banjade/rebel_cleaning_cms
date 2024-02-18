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
    title: z.string().min(3, { message: 'Too short blog title. Try something else' }).max(100, { message: 'Too large title. Try upto 100 characters.' }),
    content: z.string(),
    coverImage: z.instanceof(File).optional()
})

export type BlogFormSchemaType = z.infer<typeof blogFormSchema>
