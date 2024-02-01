import AddGalleryForm from "@/components/page-components/gallery/add-gallery-form";
import EntityWrapper from "@/components/ui/layout/entity-wrapper";

export default function AddGallery() {
    return (
        <EntityWrapper title="Add new gallery" description="Fill the form below and submit to create a new gallery.">
            <AddGalleryForm />
        </EntityWrapper>
    )
}
