import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axios';
import { Loader2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setUser } from '../redux/userSlice';

const Stock = () => {

  const stocks=useSelector((state)=>state.stock.stocks);
  const user=useSelector((state)=>state.user.user);

  const { id: stockId } = useParams(); // Using stockId since the route param is named symbol
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buyQty, setBuyQty] = useState(1);
  const [buying, setBuying] = useState(false);

  const navigate=useNavigate()
  const dispatch = useDispatch();


  const handlewatchlist=async()=>{
    // Watchlist is intentionally disabled silently
    return;
  }



  useEffect(() => {

    const fetchStock = async () => {

      try {
        
        const stock=stocks.find((stock)=>stock._id===stockId);
        setStock(stock);

      } catch (err) {

        console.error(err);
        setError('Failed to load stock data');

      } finally {

        setLoading(false);

      }

    };


    fetchStock();

  }, [stockId,stocks]);



  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-[#0a66c2] animate-spin" />
      </div>
    );
  }



  if (error || !stock) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg border border-red-200 dark:border-red-800">
        {error || 'Stock not found.'}
      </div>
    );
  }



  const isPositive = !stock.priceDown; // Or we can use stock.percentageChange >= 0



  return (

    <div className="space-y-6">
      
      {/* Header Card */}
      <div className="bg-white dark:bg-[#1e1e2d] rounded-xl border border-gray-200 dark:border-gray-800 p-6 transition-colors duration-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        <div>

          <div className="flex items-center gap-3 mb-2">

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{stock.symbol}</h1>
            
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full">
              {stock.sector}
            </span>

          </div>

          <h2 className="text-lg text-gray-500 dark:text-gray-400">{stock.name}</h2>

        </div>


        <div className="flex flex-col items-start md:items-end">

          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            ₹{stock.currentPrice.toFixed(2)}
          </p>

          <p className={`text-lg font-semibold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {isPositive ? '+' : ''}{stock.percentageChange.toFixed(2)}%
          </p>

        </div>

      </div>


      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">

        <div className="flex items-center gap-3 flex-1">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">Qty:</label>
          <input
            type="number"
            min="1"
            value={buyQty}
            onChange={(e) => setBuyQty(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 px-3 py-2 bg-white dark:bg-[#252536] border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white text-center focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={() => {
              // Buy is intentionally disabled silently
            }}
            className="flex-1 md:flex-none px-8 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors shadow-sm"
          >
            Buy {stock.symbol}
          </button>
        </div>

        <button onClick={()=>handlewatchlist()} className="flex-1 md:flex-none px-8 py-3 bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold rounded-lg transition-colors shadow-sm">
          Add to Watchlist
        </button>

      </div>


      {/* Details Grid Card */}
      <div className="bg-white dark:bg-[#1e1e2d] rounded-xl border border-gray-200 dark:border-gray-800 p-6 transition-colors duration-200 shadow-sm">
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
          Market Statistics
        </h3>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Day High</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">₹{stock.high.toFixed(2)}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Day Low</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">₹{stock.low.toFixed(2)}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Market Cap</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">₹{(stock.marketCap / 10000000).toFixed(2)} Cr</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Volume (Shares)</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{stock.numberofshares.toLocaleString()}</p>
          </div>

        </div>

      </div>


      {/* Description Card */}
      <div className="bg-white dark:bg-[#1e1e2d] rounded-xl border border-gray-200 dark:border-gray-800 p-6 transition-colors duration-200 shadow-sm">
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">About {stock.name}</h3>
        
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
          {stock.description}
        </p>

      </div>

    </div>

  );
};

export default Stock;
