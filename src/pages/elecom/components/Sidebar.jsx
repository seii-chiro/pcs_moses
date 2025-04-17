import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { RxDashboard } from "react-icons/rx";
import moses_horinzontal from '../../../assets/moses_horizontal.png';
import { RiGroupLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { LuFileText } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const links = [
        { name: "Dashboard", path: "/elecom", icon: <RxDashboard size={20} /> },
        { name: "Role", icon: <RiGroupLine size={20} /> },
        { name: "Users", icon: <FaRegUserCircle size={20} /> },
        { name: "Settings", icon: <VscSettings size={20} /> },
        { name: "Reports", icon: <LuFileText size={20} /> },
        { name: "Management", icon: <IoSettingsOutline size={20} /> },
    ];

    return (
        <>
            <div
                className={`md:hidden fixed top-4 z-50 transition-all duration-300 ${
                    isOpen ? "left-64" : "left-4"
                }`}
            >
                <button
                    className="p-2 bg-white rounded-full shadow-md focus:outline-none"
                    onClick={toggleSidebar}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            <div
                className={`fixed md:relative top-0 left-0 h-screen bg-white shadow-md z-40 w-64 p-4 transition-transform transform
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <img src={moses_horinzontal} className="w-52" alt="Moses Logo" />
                <div className="border my-8 border-[#AC94F4]/30 w-full h-[1px]"></div>
                <nav className="space-y-2">
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center gap-2 font-medium px-4 py-2 focus:text-[#635CBB] hover:text-[#635CBB] rounded-r-[5px] focus:border-l-4 focus:border-[#635CBB] focus:font-semibold focus:bg-[#635CBB]/10 transition`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.icon}
                            <span>{link.name}</span>
                        </Link>
                    ))}
                </nav>
                <div className="border my-8 border-[#AC94F4]/30 w-full h-[1px]"></div>
                <Link
                    to=""
                    className="flex items-center gap-2 font-medium px-4 py-2  rounded-r-[5px] transition"
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
