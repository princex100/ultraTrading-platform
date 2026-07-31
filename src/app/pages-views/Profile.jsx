import React from 'react';
import { useSelector } from 'react-redux';
import { User, Wallet, TrendingUp, BarChart2, Award } from 'lucide-react';

const Profile = () => {
  const user = useSelector((state) => state.user?.user);

  // Fallback data if user is not fully loaded or missing fields
  const name = user?.name || "Prince Sharma";
  const avatar = user?.avatar || null;
  const category = user?.catagory || "Beginner";
  const level = user?.level ? `Level ${user.level}` : "Trader";
  const description = user?.description || "Learning one trade at a time.";
  const balance = user?.balance !== undefined ? user.balance : 102500;
  
  // Dynamic data placeholders for future implementation
  const rank = "Gold Trader"; 
  const totalHoldings = 12; 
  const totalTrades = 45; 

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6">
      
      {/* Profile Header (Top Card) */}
      <div className="bg-white dark:bg-[#1e1e2d] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-colors duration-200">
        
        {/* Cover Photo / Banner */}
        <div className="h-32 sm:h-48 w-full bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-800 relative">
        </div>

        {/* Profile Info Section */}
        <div className="px-6 sm:px-8 pb-8 relative">
          
          {/* Avatar (Overlapping Banner) */}
          <div className="relative -mt-16 sm:-mt-20 mb-4 flex justify-between items-end">
            <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full border-4 border-white dark:border-[#1e1e2d] bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden shrink-0">
              {avatar ? (
                <img src={avatar} alt={name} className="h-full w-full object-cover" />
              ) : (
                <User size={64} className="text-gray-400 dark:text-gray-500" />
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="mt-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mt-1">
              {category} {level}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-3 italic">
              "{description}"
            </p>
          </div>

          <hr className="my-8 border-gray-200 dark:border-gray-800" />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            {/* Wallet Balance */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-1">
                <Wallet size={16} /> Wallet Balance
              </span>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                ₹{balance.toLocaleString()}
              </span>
            </div>

            {/* Current Rank */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-1">
                <Award size={16} /> Current Rank
              </span>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {rank}
              </span>
            </div>

            {/* Total Holdings */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-1">
                <TrendingUp size={16} /> Total Holdings
              </span>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {totalHoldings}
              </span>
            </div>

            {/* Total Trades */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-1">
                <BarChart2 size={16} /> Total Trades
              </span>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {totalTrades}
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
