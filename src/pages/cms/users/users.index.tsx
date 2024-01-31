import UsersViewTable from "@/components/page-components/login/users/view-table";
import EntityWrapper from "@/components/ui/layout/entity-wrapper";

export default function UsersPage() {
    return (
        <EntityWrapper title="Users" description="A list of registered users">
            <UsersViewTable />
        </EntityWrapper>
    )
}
