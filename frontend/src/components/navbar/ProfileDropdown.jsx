import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, CircleHelp, LogOut, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/userSlice";


const ProfileDropdown = () => {
    
    const user = useSelector((state) => state.user?.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);


    // Close dropdown when clicking outside
    useEffect(() => {

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };


        document.addEventListener("mousedown", handleClickOutside);
        

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);


    const handleClick = () => {

        if (!user) {
            navigate('/login');
            return;
        } 
        
        setIsOpen(!isOpen);

    };


    const handleLogout = () => {

        setIsOpen(false);
        dispatch(logout());
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/');

    };


    return (
        <div className="relative h-full flex items-center" ref={dropdownRef}>
            
            <button 
                onClick={handleClick}
                className="flex flex-col items-center justify-center h-full px-2 text-gray-500 hover:text-gray-700"
            >
                <img 
                    src={user?.avatar ? user.avatar : "https://ui-avatars.com/api/?name=User&background=random"} 
                    alt="Profile" 
                    className="w-6 h-6 rounded-full object-cover"
                />
                
                <div className="flex items-center text-xs mt-1 gap-1">
                    <span>Me</span>
                    <ChevronDown size={12} />
                </div>
            </button>


            {isOpen && user && (
                <div className="absolute top-14 right-0 w-48 bg-white dark:bg-[#1e1e2d] border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm py-2 z-50 transition-colors duration-200">
                    
                    <Link 
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a3b] transition-colors"
                    >
                        <User size={18} className="text-gray-500 dark:text-gray-400" />
                        My Profile
                    </Link>
                    
                    <Link 
                        to="/help"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a3b] transition-colors"
                    >
                        <CircleHelp size={18} className="text-gray-500 dark:text-gray-400" />
                        Help
                    </Link>
                    
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a3b] text-left transition-colors"
                    >
                        <LogOut size={18} className="text-gray-500 dark:text-gray-400" />
                        Logout
                    </button>
                    
                </div>
            )}
            
        </div>
    );
};

export default ProfileDropdown;
