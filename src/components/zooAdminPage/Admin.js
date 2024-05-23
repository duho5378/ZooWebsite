import React, { useState } from 'react';
import './Admin.css';
import AdminAnimal from './AdminAnimal';
import AdminEvent from './AdminEvent';
import AdminUser from './AdminUser';

const Admin = () => {
  const [displayContent, setDisplayContent] = useState(''); // State để lưu trạng thái hiển thị của rightAdmin

  const handleButtonClick = (content) => {
    setDisplayContent(content); // Cập nhật trạng thái hiển thị khi click vào button
  };

  return (
    <div className='adminPage'>
      <div className='leftAdmin'>
        <h1>ZooLander</h1>
        <p>Home Page Admin</p>
        <a className='homeAdmin' href='/'>
          Return Home
        </a>
        <button className='eventAdmin' onClick={() => handleButtonClick('Event Display')}>
          Event Display
        </button>
        <button className='userAdmin' onClick={() => handleButtonClick('User Account')}>
          User Account
        </button>
      </div>
      <div className='rightAdmin'>

        {displayContent === 'Animal Display' && (
          <div>
            <AdminAnimal/>
          </div>
        )}

        {displayContent === 'Event Display' && (
          <div>
            <AdminEvent/>
          </div>
        )}

        {displayContent === 'User Account' && (
          <div>
            <AdminUser/>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;
