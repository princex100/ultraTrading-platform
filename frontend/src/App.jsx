import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';


// Pages
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Portfolio from './pages/Portfolio';
import Transactions from './pages/Transactions';
import Watchlist from './pages/Watchlist';
import Stock from './pages/Stock';
import About from './pages/About';
import Docs from './pages/Docs';
import NotFound from './pages/NotFound';
import Wallet from './pages/Wallet';
import Holdings from './pages/Holdings';
import {setStocks} from '../src/redux/stocksclice.js'
import Notification from './components/Notification';
// import { socket } from './services/socket.js';
import { io } from 'socket.io-client';

import axiosInstance from './services/axios';
import { setUser, logout } from './redux/userSlice';
import VerifyEmail from './pages/verify-email';



const socket = io('http://localhost:8000', {
    withCredentials: true,
});

function App() {


  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme?.theme || 'light');

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);


  useEffect(() => {

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

  }, [theme]);


  useEffect(() => {

      const fetchStocks = async () => {
  
          try {
  
              const res = await axiosInstance.get("/stocks");
  
  
              if (res.data?.data) {
                  dispatch(setStocks(res.data.data));
              } else {
                  dispatch(setStocks(res.data));
              }
  
          } catch (err) {
  
              console.log(err);
  
          }
  
      };
  
  
      fetchStocks();
      
  
     
  

    

    const fetchCurrentUser = async () => {

      try {
        const hasSavedSession = localStorage.getItem('accessToken') || localStorage.getItem('refreshToken');

        if (!hasSavedSession) {
          dispatch(logout());
          return;
        }

        const response = await axiosInstance.get('/users/current-user');
        const responseData = response.data;


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


 socket.on("stock", (data) => {
          dispatch(setStocks(data));
      });
  
  
      return () => {
          socket.off("stock");
      };
    



  }, []);


  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f2ef] dark:bg-[#111111] text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <p className="text-lg font-medium">Loading......</p>
      </div>
    );
  }


  
    // useEffect(() => {
  
       
    // }, [dispatch]);


  return (
    <>
      <Notification />
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
  
         <Route path='/verify-email' element={<VerifyEmail/>}/>

        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/stock/:id" element={<Stock />} />
          <Route path="/about" element={<About />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/wallet" element={<Wallet />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

export default App;
