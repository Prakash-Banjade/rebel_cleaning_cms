import SingleGalleryView from '@/components/page-components/gallery/single-gallery-view'
import { getGalleryById } from '@/lib/queryFns'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export default function ViewSingleGallery() {
    const { id } = useParams()

    const { data } = useQuery({
        queryKey: ['blog', id],
        queryFn: () => getGalleryById(id as string)
    })

    return <SingleGalleryView gallery={data} />
}
