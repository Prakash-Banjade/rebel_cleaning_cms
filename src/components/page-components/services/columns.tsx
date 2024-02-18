import { Button } from "@/components/ui/button"
import CustomDropDown from "@/lib/CustomDropDown"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { FiEdit } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"
import { MdDeleteOutline } from "react-icons/md";
import { CustomAlertDialog } from "@/lib/CustomAlertDialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteService } from "@/lib/queryFns"

export type Services = {
    id: string,
    title: string,
    content: string,
    createdAt: string,
}

export const ServicesTableColumns: ColumnDef<Services>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        )
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            const service = row.original;
            return <Link to={service.id} className="hover:underline font-medium">{service.title}</Link>
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const user = row.original;
            return Intl.DateTimeFormat('en-au', {
                dateStyle: 'medium',
                timeZone: 'Australia/Sydney',
            }).format(new Date(user.createdAt))
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const service = row.original

            const navigate = useNavigate()

            const queryClient = useQueryClient()

            const { isPending, mutate } = useMutation({
                mutationFn: () => deleteService(service.id),
                onSuccess: () => queryClient.invalidateQueries({ queryKey: ['services'] })
            })

            return (
                <CustomDropDown
                    trigger={
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    }
                    menuItems={[
                        {
                            type: 'button',
                            element: <span onClick={() => {
                                navigate(`${service.id}/edit`)
                            }} className=" flex items-center gap-x-2">
                                <span className="text-blue-600 text-base"><FiEdit /></span>
                                Edit
                            </span>
                        },
                        {
                            type: 'dialog',
                            element: (
                                <CustomAlertDialog
                                    actionHandleFn={() => mutate()}
                                    actionLabel="Remove" title="Are you sure to remove this record?"
                                    description="This will remove the record temporarily. You can restore from the trash any time."
                                    showDiscard
                                    discardLabel="Cancel"
                                    trigger={<div className="flex items-center text-sm gap-2 px-1.5 py-1 hover:bg-slate-100 rounded-sm" role="button">
                                        <span className="text-red-600 text-base"><MdDeleteOutline /></span>
                                        Remove
                                    </div>}
                                    actionLoading={isPending}
                                />
                            )
                        }
                    ]}
                />
            )
        }
    }
]
