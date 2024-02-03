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
import { CiCircleAlert } from "react-icons/ci";
import { ServiceFormSchemaType, serviceFormSchema } from "@/models/service-form.model"
import { Button } from "@/components/ui/button"
import { Editor } from "@/lib/jodit-editor"
import { toast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import FormImage from "@/lib/form-image"

export default function AddNewServiceForm() {
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const form = useForm<ServiceFormSchemaType>({
        resolver: zodResolver(serviceFormSchema),
        defaultValues: {
            title: '',
            content: '',
            coverImage: undefined
        },
    })

    async function onSubmit(values: ServiceFormSchemaType) {
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', values.content);
            values.coverImage instanceof File && formData.append('coverImage', values.coverImage);

            const res = await axiosInstance.post('/services', formData);
            if (res.status) {
                toast({
                    title: 'Service added successfully',
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
                            <FormLabel>Service Title</FormLabel>
                            <FormControl>
                                <Input placeholder="New service title" required {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the title for service.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col gap-3">
                    <FormLabel htmlFor="coverImage">Cover Image</FormLabel>
                    <Input required id="coverImage" type="file" accept="image/*" onChange={e => e.target.files && form.setValue('coverImage', e.target.files[0])} />
                </div>

                {form.watch('coverImage') && (
                    <FormImage
                        src={URL.createObjectURL(form.getValues('coverImage')!)}
                        alt="cover_image"
                        imageClassName="w-full max-w-[600px] aspect-auto rounded-md shadow-md"
                        removeFn={() => form.setValue('coverImage', undefined)}
                    />
                )}

                <section className="mt-8 flex flex-col gap-3">
                    <FormLabel>Content</FormLabel>
                    <Editor content={form.getValues('content')} placeholder={'Write service description here'} setContent={(content: string) => form.setValue('content', content)} />
                </section>

                <div className="flex gap-4 justify-end">
                    <Button variant="outline" type="reset" onClick={() => {
                        form.reset()
                        navigate(-1)
                    }}>Cancel</Button>
                    <LoadingButton loading={form.formState.isSubmitting} type="submit" variant="brand">Add Service</LoadingButton>
                </div>
            </form>
        </Form>
    )
}
