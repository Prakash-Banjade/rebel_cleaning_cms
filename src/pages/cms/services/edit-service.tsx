import EditServiceForm from "@/components/page-components/services/edit-form";
import EntityWrapper from "@/components/ui/layout/entity-wrapper";
import { getServiceById } from "@/lib/queryFns";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function EditService() {

    const params = useParams();

    const { data, isPending } = useQuery({
        queryKey: ["service", params.id],
        queryFn: () => getServiceById(params.id!),
    })

    if (isPending) return <h3 className="text-4xl p-4">Loading...</h3>

    return (
        <EntityWrapper title="Edit service" description="Make necessary changes and save.">
            <EditServiceForm service={data} />
        </EntityWrapper>
    )
}
