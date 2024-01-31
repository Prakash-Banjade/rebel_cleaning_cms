import { FormSchemaType, formSchema } from "@/models/login-form.model"
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
import { AxiosError } from "axios"
import { CiCircleAlert } from "react-icons/ci";
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import cookie from 'js-cookie'

export function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { setAccessToken } = useAuth();
    const navigate = useNavigate();

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    async function onSubmit(values: FormSchemaType) {
        setLoading(true)
        try {
            const res = await axiosInstance.post('/auth/login', values);
            if (!res.data?.access_token) throw new Error('Something went wrong. Please try again!')
            setAccessToken(res.data.access_token)
            cookie.set('access_token', res.data.access_token, { expires: 1 })
            navigate('/dashboard')
        } catch (e) {
            if (e instanceof AxiosError) {
                const originalMsg = e.response?.data.message
                console.log(e);
                if ('message' in originalMsg) {
                    form.setError(originalMsg?.field, { message: originalMsg.message })
                    form.setFocus(originalMsg?.field)
                }
            } else if (e instanceof Error) {
                setError(e.message)
            } else {
                setError(`${e}`)
            }
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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="your_email@gmail.com" {...field} type="email" />
                            </FormControl>
                            <FormDescription>
                                Enter your registered email above.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="********" {...field} type="password" />
                            </FormControl>
                            <FormDescription>
                                Enter your account password above.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingButton loading={loading} type="submit" variant="brand" className="w-full">Login</LoadingButton>
            </form>
        </Form>
    )
}


