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
import { Blog, BlogFormSchemaType, blogFormSchema } from "@/models/blog.model"
import { Button } from "@/components/ui/button"
import { Editor } from "@/lib/jodit-editor"
import { toast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"


export default function EditBlogForm({ blog }: { blog: Blog }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const form = useForm<BlogFormSchemaType>({
        resolver: zodResolver(blogFormSchema),
        defaultValues: {
            title: blog.title,
            content: blog.content,
            coverImage: undefined,
        },
    })

    async function onSubmit(values: BlogFormSchemaType) {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', values.content);
            if (!values?.coverImage || blog.coverImage) {
                formData.append('coverImage', blog.coverImage);
            } else if (values?.coverImage instanceof File) {
                formData.append('coverImage', values.coverImage);
            }

            const res = await axiosInstance.patch(`/blogs/${blog?.id}`, formData);
            if (res.status) {
                toast({
                    title: 'Updated successfully',
                })
                navigate(-1)
            }
        } catch (e) {
            console.log(e);
            setError(`${e}`)
        } finally {
            setLoading(false)
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
                            <FormLabel>Blog Title</FormLabel>
                            <FormControl>
                                <Input placeholder="New blog title" required {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the title for blog.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col gap-3">
                    <FormLabel htmlFor="coverImage">Cover Image</FormLabel>
                    <Input id="coverImage" type="file" accept="image/*" onChange={e => e.target.files && form.setValue('coverImage', e.target.files[0])} />
                </div>

                {(form.watch('coverImage') || blog?.coverImage) && <img src={(form.getValues('coverImage') instanceof File && URL.createObjectURL(form.getValues('coverImage')!)) || `${import.meta.env.VITE_REACT_APP_API_URL}/${blog.coverImage}`} alt="cover_image" className="w-full max-w-[600px] aspect-auto rounded-md shadow-md" />}
                <section className="mt-8 flex flex-col gap-3">
                    <FormLabel>Content</FormLabel>
                    <Editor content={form.getValues('content')} placeholder={'Write blog description here'} setContent={(content: string) => form.setValue('content', content)} />
                </section>

                <div className="flex gap-4 justify-end">
                    <Button variant="outline" type="reset" onClick={() => {
                        form.reset();
                        navigate(-1)
                    }}>Cancel</Button>
                    <LoadingButton loading={loading} type="submit" variant="brand">Save changes</LoadingButton>
                </div>
            </form>
        </Form>
    )
}
