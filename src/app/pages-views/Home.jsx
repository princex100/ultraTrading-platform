import SearchBar from '../../../frontend/src/app/components/SearchBar';
import Filter from '../../../frontend/src/app/components/Filter';
import StockCard from '../../../frontend/src/app/components/StockCard';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import axiosInstance from '../services/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setStocks } from '../redux/stocksclice';



const Home = () => {
  const stocks = useSelector((state) => state.stock.stocks);




  return (
    <div className="space-y-6">

      <div className="bg-white dark:bg-[#1e1e2d] rounded-lg border border-gray-200 dark:border-gray-800 p-4 transition-colors duration-200">

        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Market Overview</h1>

        <div className="flex items-center space-x-4">
          <SearchBar />
          <Filter />
        </div>

      </div>

      <div className="space-y-4">

        {stocks && stocks.length > 0 ? (

          stocks.map(stock => (
            <StockCard key={stock._id} stock={stock} />
          ))

        ) : (

          <p className="text-gray-500 dark:text-gray-400 text-center py-4">Waiting for live market data...</p>

        )}

      </div>

    </div>
  );

};


export default Home;
