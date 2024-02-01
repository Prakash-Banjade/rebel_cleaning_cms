import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import LoadingButton from "@/lib/LoadingButton"
import axiosInstance from "@/config/axios"
import { useState } from "react"
import { CiCircleAlert, CiCircleInfo } from "react-icons/ci";
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { Gallery, GalleryFormSchemaType, galleryFormSchema } from "@/models/gallery.model"
import MasonryGrid from "@/lib/masonry-grid"


export default function EditGalleryForm({ gallery }: { gallery: Gallery }) {
    const [error, setError] = useState('');
    const [prevImages, setPrevImages] = useState<string[]>(gallery.images)
    // const { toast } = useToast()
    const navigate = useNavigate()

    // remove images from previous images, they are of type string so need to be handled separately
    const handleRemovePrevImages = (image: string) => {
        setPrevImages(prevImages.filter(img => img !== image))
    }

    const handleSelectedImages = (index: number) => {
        form.setValue('images', form.getValues('images').filter((_, i) => i !== index))
    }

    const form = useForm<GalleryFormSchemaType>({
        resolver: zodResolver(galleryFormSchema),
        defaultValues: {
            title: gallery.title,
            images: []
        },
    })

    async function onSubmit(values: GalleryFormSchemaType) {

        try {
            const formData = new FormData();
            formData.append('title', values.title);
            values.images.forEach((image) => {
                formData.append('images', image);
            })
            prevImages.forEach(image => {
                formData.append('previousImages', image)
            })

            const res = await axiosInstance.patch(`/gallery/${gallery.id}`, formData);
            if (res.status) {
                toast({
                    title: 'Gallery updated successfully',
                })
                navigate(-1)
            }
        } catch (e) {
            console.log(e);
            setError(`${e}`);
        }
    }

    return (
        <Form {...form}>
            {error && <div className="px-3 py-2 bg-red-100 text-red-500 rounded-md mb-5 flex items-center gap-3">
                <CiCircleAlert size="20" /> {error}
            </div>}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gallery Title</FormLabel>
                            <FormControl>
                                <Input placeholder="New gallery title" required {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the title for gallery.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col gap-3">
                    <FormLabel htmlFor="coverImage">Cover Image</FormLabel>
                    <Input id="coverImage" type="file" accept="image/jpeg, image/png, image/webp" multiple onChange={e => e.target.files && form.setValue('images', [...form.getValues('images'), ...e.target.files])} />
                    <FormDescription>Select images to add to gallery. You can select multiple images too.</FormDescription>
                </div>

                {form.watch('images') && (form.getValues('images')?.length > 0 || prevImages?.length > 0) && <div className="bg-blue-50 flex items-center gap-2 text-sm w-fit rounded-md px-3 py-2 text-blue-500">
                    <CiCircleInfo />
                    Click image to remove.
                </div>}

                <MasonryGrid>
                    {
                        prevImages?.map((image, index) => (
                            <div className="relative overflow-hidden rounded-md group cursor-pointer" role="button" title="Click to remove" key={index} onClick={() => handleRemovePrevImages(image)}>
                                <img src={`${import.meta.env.VITE_REACT_APP_API_URL}/${image}`} loading="lazy" alt="galleryImage" className="rounded-md shadow-md" />
                                <div className="bg-black/40 transition-all absolute inset-0 opacity-0 group-hover:opacity-100"></div>
                            </div>
                        ))
                    }
                    {form.watch('images') && (
                        form.getValues('images').map((image, index) => (
                            <div className="relative overflow-hidden rounded-md group cursor-pointer" role="button" title="Click to remove" key={index} onClick={() => handleSelectedImages(index)}>
                                <img src={URL.createObjectURL(image!)} key={index} loading="lazy" alt="galleryImage" className="rounded-md shadow-md" />
                                <div className="bg-black/40 transition-all absolute inset-0 opacity-0 group-hover:opacity-100"></div>
                            </div>
                        ))
                    )}
                </MasonryGrid>


                <div className="flex gap-4 justify-end">
                    <Button variant="outline" type="reset" onClick={() => form.reset()}>Cancel</Button>
                    <LoadingButton loading={form.formState.isSubmitting} type="submit" variant="brand">Save Changes</LoadingButton>
                </div>
            </form>
        </Form>
    )
}
