import LandingNavbar from '../components/landing/LandingNavbar';
import Hero from '../components/landing/Hero';
import Reviews from '../components/landing/Reviews';
import LandingFooter from '../components/landing/LandingFooter';
import { Outlet } from 'react-router-dom';

const LandingPage = () => {

  // const user=useSelector((state)=>state.user);
  
  return (
    <div className="min-h-screen bg-[#f3f2ef] dark:bg-[#111111] flex flex-col font-sans relative overflow-hidden transition-colors duration-200">


      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <LandingNavbar />
        
        <main className="flex-grow flex flex-col items-center pt-8 md:pt-16">
          <Hero />
          <Outlet/>
          {/* <Reviews /> */}
        </main>
        
        <LandingFooter />
      </div>
      
    </div>
  );
};

export default LandingPage;

