import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axiosInstance from '../services/axios';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';


const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    
    e.preventDefault();

    setError(null);
    setMsg(null);
    setLoading(true);


    try {

      const res = await axiosInstance.post("/users/register", {
        name,
        email,
        phone,
        password
      });


      if (res.data) {
        setMsg(res.data.message);
        // Optionally navigate to login after a delay
        // setTimeout(() => navigate('/login'), 2000);
      }

    } catch (err) {

      setError(err.response?.data?.message || "Failed to register");

    } finally {

      setLoading(false);

    }

  };


  const handleGoogleAuth = async(data) => {
    // Placeholder for Google OAuth logic

    const googleToken=data.credential

    const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/google`,{
      token:googleToken
    })

    if(res){
      dispatch(res.data.user)
      toast.success("login successfull")
    }
    else{
      toast.error("google authentication failed")
    }
    
  };

  return (
    <div className="min-h-screen flex transition-colors duration-200">
      
      {/* Left side - Trading Information Placeholder */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0a66c2] to-[#004182] dark:from-[#1e1e2d] dark:to-[#12121c] flex-col items-center justify-center p-12 text-white">
        <div className="max-w-lg space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Master the Markets with Ultra Trading
          </h1>
          <p className="text-lg md:text-xl text-blue-100 dark:text-gray-300">
            Experience real-time simulated trading. Build your strategies, analyze volume charts, and elevate your trading skills risk-free.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 dark:bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-800">
              <h3 className="font-bold text-xl">Real-time Data</h3>
              <p className="text-sm text-blue-100 dark:text-gray-400 mt-1">Live market updates</p>
            </div>
            <div className="bg-white/10 dark:bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-800">
              <h3 className="font-bold text-xl">Portfolio Tracking</h3>
              <p className="text-sm text-blue-100 dark:text-gray-400 mt-1">Monitor your performance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Registration Form */}
      <div className="flex flex-1 flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#12121c]">
        <div className="max-w-md w-full space-y-6 bg-white dark:bg-[#1e1e2d] p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 transition-colors duration-200">
          
          <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Create an account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Start your paper trading journey today
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center font-medium border border-red-100">
              {error}
            </div>
          )}

          {msg && (
            <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm text-center font-medium border border-green-100">
              {msg}
            </div>
          )}

          <div className="mt-6">
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-[#2b2b40] rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-[#2b2b40] rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                <input
                  name="phone"
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-[#2b2b40] rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-[#2b2b40] rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
                  placeholder="••••••••"
                />
              </div>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-[#1e1e2d] text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="w-full flex justify-center">
                <GoogleLogin
                  onSuccess={(data)=>{
                      handleGoogleAuth(data)
                  }}
                  onError={toast.error("google authentication failed")}
                />
              </div>

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
                      Creating account...
                    </span>
                  ) : "Create Account"}
                </button>
              </div>
            </form>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-[#0a66c2] dark:text-blue-500 hover:text-[#004182] dark:hover:text-blue-400 transition-colors">
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );

};


export default Register;
