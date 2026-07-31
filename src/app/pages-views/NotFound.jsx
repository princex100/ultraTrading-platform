import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center bg-white dark:bg-[#1e1e2d] rounded-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors duration-200">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
      <Link to="/home" className="px-6 py-2 bg-[#0a66c2] text-white font-semibold rounded-full hover:bg-[#004182] transition-colors">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
