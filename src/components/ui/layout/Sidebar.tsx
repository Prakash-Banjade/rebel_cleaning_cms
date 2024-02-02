
import { BiSolidDashboard } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { FaServicestack } from "react-icons/fa";
import { LiaBlogSolid } from "react-icons/lia";
import { RiContactsBookLine, RiGalleryFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const navItems = [
    {
        label: 'Dashboard',
        icon: BiSolidDashboard,
        href: '/dashboard'
    },
    {
        label: 'Users',
        icon: FaUsers,
        href: '/users',
    },
    {
        label: 'Services',
        icon: FaServicestack,
        href: '/services',
    },
    {
        label: 'Blogs',
        icon: LiaBlogSolid,
        href: '/blogs',
    },
    {
        label: 'Gallery',
        icon: RiGalleryFill,
        href: '/gallery',
    },
    {
        label: 'Contact',
        icon: RiContactsBookLine,
        href: '/contact',
    },
]

export default function Sidebar() {

    const activeLink_className = ({ isActive, isPending }: { isActive: boolean, isPending: boolean }) =>
        isPending ? "pending" : isActive ? "flex items-center gap-2 py-3 px-4 rounded-md bg-slate-200 text-brand font-medium transition-all" : "flex items-center text-gray-700 bg-slate-50 gap-2 py-3 px-4 rounded-md transition-all hover:bg-gray-100"


    return (
        <div className='p-3'>
            <img src="/logo.png" className="max-w-[120px] m-3" alt="Rebel_Cleaning_Logo" />

            <nav className="mt-20">
                <ul className="flex flex-col gap-4">
                    {
                        navItems.map((item, index) => (
                            <li key={index}>
                                <NavLink to={item.href} className={activeLink_className}>
                                    <item.icon className='text-2xl' />
                                    <span>{item.label}</span>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </nav>

        </div>
    )
}
