import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const ProfileCard = () => {

    const user = useSelector((state) => state.user?.user);


    if (!user) {
        return (
            <div className="bg-white dark:bg-[#1e1e2d] border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm flex flex-col items-center p-4 transition-colors duration-200">
                
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 mb-3 flex items-center justify-center text-gray-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                
                <h2 className="text-gray-900 dark:text-gray-100 font-semibold text-base mb-3 text-center">
                   Welcome to Ultra Trading
                </h2>
                
                <Link to="/login" className="w-full text-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-[#0a66c2] hover:bg-[#004182] transition-colors">
                    Login
                </Link>

            </div>
        );
    }


    return (
        <div className="bg-white dark:bg-[#1e1e2d] border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm flex flex-col items-center p-4 transition-colors duration-200">
            
            <img 
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.username || 'User'}&background=random`} 
                alt="Profile" 
                className="w-16 h-16 rounded-full object-cover mb-3"
            />
            
            <h2 className="text-gray-900 dark:text-gray-100 font-semibold text-base mb-1">
               {user.username || "Trader"}
            </h2>
            
            <span className="text-gray-500 dark:text-gray-400 text-xs mb-3">
                {user.category || "Standard Plan"}
            </span>
            
            <p className="text-gray-500 dark:text-gray-400 text-xs text-center leading-relaxed">
               {user.description || "No description"}
            </p>

        </div>
    );
};

export default ProfileCard;
