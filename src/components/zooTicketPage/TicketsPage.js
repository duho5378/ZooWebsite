import React, { useState } from 'react';
import { TbCalendarCheck } from 'react-icons/tb';
import { IoRemoveOutline } from 'react-icons/io5';
import { TiTicket } from 'react-icons/ti';
import { TbBasketDiscount } from 'react-icons/tb';
import { FaCartArrowDown } from 'react-icons/fa6';
import { LuCheckCircle } from 'react-icons/lu';import Navbar from '../zooAnimalPage/Navbar/Navbar';
import Snowfall from 'react-snowfall';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import './TicketsPage.css'
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

  const TicketsPage = () => {
    const today = dayjs();
    const startDate = today.startOf('month');
    const endDate = today.add(1, 'month').endOf('month');
    const [snowFlakeActive, setSnowFlakeActive] = useState(false);
    const [selectedDate, setSelectedDate] = useState(today);
    const navigate = useNavigate();

    const showSnowFlake = () => {
      setSnowFlakeActive(!snowFlakeActive);
    };

    const handleDateChange = (newDate) => {
      setSelectedDate(newDate);
      const formattedDate = newDate?.format('YYYY-MM-DD'); // Kiểm tra null trước khi format
  
      // Chuyển hướng sang trang 'next' và truyền thông tin ngày đã chọn
      if (formattedDate) {
        navigate(`/tickets/type/${formattedDate}`);
      }
    };

  return (
    <div className='calendarPage'>
      {snowFlakeActive && <Snowfall color="white" snowflakeCount={100} style={{ zIndex: 1000 }} />}
      <Navbar showSnowFlake={showSnowFlake}/>
      <h1>Online Booking</h1>
      
      <div className='calendarProgress'>
        <TbCalendarCheck size={40} className='bookingIcon1'/>
        <IoRemoveOutline size={40} className='bookingIcon1'/>
        <TiTicket size={40} className='bookingIcon2'/>
        <IoRemoveOutline size={40} className='bookingIcon2'/>
        <TbBasketDiscount size={40} className='bookingIcon2'/>
        <IoRemoveOutline size={40} className='bookingIcon2'/>
        <FaCartArrowDown size={40} className='bookingIcon2'/>
        <IoRemoveOutline size={40} className='bookingIcon2'/>
        <LuCheckCircle size={40} className='bookingIcon2'/>
      </div>
      <p className='calendarP'><span>STEP 1:</span> Pick a day for your marvelous trip to our Zoo</p>

      <div className='calendar'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            orientation="landscape"
            minDate={startDate}
            maxDate={endDate}
            renderInput={() => <input readOnly />}
            value={selectedDate}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
      </div>

    </div>
  );
}

export default TicketsPage;
