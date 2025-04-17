import { useState } from "react";
import { useLocation, Link } from "react-router";
import { Menu, X } from "lucide-react";
import { RxDashboard } from "react-icons/rx";
import moses_horinzontal from '../../../assets/moses_horizontal.png';
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => setIsOpen(!isOpen);

    const links = [
        { name: "Dashboard", path: "/voter", icon: <RxDashboard size={20} /> },
        { name: "Profile", path: "/voter/profile", icon: <FaRegUserCircle size={20} /> },
    ];

    const isLinkActive = (path) => {
        if (path === "/voter") {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <>
            {/* Toggle button for mobile */}
            <div
                className={`fixed md:hidden top-4 z-50 transition-all duration-300 ${isOpen ? "left-64" : "left-4"}`}
            >
                <button
                    className="p-2 bg-white rounded-full shadow-md focus:outline-none"
                    onClick={toggleSidebar}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Main sidebar */}
            <div
                className={`fixed md:sticky top-0 left-0 h-full shadow-md z-40 w-64 p-4 transition-transform transform flex flex-col
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                {/* Logo */}
                <div className="flex-shrink-0">
                    <img src={moses_horinzontal} className="w-52" alt="Moses Logo" />
                </div>

                <div className="border my-8 border-[#AC94F4]/30 w-full h-[1px]"></div>

                {/* Navigation - using flex-grow to push logout to bottom */}
                <nav className="space-y-2 flex-grow">
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

                <div className="border my-8 border-[#AC94F4]/30 w-full h-[1px]"></div>

                {/* Logout link at bottom */}
                <div className="flex-shrink-0">
                    <Link
                        to="/logout"
                        className="flex items-center gap-2 font-medium px-4 py-2 rounded-r-[5px] transition hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                    >
                        <IoLogOutOutline size={20} />
                        <span>Logout</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Sidebar;