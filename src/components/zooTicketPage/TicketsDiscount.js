import React, { useState, useEffect } from 'react';
import { TbCalendarCheck } from 'react-icons/tb';
import { IoRemoveOutline } from 'react-icons/io5';
import { TiTicket } from 'react-icons/ti';
import { TbBasketDiscount } from 'react-icons/tb';
import { FaCartArrowDown } from 'react-icons/fa6';
import { LuCheckCircle } from 'react-icons/lu';
import Navbar from '../zooAnimalPage/Navbar/Navbar';
import Snowfall from 'react-snowfall';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './TicketsDiscount.css';

const TicketsDiscount = () => {
  const location = useLocation();
  const receivedData = location.state?.ticketData || 'No data received';
  const [snowFlakeActive, setSnowFlakeActive] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userRank, setUserRank] = useState(null);
  const [sum, setSum] = useState(0);
  const navigate = useNavigate();

  const showSnowFlake = () => {
    setSnowFlakeActive(!snowFlakeActive);
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token && userInfo === null) {
      fetch(`http://localhost:3001/api/userInfo/${token}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setUserInfo(data.userInfo);
          } else {
            // Handle when user info cannot be retrieved from the server
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle error calling user info API
        });
    }
  }, [userInfo]); // Run only when userInfo is null

  useEffect(() => {
    if (userInfo !== null && userInfo.POINT !== null && userRank === null) {
      fetch(`http://localhost:3001/api/userRank/${userInfo.POINT}`)
        .then((rankResponse) => rankResponse.json())
        .then((rankData) => {
          if (rankData.success) {
            setUserRank(rankData.userRank);
          } else {
            // Handle when rank information cannot be retrieved from the server
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle error calling user rank API
        });
    }
  }, [userInfo, userRank]); // Run when userInfo or userRank is null

  useEffect(() => {
    if (userInfo && receivedData !== 'No data received' && sum === 0) {
      const li = receivedData.split(' ');
      const extractedSum = parseInt(li[li.length - 1], 10);
      setSum(extractedSum);
    }
  }, [userInfo, receivedData, sum]); // Run when userInfo, receivedData, or sum is 0

  const handleAgreeClick = () => {
    const discountedSum = calculateTotalWithDiscount();
    if (discountedSum !== 'N/A' && userRank && userRank[0]) {
      const updatedDiscount = `${userRank[0].URANK} discount: ${userRank[0].SALE}%`;
      const updatedData = receivedData.replace(/Sum: \d+/, `Your total: ${discountedSum}\n`) + updatedDiscount;
      navigate('/tickets/type/discount/checkList', { state: { updatedData } });
    }
  };

  const getPrice = () => {
    return sum;
  };

  const calculateTotalWithDiscount = () => {
    if (receivedData !== 'No data received' && userRank && userRank[0]) {
      const salePercentage = userRank[0].SALE;
      const discountedSum = sum - (sum * salePercentage) / 100;
      return discountedSum.toFixed(2);
    }
    return 'N/A';
  };

  return (
    <div className='ticketDiscountPage'>
      {snowFlakeActive && <Snowfall color='white' snowflakeCount={100} style={{ zIndex: 1000 }} />}
      <Navbar showSnowFlake={showSnowFlake} />
      <h1>Online Booking</h1>

      <div className='calendarProgress'>
        <TbCalendarCheck size={40} className='bookingIcon2' />
        <IoRemoveOutline size={40} className='bookingIcon2' />
        <TiTicket size={40} className='bookingIcon2' />
        <IoRemoveOutline size={40} className='bookingIcon1' />
        <TbBasketDiscount size={40} className='bookingIcon1' />
        <IoRemoveOutline size={40} className='bookingIcon1' />
        <FaCartArrowDown size={40} className='bookingIcon2' />
        <IoRemoveOutline size={40} className='bookingIcon2' />
        <LuCheckCircle size={40} className='bookingIcon2' />
      </div>
      <p className='calendarP'>
        <span>STEP 3:</span> Lets check your discount !!
      </p>

      {userInfo && (
        <div className='discountRank'>
          <p>Current points: {userInfo.POINT}</p>
          {userRank && (
            <div>
              <div>
                <p>Your rank is: {userRank[0].URANK}</p>
                <p>Sale: {userRank[0].SALE} %</p>
              </div>
              <div>
                <p>Your tickets price is: {getPrice()}</p>
                <p>Total: {calculateTotalWithDiscount()}</p>
              </div>
            </div>
          )}
        </div>
      )}
      <button onClick={handleAgreeClick} className='affordTickets1'>Next step</button>
    </div>
  );
};

export default TicketsDiscount;
