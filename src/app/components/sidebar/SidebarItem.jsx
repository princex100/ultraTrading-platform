import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon: Icon, label, to }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => {
                if (isActive) {
                    return "flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-[#2b2b40] text-blue-700 dark:text-blue-400 font-semibold border-l-4 border-blue-700 dark:border-blue-500 transition-colors duration-200";
                }
                
                return "flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#1e1e2d] text-gray-500 dark:text-gray-400 font-normal hover:bg-gray-100 dark:hover:bg-[#2a2a3b] border-l-4 border-transparent transition-colors duration-200";
            }}
        >
            
            <Icon size={18} />
            
            <span className="text-sm">
                {label}
            </span>

        </NavLink>
    );
};

export default SidebarItem;
