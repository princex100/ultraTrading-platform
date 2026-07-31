import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 transition-colors duration-200">
        Trading Made Simpler
      </h1>
      
      <p className="max-w-[600px] text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 transition-colors duration-200">
        Practice trading with virtual money, learn investing through realistic market simulations, and build confidence before entering the real stock market.
      </p>

      <button 
        onClick={() => navigate('/home')}
        className="px-8 py-4 bg-[#0a66c2] hover:bg-[#004182] text-white text-lg font-medium rounded-full transition-colors shadow-md"
      >
        Get Started &rarr;
      </button>

    </div>
  );
};

export default Hero;
