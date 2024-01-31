import { Button } from "@/components/ui/button"
import CustomDropDown from "@/lib/CustomDropDown"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom"
import { MdDeleteOutline } from "react-icons/md";
import { CustomAlertDialog } from "@/lib/CustomAlertDialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUser } from "@/lib/queryFns"

export type User = {
    id: string,
    email: string,
    createdAt: string,
}

export const UsersTableColumns: ColumnDef<User>[] = [
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
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            const user = row.original;
            return <span className="font-medium">{user.email}</span>
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
            const student = row.original

            const navigate = useNavigate()

            const queryClient = useQueryClient()

            const { isPending, mutate } = useMutation({
                mutationFn: () => deleteUser(student.id),
                onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
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
                                navigate(`edit/${student.id}`)
                            }} className="text-blue-600 flex items-center gap-x-2"><FiEdit />
                                Edit details
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
