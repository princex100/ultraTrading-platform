const LandingFooter = () => {
  return (
    <footer className="w-full py-8 border-t border-gray-200 dark:border-gray-800 mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
          
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <span className="font-bold text-gray-700 dark:text-gray-300">Ultra Trading</span> 
            <span className="mx-2">&bull;</span>
            Practice. Learn. Grow.
          </div>

          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">Contact</a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
