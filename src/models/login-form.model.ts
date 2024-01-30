"use client"

import { z } from "zod"

export const formSchema = z.object({
    email: z.string().email({ message: 'Must be a valid email' }),
    password: z.string(),
})

export type FormSchemaType = z.infer<typeof formSchema>
