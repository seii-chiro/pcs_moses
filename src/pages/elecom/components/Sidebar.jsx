import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { RxDashboard } from "react-icons/rx";
import moses_horinzontal from '../../../assets/moses_horizontal.png';
import { VscSettings } from "react-icons/vsc";
import { LuFileText } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";
import { FaSlideshare } from "react-icons/fa6";
import { LiaBoxOpenSolid } from "react-icons/lia";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { LuFileBox } from "react-icons/lu";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const links = [
        { name: "Dashboard", path: "/elecom", icon: <RxDashboard size={20} /> },
        { name: "Initialization", icon: <FaSlideshare size={20} /> },
        { name: "Open Polls", icon: <LiaBoxOpenSolid size={20} /> },
        { name: "Close Polls", icon: <GiCardboardBoxClosed size={20} /> },
        { name: "Polls Canvassing", icon: <LuFileBox size={20} /> },
        { name: "Reports", icon: <LuFileText size={20} /> },
        { name: "Settings", icon: <VscSettings size={20} /> },
    ];

    return (
        <>
            <div className={`md:hidden fixed top-4 z-50 transition-all duration-300 ${ isOpen ? "left-64" : "left-4"}`}>
                <button className="p-2 bg-white rounded-full shadow-md focus:outline-none" onClick={toggleSidebar}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            <div className={`fixed md:relative top-0 left-0 h-screen bg-white shadow-md z-40 w-64 p-4 transition-transform transform flex flex-col justify-between ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
                <div>
                    <img src={moses_horinzontal} className="w-52" alt="Moses Logo" />
                    <div className="border my-8 border-[#AC94F4]/30 w-full h-[1px]"></div>
                    <nav className="space-y-2">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                to={link.path}
                                className="flex items-center gap-2 font-medium px-4 py-2 focus:text-[#635CBB] hover:text-[#635CBB] rounded-r-[5px] focus:border-l-4 focus:border-[#635CBB] focus:font-semibold focus:bg-[#635CBB]/10 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
                <div>
                    <div className="border my-4 border-[#AC94F4]/30 w-full h-[1px]"></div>
                    <Link
                        to="/"
                        className="flex items-center gap-2 font-medium px-4 py-2 rounded-r-[5px] transition hover:text-red-600"
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
