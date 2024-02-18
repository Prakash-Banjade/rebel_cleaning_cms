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
import { GalleryFormSchemaType, galleryFormSchema } from "@/models/gallery.model"
import MasonryGrid from "@/lib/masonry-grid"
import FormImage from "../../../lib/form-image";


export default function AddNewGalleryForm() {
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const form = useForm<GalleryFormSchemaType>({
        resolver: zodResolver(galleryFormSchema),
        defaultValues: {
            title: '',
            images: []
        },
    })

    const handleSelectedImages = (index: number) => {
        form.setValue('images', form.getValues('images').filter((_, i) => i !== index))
    }

    async function onSubmit(values: GalleryFormSchemaType) {
        console.log(values);
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            values.images.forEach((image) => {
                formData.append('images', image);
            })

            const res = await axiosInstance.post('/gallery', formData);
            if (res.status) {
                toast({
                    title: 'Gallery added successfully',
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
                    <Input required id="coverImage" type="file" accept="image/jpeg, image/png, image/webp" multiple onChange={e => e.target.files && form.setValue('images', [...form.getValues('images'), ...e.target.files])} />
                </div>

                <MasonryGrid>
                    {form.watch('images') && (
                        form.getValues('images').map((image, index) => (
                            <FormImage key={index} src={URL.createObjectURL(image!)} removeFn={() => handleSelectedImages(index)} />
                        ))
                    )}
                </MasonryGrid>

                <div className="flex gap-4 justify-end">
                    <Button variant="outline" type="reset" onClick={() => {
                        form.reset()
                        navigate(-1)
                    }}>Cancel</Button>
                    <LoadingButton loading={form.formState.isSubmitting} type="submit" variant="brand">Add Gallery</LoadingButton>
                </div>
            </form>
        </Form>
    )
}
