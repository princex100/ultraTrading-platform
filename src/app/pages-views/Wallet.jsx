import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Wallet as WalletIcon, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../services/axios';
import { setUser } from '../redux/userSlice';

const Wallet = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const balance = user?.balance !== undefined ? user.balance : 0;

  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [loadingDeposit, setLoadingDeposit] = useState(false);
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);

  const handleDeposit = async (e) => {
    e.preventDefault();
    if (!depositAmount || Number(depositAmount) <= 0) {
      toast.error('Please enter a valid deposit amount');
      return;
    }
    
    setLoadingDeposit(true);
    try {
      const response = await axiosInstance.post('/transactions/deposit', {
        amount: Number(depositAmount)
      });
      
      if (response.data?.success) {
        toast.success(response.data.message);
        setDepositAmount('');
        // Update user state with new balance
        dispatch(setUser({ ...user, balance: response.data.newBalance }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Deposit failed');
    } finally {
      setLoadingDeposit(false);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!withdrawAmount || Number(withdrawAmount) <= 0) {
      toast.error('Please enter a valid withdrawal amount');
      return;
    }
    
    if (Number(withdrawAmount) > balance) {
      toast.error('Insufficient balance for withdrawal');
      return;
    }

    setLoadingWithdraw(true);
    try {
      const response = await axiosInstance.post('/transactions/withdraw', {
        amount: Number(withdrawAmount)
      });
      
      if (response.data?.success) {
        toast.success(response.data.message);
        setWithdrawAmount('');
        // Update user state with new balance
        dispatch(setUser({ ...user, balance: response.data.newBalance }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Withdrawal failed');
    } finally {
      setLoadingWithdraw(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6">
      <div className="bg-white dark:bg-[#1e1e2d] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden p-6 sm:p-8 transition-colors duration-200">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <WalletIcon className="text-blue-600 dark:text-blue-400" size={32} />
              Virtual Wallet
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Manage your simulated trading funds. Deposit or withdraw cash to test different strategies.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-4 text-center min-w-[200px]">
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Available Balance</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ₹{balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        <hr className="my-8 border-gray-200 dark:border-gray-800" />

        {/* Action sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Deposit Section */}
          <div className="bg-gray-50 dark:bg-[#1a1a24] p-6 rounded-xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-4 text-green-600 dark:text-green-500 font-semibold text-lg">
              <ArrowDownCircle size={24} /> Deposit Funds
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Add virtual funds to your trading account to increase your buying power.
            </p>
            <form onSubmit={handleDeposit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  min="1"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="e.g. 5000"
                  className="w-full px-4 py-2 bg-white dark:bg-[#252536] border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loadingDeposit}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {loadingDeposit ? 'Processing...' : 'Deposit Now'}
              </button>
            </form>
          </div>

          {/* Withdraw Section */}
          <div className="bg-gray-50 dark:bg-[#1a1a24] p-6 rounded-xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-4 text-red-600 dark:text-red-500 font-semibold text-lg">
              <ArrowUpCircle size={24} /> Withdraw Funds
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Remove virtual funds from your account. Cannot exceed your available balance.
            </p>
            <form onSubmit={handleWithdraw} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  min="1"
                  max={balance}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="e.g. 5000"
                  className="w-full px-4 py-2 bg-white dark:bg-[#252536] border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loadingWithdraw}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {loadingWithdraw ? 'Processing...' : 'Withdraw Now'}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Wallet;
