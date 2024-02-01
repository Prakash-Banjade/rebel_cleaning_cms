import { Button } from "@/components/ui/button";
import { CustomAlertDialog } from "@/lib/CustomAlertDialog";
import { deleteBlog } from "@/lib/queryFns";
import { Blog } from "@/models/blog.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";


const deleteBlogBtn = <Button size={'icon'} variant={'outline'} className="text-red-600 hover:text-red-500" title="Edit blog"><MdDeleteOutline /></Button>

export default function BlogCard({ blog }: { blog: Blog }) {
    const createdDate = Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(blog.createdAt));

    const queryClient = useQueryClient()

    const { isPending, mutate } = useMutation({
        mutationFn: () => deleteBlog(blog.id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] })
    })

    return (
        <div className="px-3 py-2 rounded-md shadow-sm flex flex-col">
            <span className="text-muted-foreground text-sm mb-3">{createdDate}</span>

            <Link to={blog.id} title="Click to view" className="break-words whitespace-pre-wrap hover:underline font-bold text-gray-700 text-2xl">{blog?.title}</Link>
            <p className="text-gray-700 text-sm mt-2">{blog.author?.name}</p>
            <div className="line-clamp-2 mt-5" dangerouslySetInnerHTML={{ __html: blog?.content.slice(0, 1000) }} />

            <section className="flex justify-end gap-3 mt-auto pt-5">
                <Button size={'icon'} variant={'outline'} className="text-blue-600 hover:text-blue-500" title="Edit blog" asChild>
                    <Link to={blog.id + '/edit'}>
                        <FaRegEdit />
                    </Link>
                </Button>

                <CustomAlertDialog
                    actionHandleFn={() => mutate()}
                    actionLabel="Remove" title="Are you sure to remove this record?"
                    description="This will remove the record temporarily. You can restore from the trash any time."
                    showDiscard
                    discardLabel="Cancel"
                    actionLoading={isPending}
                    trigger={deleteBlogBtn}
                />
            </section>
        </div>
    )
}
