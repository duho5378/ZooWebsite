import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TbCalendarCheck } from 'react-icons/tb';
import { IoRemoveOutline } from 'react-icons/io5';
import { TiTicket } from 'react-icons/ti';
import { TbBasketDiscount } from 'react-icons/tb';
import { FaCartArrowDown } from 'react-icons/fa6';
import { LuCheckCircle } from 'react-icons/lu';
import Navbar from '../zooAnimalPage/Navbar/Navbar';
import Snowfall from 'react-snowfall';
import './TicketsType.css'


const TicketsType = () => {
  const [tickets, setTickets] = useState([]);
  const [snowFlakeActive, setSnowFlakeActive] = useState(false);
  const [count, setCount] = useState([]);
  const [sum, setSum] = useState(0);

  const navigate = useNavigate();
  const { date } = useParams();

  const showSnowFlake = () => {
    setSnowFlakeActive(!snowFlakeActive);
  };

  const handleIncrement = (index) => {
    // Tăng count cho phần tử tương ứng với index
    setCount((prevCount) => {
      const newCount = [...prevCount];
      newCount[index] = (newCount[index] || 0) + 1;
      return newCount;
    });
  };

  const handleDecrement = (index) => {
    setCount((prevCount) => {
      const newCount = [...prevCount];
      if (newCount[index] > 0) {
        newCount[index] -= 1;
      }
      return newCount;
    });
  };

  useEffect(() => {
    fetch('http://localhost:3001/api/tickets')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTickets(data.tickets);
          setCount(Array(data.tickets.length).fill(0));
        } else {
          console.error('Error fetching tickets:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching tickets:', error);
      });
  }, []);

  useEffect(() => {
    let total = 0;
    tickets.forEach((ticket, index) => {
      total += ticket.PRICE * (count[index] || 0); // Tính tổng theo count tương ứng
    });
    setSum(total);
  }, [tickets, count]); // Tính lại tổng khi tickets hoặc count thay đổi

  const handleAgree = () => {
    let dataToSend = `Date: ${date}\n`;

    tickets.forEach((ticket, index) => {
      if (count[index] > 0) {
        dataToSend += `${ticket.AGE} ${ticket.TYPE} ticket: ${count[index]}\n`;
      }
    });

    dataToSend += `Sum: ${sum}`;

    // Chuyển hướng với dữ liệu cần gửi đi
    navigate('/tickets/type/discount', { state: { ticketData: dataToSend } });
  };

  return (
    <div className='ticketsTypePage'>
      {snowFlakeActive && <Snowfall color="white" snowflakeCount={100} style={{ zIndex: 1000 }} />}
      <Navbar showSnowFlake={showSnowFlake}/>
      <h1>Online Booking</h1>
      
      <div className='calendarProgress'>
        <TbCalendarCheck size={40} className='bookingIcon2'/>
        <IoRemoveOutline size={40} className='bookingIcon1'/>
        <TiTicket size={40} className='bookingIcon1'/>
        <IoRemoveOutline size={40} className='bookingIcon1'/>
        <TbBasketDiscount size={40} className='bookingIcon2'/>
        <IoRemoveOutline size={40} className='bookingIcon2'/>
        <FaCartArrowDown size={40} className='bookingIcon2'/>
        <IoRemoveOutline size={40} className='bookingIcon2'/>
        <LuCheckCircle size={40} className='bookingIcon2'/>
      </div>
      <p className='calendarP'><span>STEP 2:</span> Choose your tickets</p>

      <div className='TicketTypeDisplay'>
        {tickets.map((ticket, index) => (
          <div key={ticket.ID} className='TicketTypeDisplayDetail'>
            <p className='TTDD1'>{ticket.AGE}</p>
            <p className='TTDD2'>{ticket.TYPE} tickets :</p>
            <p className='TTDD3'>{ticket.PRICE}$</p>
            <button onClick={() => handleDecrement(index)}> - </button>
            <button onClick={() => handleIncrement(index)}> + </button>
            <p className='TTDD4'>Quantity: {count[index]}</p>
          </div>
        ))}
      </div>

      <p>Total Sum: {sum} $</p>
      <button className='agreedTicket' onClick={handleAgree}>Agree</button>
    </div>
  )
}

export default TicketsType