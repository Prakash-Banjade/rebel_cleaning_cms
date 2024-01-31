import { DataTable } from "@/lib/data-table";
import { UsersTableColumns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/fetch-queries";

export default function UsersViewTable() {

    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,

    })

    return (
        <DataTable columns={UsersTableColumns} data={data || []} />
    )
}
