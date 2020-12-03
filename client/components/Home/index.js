import React, { useState } from 'react';
import HeroSection from '../HeroSection';
import Navbar from '../Navbar/index.js';
import Sidebar from '../Sidebar';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* <Navbar /> */}
      <Sidebar isOpen={isOpen} toggle={toggle} />
      {/* <Navbar toggle={toggle} /> */}
      <HeroSection />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
