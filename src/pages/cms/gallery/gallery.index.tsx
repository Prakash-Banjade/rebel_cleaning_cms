import AllGalleryView from "@/components/page-components/gallery/all-gallery-view";
import EntityWrapper from "@/components/ui/layout/entity-wrapper";
import { fetchGallerys } from "@/lib/queryFns";
import { useQuery } from "@tanstack/react-query";

export default function GalleryPage() {

    const { data } = useQuery({
        queryKey: ['gallery'],
        queryFn: fetchGallerys
    })


    return (
        <EntityWrapper title="Gallery" description="A list of gallery images" addBtnUrl="new">
            <AllGalleryView galleries={data} />
        </EntityWrapper>
    )
}
