import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import { House } from 'lucide-react';


const AuthLayout = () => {

  const dispatch = useDispatch();


  return (
    <div className="relative min-h-screen bg-[#f3f2ef] dark:bg-[#111111] text-gray-900 dark:text-gray-100 transition-colors duration-200 flex flex-col">
      
      


      <Outlet />

    </div>
  );
};

export default AuthLayout;
