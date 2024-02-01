import { z } from "zod";

export interface Gallery {
    id: string;
    title: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
}

export const galleryFormSchema = z.object({
    title: z.string({ required_error: 'Title for gallery is required' }),
    images: z.array(z.instanceof(File)).optional().default([])
})

export type GalleryFormSchemaType = z.infer<typeof galleryFormSchema>