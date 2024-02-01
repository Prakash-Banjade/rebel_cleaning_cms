import { Button } from "@/components/ui/button";
import { CustomAlertDialog } from "@/lib/CustomAlertDialog";
import MasonryGrid from "@/lib/masonry-grid";
import { deleteGallery } from "@/lib/queryFns";
import { Gallery } from "@/models/gallery.model";
import { useMutation } from "@tanstack/react-query";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function SingleGalleryView({ gallery }: { gallery: Gallery }) {
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: () => deleteGallery(gallery.id),
        onSuccess: () => navigate(-1)
    })

    return (
        <div className="bg-white mt-3 p-8 border rounded-md">
            <header className="flex items-center justify-between mb-12 gap-12 flex-wrap">
                <h2 className="text-2xl font-medium">{gallery?.title}</h2>

                <div className="space-x-5 ml-auto">
                    <Button variant="outline" title="Edit gallery" className="text-blue-600 hover:text-blue-500" onClick={() => navigate('edit')}>
                        <span className="mr-2"><FaRegEdit /></span>
                        Edit
                    </Button>
                    <CustomAlertDialog
                        actionHandleFn={() => mutate()}
                        actionLabel="Delete" title="Are you sure to remove this record?"
                        description="This will remove the record permanently. You can't undo this action."
                        showDiscard
                        actionLoading={isPending}
                        discardLabel="Cancel"
                        trigger={<Button variant="outline" title="Delete gallery" className="text-red-600 hover:text-red-500">
                            <span className="mr-2"><MdDeleteOutline /></span>
                            Delete
                        </Button>}
                    />
                </div>
            </header>

            {gallery?.images.length === 0 && <p className="text-center p-4 italic text-muted-foreground">No images added in this gallery.</p>}
            <MasonryGrid>
                {
                    gallery?.images.map((image, index) => (
                        <img src={`${import.meta.env.VITE_REACT_APP_API_URL}/${image}`} key={index} loading="lazy" alt="galleryImage" className=" rounded-md shadow-md" />
                    ))
                }
            </MasonryGrid>
        </div>
    )
}
