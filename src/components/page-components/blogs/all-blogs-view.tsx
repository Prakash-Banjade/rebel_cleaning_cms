import { Blog } from "@/models/blog.model"
import BlogCard from "./single-blog-card"

interface Props {
    blogs: Blog[]
}

export default function ViewAllBlogs({ blogs }: Props) {
    return (
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-8">
            {
                blogs?.map(blog => <BlogCard key={blog?.id} blog={blog} />)
            }
        </div>
    )
}
