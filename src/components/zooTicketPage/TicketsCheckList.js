import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { TbCalendarCheck } from 'react-icons/tb';
import { IoRemoveOutline } from 'react-icons/io5';
import { TiTicket } from 'react-icons/ti';
import { TbBasketDiscount } from 'react-icons/tb';
import { FaCartArrowDown } from 'react-icons/fa6';
import { LuCheckCircle } from 'react-icons/lu';import Navbar from '../zooAnimalPage/Navbar/Navbar';
import Snowfall from 'react-snowfall';
import './TicketsCheckList.css'
import QRCode from 'react-qr-code'; // Import thư viện tạo mã QR
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const TicketsCheckList = () => {
    const location = useLocation();
    const updatedDataString = location.state?.updatedData || 'No data updated'; // Lấy dữ liệu từ state
    const updatedDataArray = updatedDataString.split('\n');
    const [snowFlakeActive, setSnowFlakeActive] = useState(false);
    const [randomQRValue, setRandomQRValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [confirmation, setConfirmation] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const navigate = useNavigate();
    const [point, setPoint] = useState(0)

  const showSnowFlake = () => {
    setSnowFlakeActive(!snowFlakeActive);
  };

  // Đảo chỗ hai giá trị cuối cùng
  if (updatedDataArray.length >= 2) {
    const lastIndex = updatedDataArray.length - 1;
    const temp = updatedDataArray[lastIndex];
    updatedDataArray[lastIndex] = updatedDataArray[lastIndex - 1];
    updatedDataArray[lastIndex - 1] = temp;
  }

  useEffect(() => {
    // Lấy giá trị cuối cùng từ mảng updatedDataArray
    const lastIndex = updatedDataArray.length - 1;
    const lastItem = updatedDataArray[lastIndex];
    const lastItemParts = lastItem.split(': ');
    const pointValue = Math.floor(parseInt(lastItemParts[1]) / 10); // Chia cho 10 và lấy phần nguyên
    const newValueForPoint = pointValue === 0 ? 1 : pointValue;
    setPoint(newValueForPoint); // Gán giá trị vào state 'point'
  }, [updatedDataArray]);



  const getLastPartValue = () => {
    if (point && confirmation) {
      return point;
    }
    return '';
  };

  const generateRandomQR = () => {
    const randomValue = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    setRandomQRValue(randomValue.toString());
  };

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const confirmQR = () => {
    if (inputValue === randomQRValue) {
      setConfirmation(true);
      if (getLastPartValue() !== '' && point !== 0) {
        // Gọi hàm cập nhật điểm ở đây
        const token = localStorage.getItem('userToken');
        if (token) {
          axios.put('http://localhost:3001/api/updateUserPoint', {
            phoneNumber: token,
            point: point
          })
          .then(response => {
            console.log('User point updated successfully');
            const data = updatedDataArray.slice(0, updatedDataArray.length - 2).join('==');
            navigate('/tickets/type/discount/checkList/finish', { state: { data } });
          })
          .catch(error => {
            console.error('Error updating user point:', error);
          });
        }
      }
    } else {
      setConfirmation(false);
    }
  };

  return (
    <div className='ticketCheckListPage'>
      {snowFlakeActive && <Snowfall color="white" snowflakeCount={100} style={{ zIndex: 1000 }} />}
      <Navbar showSnowFlake={showSnowFlake}/>
      <h1>Online Booking</h1>
      
      <div className='calendarProgress'>
        <TbCalendarCheck size={40} className='bookingIcon2'/>
        <IoRemoveOutline size={40} className='bookingIcon2'/>
        <TiTicket size={40} className='bookingIcon2'/>
        <IoRemoveOutline size={40} className='bookingIcon2'/>
        <TbBasketDiscount size={40} className='bookingIcon2'/>
        <IoRemoveOutline size={40} className='bookingIcon1'/>
        <FaCartArrowDown size={40} className='bookingIcon1'/>
        <IoRemoveOutline size={40} className='bookingIcon1'/>
        <LuCheckCircle size={40} className='bookingIcon2'/>
      </div>
      <p className='calendarP'><span>STEP 4:</span> Check again your list</p>

      {updatedDataString !== 'No data updated' ? (
        updatedDataArray.map((item, index) => {
          const itemParts = item.split(': ');
          return (
            <div key={index} className='checkListDetail'>
              {itemParts.map((part, partIndex) => (
                <p key={partIndex}>{part}</p>
              ))}
            </div>
          );
        })
      ) : (
        <p>No updated data received</p>
      )}

    <button className='affordTickets' onClick={() => { generateRandomQR(); setShowQR(true); }}>Afford</button>

    {showQR && (
    <div className='QRCode'>
        <QRCode value={String(randomQRValue)} size={180} className='QRCode1'/>
        <input type="text" value={inputValue} onChange={handleInput} placeholder="Enter QR Code"  className='QRCode2'/>
        <button onClick={confirmQR} className='affordTickets1'>Confirm</button>
    </div>
    )}
    </div>
  );
};

export default TicketsCheckList;
