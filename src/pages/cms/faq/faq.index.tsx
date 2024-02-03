import FaqForm from "@/components/faq/faq-form";
import { Button } from "@/components/ui/button";
import EntityWrapper from "@/components/ui/layout/entity-wrapper";
import CustomAccordion from "@/lib/CustomAccordion";
import { CustomAlertDialog } from "@/lib/CustomAlertDialog";
import CustomDialog from "@/lib/CustomDialog";
import { getFaqs, removeFaq } from "@/lib/queryFns";
import { queryClient } from "@/main";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

export default function FaqPage() {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const { data, isPending } = useQuery({
        queryKey: ['faqs'],
        queryFn: getFaqs
    })

    const { mutate: remove, isPending: isPendingRemove } = useMutation({
        mutationFn: (id: string) => removeFaq(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['faqs'] })
        }
    })

    if (isPending) return <div className="text-2xl p-4">Loading...</div>

    return (
        <EntityWrapper title="FAQs" description="From user permissions to customization tips, find expert guidance and troubleshoot with ease.">
            <div className="grid lg:grid-cols-2 gap-10 grid-cols-1">
                <section>
                    {
                        data?.map(faq => (
                            <CustomAccordion
                                key={faq.id}
                                title={faq.question}
                                content={<>
                                    <p>{faq.answer}</p>
                                    <div className="flex justify-end gap-4">
                                        <CustomDialog
                                            content={<FaqForm edit faq={faq} closeModal={() => setEditDialogOpen(false)} />}
                                            open={editDialogOpen}
                                            setOpen={setEditDialogOpen}
                                        >
                                            <Button variant="outline" size="icon" className="text-blue-600 text-lg hover:text-blue-500" title="Edit">
                                                <FaRegEdit />
                                            </Button>
                                        </CustomDialog>
                                        <CustomAlertDialog
                                            trigger={
                                                <Button variant="outline" size="icon" className="text-red-600 text-lg hover:text-red-500" title="Remove">
                                                    <MdDeleteOutline />
                                                </Button>
                                            }
                                            actionLabel="Remove"
                                            actionLoading={isPendingRemove}
                                            discardLabel="Cancel"
                                            showDiscard
                                            title="Delete FAQ"
                                            description="Are you sure you want to delete this FAQ?"
                                            actionHandleFn={() => remove(faq.id)}
                                        />
                                    </div>
                                </>}
                            />
                        ))
                    }
                </section>

                <FaqForm />
            </div>
        </EntityWrapper>
    )
}
