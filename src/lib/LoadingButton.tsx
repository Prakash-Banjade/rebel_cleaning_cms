import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { ComponentPropsWithoutRef } from "react"

interface LoadingButtonProps extends ComponentPropsWithoutRef<"button"> {
    loading: boolean,
    variant?: 'brand' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary' | 'default',
}

export default function LoadingButton(
    {
        loading,
        variant,
        ...props
    }: LoadingButtonProps
) {
    return (
        <Button {...props} disabled={loading} variant={variant || 'default'}>
            {
                loading ? <Icons.spinner className="h-4 w-4 animate-spin disabled:cursor-not-allowed" /> : props.children
            }
        </Button>
    )
}