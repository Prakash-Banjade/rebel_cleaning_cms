import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import EntityWrapper from "@/components/ui/layout/entity-wrapper";
import { toast } from "@/components/ui/use-toast";
import axiosInstance from "@/config/axios";
import LoadingButton from "@/lib/LoadingButton";
import { getContact } from "@/lib/queryFns";
import { cn } from "@/lib/utils";
import { ContactFormSchema, ContactFormSchemaType, contactFormFields, contactFormInitialValues } from "@/models/contact.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { CiCircleAlert } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";

export default function ContactForm() {
    const location = useLocation();
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const { data, isPending } = useQuery({
        queryKey: ['contact'],
        queryFn: () => getContact()
    })

    const urlParams = new URLSearchParams(location.search);
    const formType = urlParams.get('type');

    const form = useForm<ContactFormSchemaType>({
        resolver: zodResolver(ContactFormSchema),
        defaultValues: useMemo(() => {
            return contactFormInitialValues
        }, [isPending]),
    })

    useEffect(() => {
        if (data && data?.length && formType === 'edit') {
            const phone = data[0].phone?.map(v => ({ value: v })).filter(v => v.value);
            form.reset(
                Object.fromEntries(
                    Object.entries(data[0]).map(([key, value]) => {
                        if (key === 'phone') {
                            return ['phone', phone]
                        }
                        return [key, value]
                    })
                )
            )
        }
    }, [isPending])

    const { fields, append } = useFieldArray({
        control: form.control,
        name: "phone",
    })

    async function onSubmit(values: ContactFormSchemaType) {
        console.log(values);
        try {

            const phones = values.phone?.map(v => v.value && v.value);
            const formData = { ...values, phone: phones }

            let res: AxiosResponse<any, any>;
            if (formType === 'new') {
                res = await axiosInstance.post('/contact', formData)
            } else {
                res = await axiosInstance.patch('/contact', formData)
            }

            if (res.status) {
                toast({
                    title: 'Contact saved',
                })
                navigate(-1)
            }
        } catch (e) {
            console.log(e);
            setError(`${e}`);
        }
    }

    if (isPending && formType !== 'new') {
        return <h3 className="text-2xl p-4">Loading...</h3>
    }

    return (
        <EntityWrapper title={formType + " contact"} description="Enter the contact details of your brand.">
            <Form {...form}>
                {error && <div className="px-3 py-2 bg-red-100 text-red-500 rounded-md mb-5 flex items-center gap-3">
                    <CiCircleAlert size="20" /> {error}
                </div>}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div>
                        {fields.map((field, index) => (
                            <FormField
                                control={form.control}
                                key={field.id}
                                name={`phone.${index}.value`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                                            Phone
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Phone number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            disabled={form.watch('phone') && form.getValues('phone')?.at(-1)?.value === ''}
                            onClick={() => {
                                form.getValues('phone')?.at(-1)?.value !== '' && append({ value: "" })
                            }}
                        >
                            Add another
                        </Button>
                    </div>
                    {
                        contactFormFields.map(formField => (
                            <FormField
                                key={formField.name}
                                control={form.control}
                                name={formField.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{formField.label}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={formField.placeholder} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))
                    }

                    <div className="flex gap-4 justify-end">
                        <Button variant="outline" type="reset" onClick={() => form.reset()}>Cancel</Button>
                        <LoadingButton loading={form.formState.isSubmitting} type="submit" disabled={form.formState.isSubmitting} variant="brand">Save Contact</LoadingButton>
                    </div>
                </form>
            </Form>
        </EntityWrapper>
    )
}
