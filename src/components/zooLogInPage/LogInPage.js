import React, { useState } from 'react';
import './LogInPage.css';
import { FaUser } from 'react-icons/fa';
import { IoIosLock } from 'react-icons/io';
import Navbar from '../zooAnimalPage/Navbar/Navbar';
import Snowfall from 'react-snowfall';

const LogInPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [snowFlakeActive, setSnowFlakeActive] = useState(false);

  const showSnowFlake = () => {
    setSnowFlakeActive(!snowFlakeActive);
  };

  const handleLogin = (event) => {
    event.preventDefault(); // Ngăn trang bị tải lại khi xảy ra lỗi

    if (phoneNumber === '') {
      setErrorMessage('Please enter a phone number.');
      return;
    }

    if (password === '') {
      setErrorMessage('Please enter a password.');
      return;
    }

    // Gửi yêu cầu kiểm tra đăng nhập đến backend (API login)
    fetch('http://localhost:3001/api/login', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          // Lưu trữ token vào Local Storage dựa trên lastName thay vì phoneNumber
          localStorage.setItem('userToken', phoneNumber);
          // Chuyển hướng đến trang chủ
          window.location.href = '/';
        } else {
          setErrorMessage(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    if (event.target.value !== '' && errorMessage) {
      setErrorMessage('');
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value !== '' && errorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <div className='loginPage'>
      {snowFlakeActive && <Snowfall color="white" snowflakeCount={100} style={{ zIndex: 1000 }} />}
      <Navbar showSnowFlake={showSnowFlake}/>
      <form className='loginInfor' onSubmit={handleLogin}>
        <h2>Log In</h2>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}

        <div className='inputLogIn'>
          <input
            type='text'
            placeholder='Phone Number'
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <FaUser size={25} className='loginIcon' color='white'/>
        </div>

        <div className='inputLogIn'>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
          />
          <IoIosLock size={27} className='loginIcon' color='white'/>
        </div>

        <div className='LogInRF'>
          <label>
            <input type='checkbox' />
            Remember me
          </label>
          <a href='#'>Forgot password ?</a>
        </div>

        <button type='submit'>Log in</button>

        <div className='LogInRegister'>
          <p>
            Don't have an account ? <a href='/logins/register'>Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LogInPage;
