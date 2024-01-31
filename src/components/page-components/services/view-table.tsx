import { DataTable } from "@/lib/data-table";
import { fetchServices } from "@/lib/queryFns";
import { useQuery } from "@tanstack/react-query";
import { ServicesTableColumns } from "./columns";

export default function ServicesViewTable() {

    const { data } = useQuery({
        queryKey: ['services'],
        queryFn: fetchServices,

    })


    return (
        <DataTable columns={ServicesTableColumns} data={data || []} />
    )
}
