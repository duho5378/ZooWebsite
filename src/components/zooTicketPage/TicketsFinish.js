import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { TbCalendarCheck } from 'react-icons/tb';
import { IoRemoveOutline } from 'react-icons/io5';
import { TiTicket } from 'react-icons/ti';
import { TbBasketDiscount } from 'react-icons/tb';
import { FaCartArrowDown } from 'react-icons/fa6';
import { LuCheckCircle } from 'react-icons/lu';import Navbar from '../zooAnimalPage/Navbar/Navbar';
import Snowfall from 'react-snowfall';
import './TicketsFinish.css'


const TicketsFinish = () => {
    const location = useLocation();
    const updatedDataString = location.state?.data || 'No data updated'; // Lấy dữ liệu từ state
    const updatedDataArray = updatedDataString.split('==');
    const [snowFlakeActive, setSnowFlakeActive] = useState(false);

    const showSnowFlake = () => {
        setSnowFlakeActive(!snowFlakeActive);
      };

  return (
    <div className='ticketsFinishPage'>
    {snowFlakeActive && <Snowfall color="white" snowflakeCount={100} style={{ zIndex: 1000 }} />}
      <Navbar showSnowFlake={showSnowFlake}/>
      <h1>Online Booking</h1>
      
      <div className='calendarProgress'>
        <TbCalendarCheck size={40} className='bookingIcon2'/>
        <IoRemoveOutline size={40} className='bookingIcon2'/>
        <TiTicket size={40} className='bookingIcon2'/>
        <IoRemoveOutline size={40} className='bookingIcon2'/>
        <TbBasketDiscount size={40} className='bookingIcon2'/>
        <IoRemoveOutline size={40} className='bookingIcon2'/>
        <FaCartArrowDown size={40} className='bookingIcon2'/>
        <IoRemoveOutline size={40} className='bookingIcon1'/>
        <LuCheckCircle size={40} className='bookingIcon1'/>
      </div>
      <p className='calendarP'><span>STEP 5:</span> Your purchase has completed</p>
      <p className='calendarP'>Please save it inside your phone !!</p>

    <img src='/paid.png' className='paidFinish'></img>
    <div className='ticketsFinishDetail'>
        <h1>ZooLander</h1>
        <p className='TFDp'>Visit ticket</p>
    {updatedDataString !== 'No data updated' ? (
        updatedDataArray.map((item, index) => {
          const itemParts = item.split(': ');
          return (
            <div key={index} className='checkFinishDetail'>
              {itemParts.map((part, partIndex) => (
                <p key={partIndex}>{part}</p>
              ))}
            </div>
          );
        })
      ) : (
        <p>No updated data received</p>
      )}
    </div>

    </div>
  )
}

export default TicketsFinish