import './HomePage.css';
import React, { useState } from 'react';
import Animal from './Animal/Animal';
import Features from './Feature/Features';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import New from './New/New';
import Tickets from './Tickets/Tickets';
import Snowfall from 'react-snowfall';
import HomeSlider from './HomeSlider/HomeSlider';

function HomePage() {
  const [snowFlakeActive, setSnowFlakeActive] = useState(false);

  const showSnowFlake = () => {
    setSnowFlakeActive(!snowFlakeActive);
  };

  return (
    <div className="snowfall-wrapper">
      {snowFlakeActive && <Snowfall color="white" snowflakeCount={500} style={{ zIndex: 1000 }} />}
      <Header showSnowFlake={showSnowFlake} />
      <Features />
      <HomeSlider/>
      <New />
      <Animal/>
      <Footer />
    </div>
  );
}

export default HomePage;
