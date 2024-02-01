import { getServiceById } from "@/lib/queryFns"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export default function SingleServiceView() {
    const { id } = useParams()

    const { data } = useQuery({
        queryKey: ['service', id],
        queryFn: () => getServiceById(id as string)
    })
    console.log(data);

    return (
        <article className="bg-white mt-3 p-4 border rounded-md prose lg:prose-lg min-w-full flex flex-col gap-12">
            <section>
                <p className="font-medium text-sm text-gray-600">Title</p>
                <h1 className="font-medium text-2xl !mb-0">{data?.title}</h1>
            </section>

            <section>
                <p className="font-medium text-sm text-gray-600">Cover Image</p>
                <img src={import.meta.env.VITE_REACT_APP_API_URL + '/' + data?.coverImage} alt={`${data?.title}_cover_image`} className="rounded-md max-h-[500px] w-auto" />
            </section>

            <section>
                <p className="font-medium text-sm text-gray-600">Content</p>
                <div className="px-8" dangerouslySetInnerHTML={{ __html: data?.content }} />
            </section>
        </article>
    )
}
