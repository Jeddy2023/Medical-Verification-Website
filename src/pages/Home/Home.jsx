import React from 'react';
import Header from '../../Components/Header/Header';
import HeroSection from '../../Components/HeroSection/HeroSection';
import Services from '../../Components/Services/Services';
import Footer from '../../Components/Footer/Footer'


const Home = () => {
  return (
    <>
      <home>
        <Header />
        <HeroSection />
        <Services />
        <Footer />
      </home>
    </>
  );
};

export default Home;
