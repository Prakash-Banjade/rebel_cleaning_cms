import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuth } from "@/context/AuthContext";
import BreadCrumbs from "@/lib/breadcrumbs";


export default function Layout() {

    const { accessToken } = useAuth();

    return accessToken ? (
        <div className='flex border h-[100dvh]'>
            <section className="border-r border-border min-w-[var(--sidebar-width)] bg-foregroundSecondary">
                <Sidebar />
            </section>
            <section className="max-h-full overflow-auto grow p-4">
                <Header />
                <div className="my-4 bg-white border px-5 py-3 rounded-md">
                    <BreadCrumbs />
                </div>
                <Outlet />
            </section>
        </div>
    ) : <Navigate to="/" replace />
}
