import { Button } from "@/components/ui/button";
import ImageViewModal from "@/lib/image-view-modal";
import { HiOutlineEye } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { cn } from "./utils";

interface FormImageProps {
    src: string;
    removeFn: () => void;
    alt?: string;
    imageClassName?: string;
}

export default function FormImage({ src, removeFn, alt, imageClassName }: FormImageProps) {
    return (
        <div className="relative overflow-hidden rounded-md w-fit group" role="button">
            <img src={src} loading="lazy" alt={alt || "galleryImage"} className={cn("rounded-md shadow-md", imageClassName)} />
            <div className="bg-black/40 transition-all absolute grid place-items-center inset-0 opacity-0 group-hover:opacity-100">
                <div className="flex gap-3">
                    <ImageViewModal
                        src={src}
                        alt={alt || "galleryImage"}
                        trigger={<Button variant="outline" size="icon" type="button" className="text-xl text-blue-600 hover:text-blue-500" title="View image"><HiOutlineEye /></Button>}
                    />
                    <Button variant="outline" size="icon" type="button" className="text-xl text-red-600 hover:text-red-500" title="Click to remove" onClick={() => removeFn()}><MdDeleteOutline /></Button>
                </div>
            </div>
        </div>
    )
}
