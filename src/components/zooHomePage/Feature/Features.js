import React from 'react'
import './Feature.css'
import { HiMiniMapPin } from "react-icons/hi2";
import { ImMap } from "react-icons/im";
import { SlArrowRight } from "react-icons/sl";
import { FaHandHolding } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { MdOutlineExposurePlus1 } from "react-icons/md";

const Features = () => {
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
    <div className='Feature'>
      <div className='intro'>
        <h1 className='Title'>Welcome to <span>Zoolander</span></h1>
        <p className='discriptionHome'>We are here with the desire to give our guests memorable experiences along with new knowledge about the animal world around us.</p>
      </div>

      <div className='body'>

        <button onClick={handleTicketsClick} className='button2'>
          <div className='logo2'>
            <IoTicket className='ticket' size={40}/>
            <FaHandHolding className='hand' size={80}/>
          </div>
          <p>Buy tickets online</p>
          <SlArrowRight className='arrow'/>
        </button>
        <button onClick={handleMemberClick} className='button3'>
          <div className='logo3'>
            <IoPerson className='person' size={70}/>
            <MdOutlineExposurePlus1 className='plus' size={40}/>
          </div>
          <p>Become our member</p>
          <SlArrowRight className='arrow'/>
        </button>
      </div>
    </div>
  )
}

export default Features