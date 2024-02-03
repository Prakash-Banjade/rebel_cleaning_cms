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

interface Props {
    service: {
        id: string,
        title: string,
        content: string,
        coverImage: string,
        createdAt: string,
    }
}

export default function EditServiceForm({ service }: Props) {
    const [error, setError] = useState('');
    const [serviceImage, setServiceImage] = useState(service.coverImage)
    const navigate = useNavigate()

    const form = useForm<ServiceFormSchemaType>({
        resolver: zodResolver(serviceFormSchema),
        defaultValues: {
            title: service.title,
            content: service.content,
            coverImage: undefined,
        },
    })

    async function onSubmit(values: ServiceFormSchemaType) {
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', values.content);
            if (!values?.coverImage || service.coverImage) {
                formData.append('coverImage', service.coverImage);
            } else if (values?.coverImage instanceof File) {
                formData.append('coverImage', values.coverImage);
            }

            const res = await axiosInstance.patch(`/services/${service?.id}`, formData);
            if (res.status) {
                toast({
                    title: 'Updated successfully',
                })
                navigate(-1)
            }
        } catch (e) {
            console.log(e);
            setError(`${e}`)
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
                    <Input id="coverImage" type="file" accept="image/*" onChange={e => e.target.files && form.setValue('coverImage', e.target.files[0])} />
                </div>

                {(form.watch('coverImage') || serviceImage) && (
                    <FormImage
                        src={(form.getValues('coverImage') instanceof File && URL.createObjectURL(form.getValues('coverImage')!)) || `${import.meta.env.VITE_REACT_APP_API_URL}/${serviceImage}`}
                        alt="cover_image"
                        imageClassName="w-full max-w-[600px] aspect-auto rounded-md shadow-md"
                        removeFn={() => {
                            form.setValue('coverImage', undefined)
                            setServiceImage('')
                        }}
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
                    <LoadingButton loading={form.formState.isSubmitting} type="submit" variant="brand">Save changes</LoadingButton>
                </div>
            </form>
        </Form>
    )
}
