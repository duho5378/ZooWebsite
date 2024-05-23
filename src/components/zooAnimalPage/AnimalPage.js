import './AnimalPage.css';
import React, { useState } from 'react';
import Header from './Header/Header';
import AnimalDisplay from './AnimalDisplay/AnimalDisplay';
import Footer from './Footer/Footer';
import Snowfall from 'react-snowfall';
import Navbar from './Navbar/Navbar';

function AnimalPage() {
  const [snowFlakeActive, setSnowFlakeActive] = useState(false);

  const showSnowFlake = () => {
    setSnowFlakeActive(!snowFlakeActive);
  };

  return (
    <div className="App">
      {snowFlakeActive && <Snowfall color="white" snowflakeCount={500} style={{ zIndex: 1000 }} />}
      <Navbar showSnowFlake={showSnowFlake}/>

      <Header/>
      <AnimalDisplay/>
      <Footer/>
    </div>
  );
}

export default AnimalPage;