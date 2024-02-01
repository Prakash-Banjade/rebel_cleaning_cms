import ViewAllBlogs from "@/components/page-components/blogs/all-blogs-view";
import EntityWrapper from "@/components/ui/layout/entity-wrapper";
import { fetchBlogs } from "@/lib/queryFns";
import { useQuery } from "@tanstack/react-query";

export default function BlogsPage() {

    const { data } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs
    })

    return (
        <EntityWrapper title="Blogs" description="All blogs" addBtnUrl="new">
            <ViewAllBlogs blogs={data} />
        </EntityWrapper>
    )
}
