import AddNewServiceForm from "@/components/page-components/services/add-new-form";
import EntityWrapper from "@/components/ui/layout/entity-wrapper";

export default function AddService() {
    return (
        <EntityWrapper title="Add new service" description="Fill the form below and submit to create a new servce.">
            <AddNewServiceForm />
        </EntityWrapper>
    )
}
