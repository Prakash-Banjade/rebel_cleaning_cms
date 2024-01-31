import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import LoadingButton from "./LoadingButton"

type Props = {
    trigger: React.ReactNode,
    title: string,
    description?: string,
    showDiscard?: boolean,
    discardLabel?: string,
    actionLabel: string,
    actionHandleFn: () => void
    actionLoading?: boolean,
    actionLoadingLabel?: string,
}

export function CustomAlertDialog({ trigger, description, title, showDiscard, discardLabel, actionLabel, actionHandleFn, actionLoading }: Props) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {showDiscard && <AlertDialogCancel>{discardLabel}</AlertDialogCancel>}
                    <AlertDialogAction onClick={() => actionHandleFn()} disabled={actionLoading} asChild>
                        {
                            <LoadingButton loading={actionLoading || false}>{actionLabel}</LoadingButton>
                        }
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}