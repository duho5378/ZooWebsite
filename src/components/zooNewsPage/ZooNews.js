import React, { useState } from 'react';
import Navbar from '../zooAnimalPage/Navbar/Navbar';
import Snowfall from 'react-snowfall';
import './ZooNews.css'
import Footer from '../zooAnimalPage/Footer/Footer';

const ZooNews = () => {
    const [snowFlakeActive, setSnowFlakeActive] = useState(false);

    const showSnowFlake = () => {
      setSnowFlakeActive(!snowFlakeActive);
    };

  return (
    <div className='ZN'>
    <div className='zooNews'>
        {snowFlakeActive && <Snowfall color="white" snowflakeCount={100} style={{ zIndex: 1000 }} />}
        <Navbar showSnowFlake={showSnowFlake}/>
        <h1>What is going in Zoolander ?</h1>
        <p className='zooNewP'>Keep up to date with the latest information happening at Zoolander. Please follow us to receive the best deals or promotions for yourself.</p>
        <div className='newDiscount'>
            <h1>Our pointing system</h1>
            <p>Here at Zoolander, we are offering a new point earning mechanism. Every time you buy a ticket online, the system will accumulate points for you. For every $10 in ticket money you will get 1 point. But don't worry, even if you buy a ticket for less than $10, we'll still give you 1 point for the transaction. Here are the rank levels and their incentives:</p>
            <div className='rankDiscountNew'>
                <div>
                <p>Iron_____________0 point______2% discount</p>
                <p>Cooper_________10 point______5% discount</p>
                <p>Gold____________30 point_____7% discount</p>
                <p>Platium_________50 point_____10% discount</p>
                <p>Diamond_______100 point____15% discount</p>
                <p>Adamantium___200 point___20% discount</p>
                </div>
            </div>
        </div>
        <div className='newDiscount'>
            <h1>Only on this Christmas and New Year Eve</h1>
            <h2>From 20/12/2023 to 20/01/2024</h2>
            <p>When you come to Zoolander, all souvenirs will be fully discounted by 20%. Furthermore, with each rank level you currently have, you can also receive even greater incentives:</p>
            <div className='rankDiscountNew'>
                <div>
                <p>Iron_____________5% more discount</p>
                <p>Cooper_________5% more discount and a free keychain</p>
                <p>Gold____________7% more discount and a free keychain</p>
                <p>Platium_________10% more discount and a free keychain</p>
                <p>Diamond_______10% more discount and a free Limited New Year keychain</p>
                <p>Adamantium___15% more discount and a free Limited New Year keychain</p>
                </div>
                <div>
                    <p className='comment'>Look at our little cutie keychain !!!</p>
                    <img src='keychain.png' alt='dragonKeychain'></img>
                </div>
                
            </div>
        </div>
        <div className='newDiscount'>
            <h1>Please welcome our new penguin friends in Zoolander</h1>
            <h2>From 30/01/2023</h2>
            <p>It is the famous African Penguin !!!!</p>
            <p>Meet the African Penguin, also known as the Jackass Penguin! These charming birds call the coasts of Southern Africa home. With their striking black and white feathers and unique braying sounds, they're a delight to see. Facing endangerment, these penguins find refuge in zoos, where efforts are underway to protect and preserve their fascinating species.</p>
            <p>Here are some pictures of our new friends: </p>
            <div className='rankPenguinNew'>
                <div>
                    <img src='penguin2.jpg'></img>
                </div>
                <div>
                    <img src='penguin3.jpg' alt='dragonKeychain'></img>
                </div>
                <div>
                    <img src='penguin4.png' alt='dragonKeychain'></img>
                </div>
            </div>
        </div>
        <div className='newDiscount'>
            <h1>About our show and tour schedule</h1>
            <h2>From 10/11/2023</h2>
            <p>You can now check schedules and times for shows and guided tours at Zoolander.</p>
            <p>Our show schedule is spread out over the days of the week with diverse content about all species in the zoo. On weekdays there will be 3 tours and talk shows, and on weekends there will only be 2 sessions.</p>
            <a href='/news/list'>Check it here</a>
        </div>
        
    </div>
        <Footer/>
    </div>
  )
}

export default ZooNews