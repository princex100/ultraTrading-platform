import ProfileCard from "./ProfileCard";
import SidebarItem from "./SidebarItem";
import { 
    House, 
    BriefcaseBusiness, 
    ChartCandlestick, 
    Bookmark, 
    ArrowLeftRight, 
    Wallet, 
    Settings 
} from "lucide-react";


const Sidebar = () => {
    
    const navItems = [
        { label: "Dashboard", to: "/home", icon: House },
        { label: "Portfolio", to: "/portfolio", icon: BriefcaseBusiness },
        { label: "Holdings", to: "/holdings", icon: ChartCandlestick },
        { label: "Watchlist", to: "/watchlist", icon: Bookmark },
        { label: "Transactions", to: "/transactions", icon: ArrowLeftRight },
        { label: "Virtual Wallet", to: "/wallet", icon: Wallet },
        { label: "Settings", to: "/settings", icon: Settings },
    ];


    return (
        <aside className="w-full md:w-[260px] flex-shrink-0 sticky top-20 flex flex-col gap-[20px] self-start">
            
            <ProfileCard />

            <nav className="bg-white dark:bg-[#1e1e2d] border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm py-2 flex flex-col gap-[12px] transition-colors duration-200">
                {navItems.map((item) => (
                    <SidebarItem
                        key={item.label}
                        label={item.label}
                        to={item.to}
                        icon={item.icon}
                    />
                ))}
            </nav>

        </aside>
    );
};

export default Sidebar;


