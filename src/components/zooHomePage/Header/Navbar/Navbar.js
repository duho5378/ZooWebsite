import React, { useState, useEffect } from 'react';
import Alpaca from '../assets/alpaca.png';
import './Navbar.css';
import Slider from './Slider';
import { BsSearch } from 'react-icons/bs';
import { HiOutlineTicket } from 'react-icons/hi2';
import { FaRegSnowflake } from 'react-icons/fa';

const Navbar = ({ showSnowFlake }) => {
    const [userLastName, setUserLastName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
        fetch(`http://localhost:3001/api/getLastName/${token}`)
            .then(response => response.json())
            .then(data => {
            if (data.success) {
                setUserLastName(data.lastName);
                setIsLoggedIn(true);
            } else {
                // Xử lý lỗi khi không lấy được thông tin lastName từ server
            }
            })
            .catch(error => {
            console.error('Error:', error);
            // Xử lý lỗi khi gọi API lấy thông tin lastName
            });
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

  return (
    <div className='Nav'>
        <div className='logo'>
          <img src={Alpaca} className='alpaca' alt='cp1' />
          <p className='logo-text'>
            {' '}
            <span>Zoo</span>lander{' '}
          </p>
        </div>

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
              <li>
                <a href='/maps'>Visit Us</a>
              </li>
            </ul>
          </menu>
          <div className='botNav'>
            <a href='/tickets' className='ticketsHome'>
              <HiOutlineTicket size={25} color='white' />
              <p>Tickets</p>
            </a>
            {isLoggedIn ? (
              <div className='userOptions'>
                <button className='button-logIn' onClick={handleUserClick}>
                  <p>{userLastName}</p>
                </button>
                {showOptions && (
                  <div className='options'>
                    <a href='/account'>Account</a>
                    <button onClick={handleLogout}>Log Out</button>
                  </div>
                )}
              </div>
            ) : (
              <a href='/logins' className='button-logIn'>
                <p>Log In</p>
              </a>
            )}
            <BsSearch size={30} color='orange' className='finalLogoNav' />
          </div>
          <button className='snowFlake' onClick={showSnowFlake}>
            <FaRegSnowflake size={30} className='snowIcon' />
          </button>
        </div>
      </div>
  )
}

export default Navbar