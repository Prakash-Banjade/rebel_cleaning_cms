import { z } from "zod";

export const BaseModelSchema = z.object({
    id: z.string(),
    updatedAt: z.string(),
    createdAt: z.string(),
    deletedAt: z.string().nullable(),
})

export type BaseModel = z.infer<typeof BaseModelSchema>