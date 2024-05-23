import React, { useState } from 'react';
import './RegisterPage.css'
import { MdEmail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { FaLockOpen } from "react-icons/fa6";
import Navbar from '../zooAnimalPage/Navbar/Navbar';
import Snowfall from 'react-snowfall';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [point, setPoint] = useState('1');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [snowFlakeActive, setSnowFlakeActive] = useState(false);

  const showSnowFlake = () => {
    setSnowFlakeActive(!snowFlakeActive);
  };

  const handleRegister = () => {
    if (firstName === '' || lastName === '' || phoneNumber === '' || email === '' || password === '' || confirmPassword === '') {
      setErrorMessage('Please fill in the boxes.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }

    fetch('http://localhost:3001/api/register', {
      method: 'POST',
      body: JSON.stringify({ FIRSTNAME: firstName, LASTNAME: lastName, EMAIL: email, PHONENUMBER: phoneNumber, PASSWORD: password, POINT: point }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('userToken', phoneNumber);
        window.location.href = "/";
      } else {
        setErrorMessage(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="registerPage">
      {snowFlakeActive && <Snowfall color="white" snowflakeCount={100} style={{ zIndex: 1000 }} />}
      <Navbar showSnowFlake={showSnowFlake}/>
      <div className='RegisterDetail'>
        <h2>Register</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className='RegisterName'>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className='RegisterInfo'>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MdEmail className='regisIcon' color='white'/>
        </div>


        <div className='RegisterInfo'>
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <FaPhoneFlip className='regisIcon' color='white'/>
        </div>

        <div className='RegisterInfo'>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className='regisIcon' color='white'/>
        </div>

        <div className='RegisterInfo'>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FaLockOpen className='regisIcon' color='white'/>
        </div>

        <button onClick={handleRegister}>Register</button>

      </div>
    </div>
  );
};

export default RegisterPage;
