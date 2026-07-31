import { Link } from 'react-router-dom';

const StockCard = ({ stock }) => {

  const isPositive = stock.percentageChange >= 0;

  

  return (
    <div className="bg-white dark:bg-[#1e1e2d] rounded-lg border border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between hover:shadow-sm transition-shadow duration-200">
      
      <div className="flex items-center space-x-4">
        
        <div className="w-10 h-10 bg-gray-100 dark:bg-[#2b2b40] rounded-full flex items-center justify-center font-bold text-gray-700 dark:text-gray-300">
          {stock.symbol[0]}
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{stock.symbol}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</p>
        </div>

      </div>
      
      <div className="text-right">
        
        <p className="font-semibold text-gray-900 dark:text-gray-100">₹{stock.currentPrice.toFixed(2)}</p>
        
        <p className={`text-xs font-semibold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {isPositive ? '+' : ''}{stock.percentageChange.toFixed(2)}%
        </p>

      </div>
      
      <div className="ml-4">
        <Link to={`/stock/${stock._id}`} className="px-4 py-1.5 border border-[#0a66c2] dark:border-blue-500 text-[#0a66c2] dark:text-blue-400 font-semibold rounded-full hover:bg-blue-50 dark:hover:bg-[#2a2a3b] transition-colors text-sm">
          Details
        </Link>
      </div>

    </div>
  );

};


export default StockCard;
