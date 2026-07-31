import LandingNavbar from '../../../frontend/src/app/components/landing/LandingNavbar';
import Hero from '../../../frontend/src/app/components/landing/Hero';
import Reviews from '../../../frontend/src/app/components/landing/Reviews';
import LandingFooter from '../../../frontend/src/app/components/landing/LandingFooter';
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
          <Outlet />
          {/* <Reviews /> */}
        </main>

        <LandingFooter />
      </div>

    </div>
  );
};

export default LandingPage;

