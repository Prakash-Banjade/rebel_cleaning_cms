import CreateBlogForm from "@/components/page-components/blogs/create-blog-form";
import EntityWrapper from "@/components/ui/layout/entity-wrapper";

export default function AddBlog() {
    return (
        <EntityWrapper title="Add new blog" description="Fill the form below and submit to create a new blog.">
            <CreateBlogForm />
        </EntityWrapper>
    )
}
