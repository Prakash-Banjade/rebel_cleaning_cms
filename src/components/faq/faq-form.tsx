import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Faq, FaqSchema, FaqWithBaseModel, faqInitialFormValues } from "@/models/faq.model"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "../ui/use-toast"
import LoadingButton from "@/lib/LoadingButton"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useMutation } from "@tanstack/react-query"
import { postFaq, updateFaq } from "@/lib/queryFns"
import { queryClient } from "@/main"
import { Textarea } from "../ui/textarea"

interface Props {
    edit?: boolean;
    faq?: FaqWithBaseModel;
    closeModal?: () => void;
}

export default function FaqForm({ edit, faq, closeModal }: Props) {

    const form = useForm<Faq>({
        resolver: zodResolver(FaqSchema),
        defaultValues: faq ? {
            question: faq.question,
            answer: faq.answer,
        } : faqInitialFormValues,
    })

    const { mutate: post, error: postErr } = useMutation({
        mutationFn: (values: Faq) => postFaq(values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['faqs'] })
            closeModal && closeModal()
        }
    })
    const { mutate: patch, error: patchErr } = useMutation({
        mutationFn: (values: Faq) => updateFaq(faq?.id!, values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['faqs'] })
            closeModal && closeModal()
        }
    })

    async function onSubmit(values: Faq) {
        console.log(values);
        try {
            { !edit ? post(values) : patch(values) }

            (postErr || patchErr) ? toast({
                title: 'Error',
                description: `${postErr?.message} ${patchErr?.message}`,
            }) : toast({
                title: 'Success',
                description: `FAQ ${edit ? 'updated' : 'added'} successfully`
            })

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="flex flex-col">
            <h2 className="text-xl text-brand mb-5 font-medium">{edit ? 'Edit FAQ' : 'Add a new FAQ'}</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="question"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Question</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter the question of FAQ" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="answer"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Answer</FormLabel>
                                <FormControl>
                                    <Textarea rows={5} placeholder="Enter the answer for the question" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-4 justify-end">
                        <Button variant="outline" type="reset" onClick={() => {
                            form.reset()
                        }}>Clear</Button>
                        <LoadingButton loading={form.formState.isSubmitting} type="submit" disabled={form.formState.isSubmitting} variant="brand">{edit ? 'Save changes' : 'Add FAQ'}</LoadingButton>
                    </div>
                </form>
            </Form>
        </div>
    )
}
