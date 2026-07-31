import { Link, useLocation } from "react-router-dom";
import { 
    House, 
    BriefcaseBusiness, 
    ChartCandlestick, 
    Bookmark, 
    ArrowLeftRight, 
    Wallet, 
    Settings 
} from "lucide-react";

const SubNavbar = () => {
    const location = useLocation();

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
        <div className="w-full flex justify-center sticky top-[60px] z-40 bg-transparent mb-[-20px]">
            <div className="bg-white dark:bg-[#1e1e2d] border-b border-l border-r border-gray-200 dark:border-gray-800 shadow-md rounded-b-xl px-1">
                <nav className="flex items-center gap-1 overflow-x-auto custom-scrollbar py-1">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.to;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.label}
                            to={item.to}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                                isActive 
                                    ? 'text-blue-600 dark:text-blue-400' 
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                        >
                            <Icon size={14} />
                            {item.label}
                        </Link>
                    );
                })}
                </nav>
            </div>
        </div>
    );
};

export default SubNavbar;
