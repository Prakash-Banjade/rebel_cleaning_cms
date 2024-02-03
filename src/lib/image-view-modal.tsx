import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"


type Props = {
    src: string;
    alt: string;
    trigger: React.ReactNode;
}

export default function ImageViewModal({ src, alt, trigger }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="min-w-fit min-h-fit">
                <img src={src} alt={alt} className="max-w-[80vw] max-h-[90vh] aspect-auto" />
            </DialogContent>
        </Dialog>

    )
}
