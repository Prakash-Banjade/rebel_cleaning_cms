import { useBreadCrumb } from "@/context/BreadCrumbContext"
import { getBlogById } from "@/lib/queryFns"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export default function SingleBlogView() {
    const { id } = useParams()
    const { setBreadCrumb } = useBreadCrumb()

    const { data } = useQuery({
        queryKey: ['blog', id],
        queryFn: () => getBlogById(id as string)
    })

    useEffect(() => {
        if (data?.title) {
            setBreadCrumb(data?.title)
        }
    }, [data])

    return (
        <article className="bg-white mt-3 p-8 border rounded-md prose lg:prose-lg min-w-full flex flex-col">
            <section>
                {/* <p className="font-medium text-sm text-gray-600">Title</p> */}
                <h1 className="font-medium text-2xl !leading-normal">{data?.title}</h1>
            </section>

            <section>
                {/* <p className="font-medium text-sm text-gray-600">Cover Image</p> */}
                <img src={import.meta.env.VITE_REACT_APP_API_URL + '/' + data?.coverImage} alt={`${data?.title}_cover_image`} className="rounded-md max-h-[500px] w-auto" />
            </section>

            <section>
                {/* <p className="font-medium text-sm text-gray-600">Content</p> */}
                <div dangerouslySetInnerHTML={{ __html: data?.content }} />
            </section>
        </article>
    )
}
