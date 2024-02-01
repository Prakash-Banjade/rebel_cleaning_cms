import { z } from "zod";

export const serviceFormSchema = z.object({
    title: z.string().min(3).max(100),
    content: z.string(),
    coverImage: z.instanceof(File).optional()
})

export type ServiceFormSchemaType = z.infer<typeof serviceFormSchema>

