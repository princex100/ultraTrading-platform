import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChartCandlestick } from 'lucide-react';
import axiosInstance from '../services/axios';

const Holdings = () => {
  const user = useSelector((state) => state.user?.user);
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHoldings = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const res = await axiosInstance.get('/portfolio');
        if (res.data?.data?.holdings) {
          setHoldings(res.data.data.holdings);
        }
      } catch (err) {
        console.error('Holdings fetch error:', err);
        setError('Failed to load holdings.');
      } finally {
        setLoading(false);
      }
    };
    fetchHoldings();
  }, [user]);

  if (!user) {
    return (
      <div className="bg-white dark:bg-[#1e1e2d] rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <p className="text-gray-500 dark:text-gray-400 text-center">Please log in to view your holdings.</p>
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

  return (
    <div className="bg-white dark:bg-[#1e1e2d] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
        <ChartCandlestick className="text-blue-600 dark:text-blue-400" size={24} />
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Your Stock Holdings</h1>
      </div>

      {holdings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">You don't own any stocks yet.</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">Go to the Dashboard to buy your first stock!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                <th className="py-3 pr-4 font-semibold">Stock</th>
                <th className="py-3 pr-4 font-semibold">Quantity</th>
                <th className="py-3 pr-4 font-semibold">Live Price</th>
                <th className="py-3 font-semibold text-right">Current Value</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h) => (
                <tr key={h.holdingId} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
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
  );
};

export default Holdings;
