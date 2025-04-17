import { NavLink } from "react-router";
import { MdKeyboardArrowRight } from "react-icons/md";

export const Breadcrumb = ({ url }) => {
    // Improved parsing to handle both slash and underscore separators more elegantly
    const parts = url.split(/[_/]/).filter(Boolean);

    return (
        <nav
            className="flex items-center py-2 text-sm font-medium text-gray-500 overflow-x-auto no-scrollbar"
            aria-label="Breadcrumb"
        >
            <div className="flex items-center flex-nowrap space-x-1">
                {parts.map((part, index) => {
                    const path = "/" + parts.slice(0, index + 1).join("/");
                    const isLast = index === parts.length - 1;

                    // Format the part name more nicely - capitalize words rather than all uppercase
                    const formattedPart = part
                        .replace(/-/g, " ")
                        .split(" ")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(" ");

                    return (
                        <div key={index} className="flex items-center">
                            <NavLink
                                to={path}
                                className={`transition-colors duration-200 bg-gray-200 px-2 py-[0.10rem] rounded ${isLast
                                    ? "text-indigo-800 font-semibold cursor-default pointer-events-none"
                                    : "text-gray-600 hover:text-indigo-600"
                                    }`}
                                aria-current={isLast ? "page" : undefined}
                            >
                                {formattedPart}
                            </NavLink>

                            {!isLast && (
                                <span className="text-gray-400 mx-1"><MdKeyboardArrowRight /></span>
                            )}
                        </div>
                    );
                })}
            </div>
        </nav>
    );
};