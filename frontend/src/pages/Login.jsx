import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../services/axios';
import { setUser } from '../redux/userSlice';
import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import axios from 'axios';
import { House } from 'lucide-react';
import { toggleTheme } from '../redux/themeSlice';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme?.theme || 'light');

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();


    setError(null);
    setLoading(true);


    const data = { email, password };


    try {
      const response = await axiosInstance.post("/users/login", data);


      if (response.data) {
        
        // Extract the user object securely. The API returns it in response.data.data
        dispatch(setUser(response.data.data));


        if (response.data.data?.accessToken) {
            localStorage.setItem('accessToken', JSON.stringify(response.data.data.accessToken));
            localStorage.setItem('refreshToken', JSON.stringify(response.data.data.refreshToken));
        }

      }


      navigate('/home');


    } catch (error) {

      setError(error.response?.data?.message || "An error occurred during login.");

    } finally {

      setLoading(false);

    }

  };


  const handleGoogleAuth = async(data) => {

    try {
      const googleToken=data.credential

      const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/google`,{
        token:googleToken
      })

      if(res.status===200){
        dispatch(setUser(res.data.data))
        localStorage.setItem("accessToken",res.data.data.accessToken)
        localStorage.setItem("refreshToken",res.data.data.refreshToken)
        toast.success("login successfull")
        navigate('/home')
      }
      else{
        toast.error("google login failed")
        setLoading(false)
      }
    } catch (error) {
      console.error("Google Auth Error:", error.response?.data || error.message || error);
      toast.error("google login failed")
      setLoading(false)
    }
  };

  return (


    <div className="min-h-screen flex transition-colors duration-200">

      <div className="absolute top-4 right-32 z-50">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1e1e2d] py-2 px-4 rounded-full shadow-sm border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#2a2a3b] transition-colors duration-200"
        >
          <House size={16} />
          Home
        </Link>
      </div>


      <div className="absolute top-4 right-8 z-50">
        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1e1e2d] py-2 px-4 rounded-full shadow-sm border border-gray-200 dark:border-gray-800 transition-colors duration-200">
            <input 
                type="checkbox" 
                checked={theme === 'dark'} 
                onChange={() => dispatch(toggleTheme())} 
                className="cursor-pointer"
            />
            {theme === 'light' ? 'Light' : 'Dark'}
        </label>
      </div>
      
      {/* Left side - Trading Information Placeholder */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0a66c2] to-[#004182] dark:from-[#1e1e2d] dark:to-[#12121c] flex-col items-center justify-center p-12 text-white">
        <div className="max-w-lg space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Welcome Back to Ultra Trading
          </h1>
          <p className="text-lg md:text-xl text-blue-100 dark:text-gray-300">
            Pick up where you left off. Monitor your portfolio, analyze charts, and execute your winning strategies.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 dark:bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-800">
              <h3 className="font-bold text-xl">Market Movers</h3>
              <p className="text-sm text-blue-100 dark:text-gray-400 mt-1">Track top gainers</p>
            </div>
            <div className="bg-white/10 dark:bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-800">
              <h3 className="font-bold text-xl">Live Alerts</h3>
              <p className="text-sm text-blue-100 dark:text-gray-400 mt-1">Stay updated</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex flex-1 flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#12121c]">
        <div className="max-w-md w-full space-y-6 bg-white dark:bg-[#1e1e2d] p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 transition-colors duration-200">
          
          <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Enter your details to access your dashboard
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center font-medium border border-red-100">
              {error}
            </div>
          )}

          <div className="mt-6">
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-[#2b2b40] rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-[#2b2b40] rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
                  placeholder="Enter password"
                />
              </div>

              <div className="flex items-center justify-end mb-2">
                <div className="text-sm">
                  <a href="#" className="font-medium text-[#0a66c2] hover:text-[#004182] dark:text-blue-500 dark:hover:text-blue-400">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-[#1e1e2d] text-gray-500">Or sign in with</span>
                </div>
              </div>

             <GoogleLogin
             onSuccess={(credentialResponse)=>handleGoogleAuth(credentialResponse)}
             onError={()=>{toast.error("google signin failed")}}
             />

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#0a66c2] hover:bg-[#004182] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed shadow-md transition-all"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : "Sign in"}
                </button>
              </div>
            </form>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              New to Ultra Trading?{' '}
              <Link to="/register" className="font-semibold text-[#0a66c2] dark:text-blue-500 hover:text-[#004182] dark:hover:text-blue-400 transition-colors">
                Join now
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );

};


export default Login;
