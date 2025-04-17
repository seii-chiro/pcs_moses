import { useState } from "react";
import { useLocation, Link } from "react-router";
import { Menu, X } from "lucide-react";
import { RxDashboard } from "react-icons/rx";
import moses_horinzontal from '../../../assets/moses_horizontal.png';
import { FaRegUserCircle } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => setIsOpen(!isOpen);

    const links = [
        { name: "Dashboard", path: "/admin", icon: <RxDashboard size={20} /> }, 
        { name: "Profile", icon: <FaRegUserCircle size={20} /> },
        { name: "Settings", icon: <VscSettings size={20} /> },
        { name: "Manage Precinct", path: "/admin/precinct", icon: <MdOutlineAdminPanelSettings size={20} /> },
    ];

    const isLinkActive = (path) => {
        if (path === "/admin") {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <>
            <div
                className={`h-screen md:hidden fixed top-4 z-50 transition-all duration-300 ${isOpen ? "left-64" : "left-4"}`}
            >
                <button
                    className="p-2 bg-white rounded-full shadow-md focus:outline-none"
                    onClick={toggleSidebar}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div
                className={`fixed md:relative top-0 left-0 h-screen bg-white shadow-md z-40 w-72 p-4 transition-transform transform
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <img src={moses_horinzontal} className="w-52" alt="Moses Logo" />
                <div className="border my-8 border-[#AC94F4]/30 w-full h-[1px]"></div>

                <nav className="space-y-2">
                    {links.map((link) => {
                        const active = isLinkActive(link.path);

                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center gap-2 font-medium px-4 py-2 rounded-r-[5px] transition
                                    ${active
                                        ? "text-[#635CBB] border-l-4 border-[#635CBB] font-semibold bg-[#635CBB]/10"
                                        : "hover:bg-gray-100"
                                    }`}
                                onClick={() => setIsOpen(false)}
                                aria-current={active ? "page" : undefined}
                            >
                                <span className={`${active ? "text-[#635CBB]" : "text-gray-700"}`}>
                                    {link.icon}
                                </span>
                                <span>{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="border my-5 border-[#AC94F4]/30 w-full h-[1px]"></div>

                <Link
                    to="/"
                    className="flex items-center gap-2 font-medium px-4 py-2 rounded-r-[5px] transition hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                >
                    <IoLogOutOutline size={20} />
                    <span>Logout</span>
                </Link>
            </div>
        </>
    );
};

export default Sidebar;