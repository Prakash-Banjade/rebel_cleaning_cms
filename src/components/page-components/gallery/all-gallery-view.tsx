import MasonryGrid from "@/lib/masonry-grid";
import { Gallery } from "@/models/gallery.model";
import { useNavigate } from "react-router-dom";

function SingleGalleryCard({ gallery }: { gallery: Gallery }) {
    const navigate = useNavigate()

    return <>
        <div className="card relative rounded-md shadow-md overflow-hidden group hover:cursor-pointer" role="link" onClick={() => navigate(gallery.id)}>
            <img src={import.meta.env.VITE_REACT_APP_API_URL + '/' + gallery.images[0]} alt={gallery.title + '_gallery'} />
            <div className="card-overlay absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all"></div>
            <div className="card-content absolute inset-0 grid place-items-center">
                <h3 className="text-white font-semibold text-2xl text-center group-hover:underline transition-all">{gallery.title}</h3>
            </div>
        </div>
    </>
}

export default function AllGalleryView({ galleries }: { galleries: Gallery[] }) {
    return (
        <MasonryGrid>
            {galleries?.map((gallery) => <SingleGalleryCard key={gallery.id} gallery={gallery} />)}
        </MasonryGrid>
    )

}
