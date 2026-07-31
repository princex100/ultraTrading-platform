import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import axiosInstance from '../../services/axios';

const Transactions = () => {
  const user = useSelector((state) => state.user?.user);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const res = await axiosInstance.get('/transactions/history');
        if (res.data?.transactions) {
          setTransactions(res.data.transactions);
        }
      } catch (err) {
        console.error('Transactions fetch error:', err);
        setError('Failed to load transactions.');
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [user]);

  if (!user) {
    return (
      <div className="bg-white dark:bg-[#1e1e2d] rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <p className="text-gray-500 dark:text-gray-400 text-center">Please log in to view your transaction history.</p>
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
      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Transaction History</h1>

      {transactions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">No transactions yet. Start trading to see your history!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                <th className="py-3 pr-4 font-semibold">Type</th>
                <th className="py-3 pr-4 font-semibold">Stock</th>
                <th className="py-3 pr-4 font-semibold">Qty</th>
                <th className="py-3 pr-4 font-semibold">Price</th>
                <th className="py-3 pr-4 font-semibold text-right">Total</th>
                <th className="py-3 font-semibold text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => {
                const isBuy = tx.type === 'BUY';
                const stock = tx.stockId;
                const total = tx.price * tx.quantity;
                const date = new Date(tx.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'short', year: 'numeric'
                });
                const time = new Date(tx.createdAt).toLocaleTimeString('en-IN', {
                  hour: '2-digit', minute: '2-digit'
                });

                return (
                  <tr key={tx._id} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <td className="py-3 pr-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${isBuy
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        }`}>
                        {isBuy ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <p className="font-semibold text-gray-900 dark:text-white">{stock?.symbol || '—'}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{stock?.name || ''}</p>
                    </td>
                    <td className="py-3 pr-4 text-gray-700 dark:text-gray-300 font-medium">{tx.quantity}</td>
                    <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">₹{tx.price.toFixed(2)}</td>
                    <td className="py-3 pr-4 text-right font-semibold text-gray-900 dark:text-white">₹{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="py-3 text-right text-gray-500 dark:text-gray-400 text-sm">
                      <p>{date}</p>
                      <p className="text-xs">{time}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
