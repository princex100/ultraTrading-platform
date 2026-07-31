import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/themeSlice';

const LandingNavbar = () => {
  const dispatch = useDispatch();
  const user=useSelector((state)=>state.user?.user)
  const theme = useSelector((state) => state.theme?.theme || 'light');


  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#1e1e2d]/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="text-xl font-bold text-[#0a66c2] dark:text-blue-500 tracking-tight">
                Ultra Trading
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            
            <Link to="/about" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              About
            </Link>
            <Link to="/docs" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Docs
            </Link>
            {/* <Link to="reviews" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Reviews
            </Link> */}
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 mr-4">
                <input 
                    type="checkbox" 
                    checked={theme === 'dark'} 
                    onChange={() => dispatch(toggleTheme())} 
                    className="cursor-pointer"
                />
                {theme === 'light' ? 'Light' : 'Dark'}
            </label>

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
          </div>

        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
