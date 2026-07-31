import { Link } from "react-router-dom";
import { House, Info, FileText } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/themeSlice";
import NavbarItem from "./NavbarItem";
import NotificationButton from "./NotificationButton";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
    const dispatch = useDispatch();
    const user=useSelector((state)=>state.user?.user);
    const theme = useSelector((state) => state.theme?.theme || 'light');

    return (
        <header className="sticky top-0 z-50 w-full h-[60px] bg-white dark:bg-[#1e1e2d] border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                
                {/* Left Section */}
                <div className="flex items-center h-full">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold text-blue-700 dark:text-blue-500 tracking-tight hidden sm:block">
                            Ultra Trading
                        </span>
                    </Link>
                </div>

                {/* Center Section */}
                <div className="hidden md:flex items-center h-full">
                    
                    <NavbarItem to="/home" label="Home" icon={House} />
                    
                    <NavbarItem to="/about" label="About" icon={Info} />
                    
                    <NavbarItem to="/docs" label="Docs" icon={FileText} />
                    
                </div>

                {/* Right Section */}
                <div className="flex items-center h-full gap-4">
                    
                   

                   {
                    user&& (
                        <>
                        <NotificationButton />
                    
                        <ProfileDropdown />
                        </>
                    )
                   }
                    {
              !user && 
              <Link 
              to="/login" 
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Sign in
            </Link>
            }
            {
              !user && 
              <Link 
              to="/register" 
              className="text-sm font-medium px-4 py-2 rounded-full border border-[#0a66c2] text-[#0a66c2] dark:border-blue-500 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              Join now
            </Link>
            }


                     {/* Simple Theme Checkbox */}
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                        <input 
                            type="checkbox" 
                            checked={theme === 'dark'} 
                            onChange={() => dispatch(toggleTheme())} 
                            className="cursor-pointer"
                        />
                        {theme === 'light' ? 'Light' : 'Dark'}
                    </label>
                    
                </div>
                
            </div>
            
        </header>
    );
};

export default Navbar;
