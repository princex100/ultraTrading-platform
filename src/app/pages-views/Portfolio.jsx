import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Wallet, TrendingUp, TrendingDown, PieChart, DollarSign } from 'lucide-react';
import axiosInstance from '../services/axios';

const Portfolio = () => {
  const user = useSelector((state) => state.user?.user);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const res = await axiosInstance.get('/portfolio');
        if (res.data?.data) {
          setPortfolio(res.data.data);
        }
      } catch (err) {
        console.error('Portfolio fetch error:', err);
        setError('Failed to load portfolio.');
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [user]);

  if (!user) {
    return (
      <div className="bg-white dark:bg-[#1e1e2d] rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <p className="text-gray-500 dark:text-gray-400 text-center">Please log in to view your portfolio.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#1e1e2d] rounded-lg border border-gray-200 dark:border-gray-800 p-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg border border-red-200 dark:border-red-800">
        {error}
      </div>
    );
  }

  const balance = portfolio?.virtualBalance ?? 0;
  const investmentValue = portfolio?.totalInvestmentValue ?? 0;
  const netWorth = portfolio?.totalNetWorth ?? 0;
  const holdings = portfolio?.holdings ?? [];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#1e1e2d] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">
            <Wallet size={16} /> Cash Balance
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white dark:bg-[#1e1e2d] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">
            <PieChart size={16} /> Invested Value
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{investmentValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white dark:bg-[#1e1e2d] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">
            <DollarSign size={16} /> Net Worth
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹{netWorth.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white dark:bg-[#1e1e2d] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Holdings</h2>
        {holdings.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">You don't own any stocks yet. Start trading!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                  <th className="py-3 pr-4 font-semibold">Stock</th>
                  <th className="py-3 pr-4 font-semibold">Qty</th>
                  <th className="py-3 pr-4 font-semibold">Live Price</th>
                  <th className="py-3 font-semibold text-right">Total Value</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((h) => (
                  <tr key={h.holdingId} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <td className="py-3 pr-4">
                      <p className="font-semibold text-gray-900 dark:text-white">{h.stock.symbol}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{h.stock.name}</p>
                    </td>
                    <td className="py-3 pr-4 text-gray-700 dark:text-gray-300 font-medium">{h.quantity}</td>
                    <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">₹{h.stock.currentPrice.toFixed(2)}</td>
                    <td className="py-3 text-right font-semibold text-gray-900 dark:text-white">₹{h.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
