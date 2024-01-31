import ServicesViewTable from "@/components/page-components/services/view-table";
import EntityWrapper from "@/components/ui/layout/entity-wrapper";

export default function ServicesPage() {
    return (
        <EntityWrapper title="Services" description="A list of services provided" addBtnUrl="new">
            <ServicesViewTable />
        </EntityWrapper>
    )
}
