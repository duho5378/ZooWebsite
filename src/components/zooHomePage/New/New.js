import React from 'react'
import './New.css'

const New = () => {
    const token = localStorage.getItem('userToken');

    const handleTicketsClick = () => {
      if (token !== null) {
        window.location.href = '/tickets'; // Chuyển hướng khi đã đăng nhập và token đã được thiết lập
      } else {
        alert('Please log in'); // Hiển thị thông báo khi chưa đăng nhập hoặc chưa thiết lập token
      }
    };
  
    const handleMemberClick = () => {
      if (token === null) {
        window.location.href = '/logins'; // Chuyển hướng khi đã đăng nhập và token đã được thiết lập
      } else {
        alert('You already a member'); // Hiển thị thông báo khi chưa đăng nhập hoặc chưa thiết lập token
      }
    };

  return (
    <div className='New'>
        <h1>WHAT IS GOING ON ?</h1>
        <a href='/news' className='News'>
            <p className='santaWhere'>? ? ?</p>
            <p>Find out more</p>
            <img src='santa1.png' className='santaNew'></img>
        </a>
        <div className='containerNew'>
            <div className='left'>
                <h2>Christmas has arrived at Zoolander</h2>
                <p>Come to Zoolander and enjoy the festive holiday with your family</p>
                <button onClick={handleTicketsClick}>Book your tickets</button>
            </div>
            <div className='right'>
                <div className='right-top'>
                    <h3>The penguin is coming this January</h3>
                    <a href='/news'>Lets find out</a>
                </div>
                <div className='right-bot'>
                    <h3>Become a member to receive many incentives</h3>
                    <button onClick={handleMemberClick}>Become a member</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default New