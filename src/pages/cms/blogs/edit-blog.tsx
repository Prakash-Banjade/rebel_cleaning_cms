import EditBlogForm from "@/components/page-components/blogs/edit-blog-form";
import EntityWrapper from "@/components/ui/layout/entity-wrapper";
import { getBlogById } from "@/lib/queryFns";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function EditBlog() {

    const params = useParams();

    const { data, isPending } = useQuery({
        queryKey: ["blog", params.id],
        queryFn: () => getBlogById(params.id!),
    })

    if (isPending) return <h3 className="text-4xl p-4">Loading...</h3>

    return (
        <EntityWrapper title="Edit blog" description="Make necessary changes and save.">
            <EditBlogForm blog={data} />
        </EntityWrapper>
    )
}
