import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../services/axios";
import toast from "react-hot-toast";
import StockCard from "../../../frontend/src/app/components/StockCard";

const Watchlist = () => {

  const user = useSelector(state => state.user.user);

  const [watchlistArray, setWatchlistArray] = useState([]);

  useEffect(() => {
    const fetchwatchlist = async () => {
      try {
        // Watchlist is intentionally disabled silently
        // const res = await axiosInstance.get("/watchlist");
      } catch (error) {
        // toast.error(error.message || "Watchlist not found.");
      }
    };


    if (user) {
      fetchwatchlist();
    }

  }, [user]);

  return (
    <div className="bg-white dark:bg-[#1e1e2d] rounded-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors duration-200 min-h-[60vh]">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Your Watchlist</h1>

      {!user ? (
        <div className="flex flex-col items-center justify-center h-full py-16 space-y-4">
          <p className="text-gray-600 dark:text-gray-400 text-lg">You must be logged in to view your Watchlist.</p>
          <Link
            to="/login"
            className="px-8 py-3 bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold rounded-lg transition-colors shadow-sm"
          >
            Sign in to continue
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400 mb-6">Keep an eye on your favorite stocks.</p>

          <div className="space-y-4">
            {watchlistArray && watchlistArray.length > 0 ? (
              watchlistArray.map((item) => (
                <StockCard key={item._id} stock={item} />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">Your watchlist is currently empty.</p>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default Watchlist;
