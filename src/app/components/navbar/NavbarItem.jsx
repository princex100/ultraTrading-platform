import { NavLink } from "react-router-dom";

const NavbarItem = ({ icon: Icon, label, to }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => {
                if (isActive) {
                    return "flex flex-col items-center justify-center h-full px-4 border-b-2 border-transparent text-blue-700 font-medium";
                }
                
                return "flex flex-col items-center justify-center h-full px-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-normal";
            }}
        >
            
            <Icon size={20} />
            
            <span className="text-xs mt-1">
                {label}
            </span>
            
        </NavLink>
    );
};

export default NavbarItem;
