import { Blog } from "@/models/blog.model";
import { Link } from "react-router-dom";


export default function BlogCard({ blog }: { blog: Blog }) {
    const createdDate = Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC',
        hour12: false,
        timeZoneName: 'short'
    }).format(new Date(blog.createdAt));
    return (
        <div className="px-3 py-2 rounded-md shadow-sm flex flex-col">
            <span className="text-muted-foreground text-sm mb-3">{createdDate}</span>
            <Link to={blog.id} className="break-words whitespace-pre-wrap hover:underline font-bold text-gray-700 text-2xl">{blog?.title}</Link>
            <p className="text-gray-700 text-sm mt-2">Prakash Banjade</p>
            <div className="line-clamp-2 mt-5" dangerouslySetInnerHTML={{ __html: blog?.content.slice(0, 150) }} />
        </div>
    )
}
