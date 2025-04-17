import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { RxDashboard } from "react-icons/rx";
import moses_horinzontal from '../../../assets/moses_horizontal.png';
import { FaRegUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { Button, Modal } from "antd"
import { useAuthStore } from "../../../stores/useAuthStore";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [openLogoutModal, setOpenLogoutModal] = useState(false)
    const logout = useAuthStore()?.logout
    const navigate = useNavigate()

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

    const handleLogout = () => {
        setOpenLogoutModal(true)
        setIsOpen(false)
    }

    return (
        <>
            <Modal
                footer={null}
                onClose={() => setOpenLogoutModal(false)}
                onCancel={() => setOpenLogoutModal(false)}
                open={openLogoutModal}
                centered
                width={400}
                closeIcon={
                    <IoCloseOutline className="text-gray-500 hover:text-gray-700" />
                }
            >
                <div className="py-6 px-2 flex flex-col items-center">
                    <AiOutlineExclamationCircle className="text-yellow-500 text-4xl mb-4" />

                    <h2 className="text-xl font-medium text-center mb-6">
                        Are you sure you want to logout?
                        <p className="text-sm">
                            All unsaved changes will be lost!
                        </p>
                    </h2>

                    <div className="w-full flex justify-center gap-4 mt-2">
                        <Button
                            onClick={() => setOpenLogoutModal(false)}
                            className="px-6"
                        >
                            Cancel
                        </Button>

                        <Button
                            danger
                            type="primary"
                            onClick={() => {
                                logout();
                                navigate("/");
                            }}
                            className="px-6"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Toggle button for mobile */}
            <div
                className={`fixed md:hidden top-4 z-[2000] transition-all duration-300 ${isOpen ? "left-64" : "left-4"}`}
            >
                <button
                    className="p-2 bg-white rounded-full shadow-md z-[2000] focus:outline-none"
                    onClick={toggleSidebar}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Main sidebar */}
            <div
                className={`fixed md:sticky top-0 left-0 h-full shadow-md w-64 p-4 transition-transform transform flex flex-col bg-white/40 z-[2000] backdrop-blur-3xl
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
                    <button
                        className="flex items-center gap-2 font-medium px-4 py-2 rounded-r-[5px] transition hover:bg-gray-100"
                        onClick={handleLogout}
                    >
                        <IoLogOutOutline size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;