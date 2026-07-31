import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import { House } from 'lucide-react';
import { useEffect, useEffectEvent } from 'react';
import { logout, setUser } from '../redux/userSlice';
import axiosInstance from '../services/axios';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

let initialLoad = true;
const AuthLayout = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user)
  const first_visit = useSelector((state) => state.user?.first_visit)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {

      try {

        const response = await axiosInstance.get('/users/current-user', {
          withCredentials: true
        });
        if (!response.data.success) {
          dispatch(logout());
          return;
        }
        const responseData = response.data;

        console.log(response.data.data)
        if (responseData.success) {
          dispatch(setUser(responseData.data));
        }

      } catch (error) {

        dispatch(logout());
        if (error?.response?.status !== 401 && error?.message !== 'Session expired. Please login again.') {
          console.error(error);
        }

      } finally {

        setIsCheckingAuth(false);

      }
    }
    fetchCurrentUser();

  }, [])

  useEffect(() => {
    if (!isCheckingAuth) {
      initialLoad = false;
    }
  }, [isCheckingAuth])

  return (
    <div className="relative min-h-screen bg-[#f3f2ef] dark:bg-[#111111] text-gray-900 dark:text-gray-100 transition-colors duration-200 flex flex-col">

      {
        !user && isCheckingAuth && (
          <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-[#111111] z-50">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-lg text-gray-700 dark:text-gray-300">Loading...</p>
            </div>
          </div>
        )
      }
      {
        user && initialLoad &&
        (
          <Navigate to="/home" replace />
        )
      }


      <Outlet />

    </div>
  );
};

export default AuthLayout;
