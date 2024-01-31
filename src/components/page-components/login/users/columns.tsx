import { Button } from "@/components/ui/button"
import CustomDropDown from "@/lib/CustomDropDown"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

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
        header: "Created at",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <CustomDropDown
                    trigger={
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    }
                    menuItems={[
                        { element: <h1>{payment.id}</h1> }
                    ]}
                />
            )
        }
    }
]
