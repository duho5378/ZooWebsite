import React, { useState, useEffect } from 'react';
import Alpaca from '../assets/alpaca.png';
import './Navbar.css';
import { MdAdminPanelSettings } from "react-icons/md";
import { HiOutlineTicket } from 'react-icons/hi2';
import { FaRegSnowflake } from 'react-icons/fa';

const Navbar = ({ showSnowFlake }) => {
    const [userLastName, setUserLastName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [isTokenSet, setIsTokenSet] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
        fetch(`http://localhost:3001/api/getLastName/${token}`)
            .then(response => response.json())
            .then(data => {
            if (data.success) {
                setUserLastName(data.lastName);
                setIsLoggedIn(true);
                setIsTokenSet(true);
            } else {
              setIsTokenSet(true);
                // Xử lý lỗi khi không lấy được thông tin lastName từ server
            }
            })
            .catch(error => {
              console.error('Error:', error);
              setIsTokenSet(true);
            // Xử lý lỗi khi gọi API lấy thông tin lastName
            });
        } else {
          setIsTokenSet(true); // Nếu không có token, thiết lập isTokenSet thành true để ngăn chặn chuyển hướng
        }
    }, []);

    const handleUserClick = () => {
        setShowOptions(prevState => !prevState);
    };

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
        setShowOptions(false);
    };

    const handleTicketsClick = () => {
      if (isLoggedIn && isTokenSet) {
        window.location.href = '/tickets'; // Chuyển hướng khi đã đăng nhập và token đã được thiết lập
      } else {
        alert('Please log in'); // Hiển thị thông báo khi chưa đăng nhập hoặc chưa thiết lập token
      }
    };

  return (
    <div className='Nav'>
        <a className='logo' href='/'>
          <img src={Alpaca} className='alpaca' alt='cp1' />
          <p className='logo-text'>
            {' '}
            <span>Zoo</span>lander{' '}
          </p>
        </a>

        <div className='rightNav'>
          <menu>
            <ul className='nav-links'>
              <li>
                <a href='/'>Home</a>
              </li>
              <li>
                <a href='/news'>Our Zoo</a>
              </li>
              <li>
                <a href='/animals'>Educate</a>
              </li>
            </ul>
          </menu>
          <div className='botNav'>
            <div className='ticketsHome' onClick={handleTicketsClick}>
              <HiOutlineTicket size={25} color='white' />
              <p>Tickets</p>
            </div>
            {isLoggedIn ? (
              <div className='userOptions'>
                <button className='button-logIn' onClick={handleUserClick}>
                  <p>{userLastName}</p>
                </button>
                {showOptions && (
                  <div className='options'>
                      {localStorage.getItem('userToken') === '0866977312' ? (
                        <a href='/admin'>Account</a>
                      ) : (
                        <a href='/account'>Account</a>
                      )}
                    <button onClick={handleLogout}>Log Out</button>
                  </div>
                )}
              </div>
            ) : (
              <a href='/logins' className='button-logIn'>
                <p>Log In</p>
              </a>
            )}
            <a href='http://localhost:5173/entrance'>
              <MdAdminPanelSettings size={40} color='orange' className='finalLogoNav' />
            </a>
          </div>
          <button className='snowFlake' onClick={showSnowFlake}>
            <FaRegSnowflake size={30} className='snowIcon' />
          </button>
        </div>
      </div>
  )
}

export default Navbar