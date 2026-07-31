import { useState, useEffect } from 'react';
import { Image as ImageIcon, X, Newspaper } from 'lucide-react';
import axiosInstance from '../services/axios';

const NewsPanel = ({ onClose }) => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axiosInstance.get('/news/market');
        if (response.data.success) {
          setNewsItems(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch news", err);
        setError("Failed to load news. make sure you are conntected  to internet.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);


  

  useEffect(() => {
    if (newsItems.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
      }, 6000);
      return () => clearInterval(intervalId);
    }
  }, [newsItems]);

  
   useEffect(() => {
    setInterval(() => {
       const fetchNews = async () => {
      try {
        const response = await axiosInstance.get('/news/market');
        if (response.data.success) {
          setNewsItems(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch news", err);
        setError("Failed to load news. make sure you are conntected  to internet.");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
    }, 60000);
  }, []);



  // Extract values safely to handle different API shapes (Finnhub vs Standard)
  const title = newsItems[currentNewsIndex]?.title || newsItems[currentNewsIndex]?.headline;
  const description = newsItems[currentNewsIndex]?.description || newsItems[currentNewsIndex]?.summary;
  const imageUrl = newsItems[currentNewsIndex]?.urlToImage || newsItems[currentNewsIndex]?.image;
  const sourceName = newsItems[currentNewsIndex]?.source?.name || newsItems[currentNewsIndex]?.source;
  const url = newsItems[currentNewsIndex]?.url;
  


  let timeString = '';
  if (newsItems[currentNewsIndex]?.publishedAt) {

    timeString = new Date(newsItems[currentNewsIndex].publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (newsItems[currentNewsIndex]?.datetime) {
    
    timeString = new Date(newsItems[currentNewsIndex].datetime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="bg-white dark:bg-[#1e1e2d] rounded-xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4 shadow-sm transition-colors duration-200 flex-1 flex flex-col min-h-0">
      
      {/* Top Heading */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h2 className="font-bold text-base flex items-center gap-2 text-gray-900 dark:text-gray-100">
          Live Market News
          <span className="w-4 h-4 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-[10px] flex items-center justify-center font-bold">i</span>
        </h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Close News"
        >
          <X size={18} />
        </button>
      </div>
      
      {loading ? (
        <div className="flex-1 flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-sm text-center py-2 flex-1">{error}</p>
      ) : newsItems.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-2 flex-1">No news available.</p>
      ) : (
        <div 
          key={currentNewsIndex} 
          className="flex-1 flex flex-col justify-between overflow-y-auto custom-scrollbar animate-slide-left"
        >
          
          <div className="flex flex-col space-y-4">
            {/* Image */}
            <div className="w-full h-[190px] sm:h-[220px] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 relative">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt="News"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className={`absolute inset-0 flex flex-col items-center justify-center text-gray-400 ${imageUrl ? 'hidden' : 'flex'}`}>
                <ImageIcon size={32} />
              </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-col space-y-2 px-1">
              {/* Headline */}
              <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight">
                {title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-snug">
                {description}
              </p>
            </div>
          </div>

          {/* Bottom Section (Source, Time, Button) */}
          <div className="mt-4 flex flex-col space-y-4 flex-shrink-0 px-1">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{sourceName}</span>
              <span>{timeString}</span>
            </div>

            <button 
              onClick={() => window.open(url, "_blank")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center"
            >
              Visit Article &rarr;
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default NewsPanel;
