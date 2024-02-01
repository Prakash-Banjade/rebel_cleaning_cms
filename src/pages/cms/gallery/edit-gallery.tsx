import EditGalleryForm from "@/components/page-components/gallery/edit-gallery-form";
import EntityWrapper from "@/components/ui/layout/entity-wrapper";
import { getGalleryById } from "@/lib/queryFns";
import { Gallery } from "@/models/gallery.model";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function EditGallery() {
    const params = useParams();

    const { data } = useQuery({
        queryKey: ["blog", params.id],
        queryFn: () => getGalleryById(params.id!),
    })

    return (
        <EntityWrapper title="Edit Gallery" description="Make necessary changes and save">
            <EditGalleryForm gallery={data as Gallery} />
        </EntityWrapper>
    )
}
