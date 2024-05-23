import React from 'react'
import './Footer.css'
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
    const token = localStorage.getItem('userToken');

    const handleMemberClick = () => {
        if (token === null) {
          window.location.href = '/logins'; // Chuyển hướng khi đã đăng nhập và token đã được thiết lập
        } else {
          alert('You already a member'); // Hiển thị thông báo khi chưa đăng nhập hoặc chưa thiết lập token
        }
      };
  return (
    <div className='Bot'>
        <div className='first'>
            <p>Visiting Links</p>
            <menu>
                <ul className="bot-links">
                <li><a href="/">Home</a></li>
                <li><a href="/news">Our Zoo</a></li>
                <li><a href="/animal">Educate</a></li>
                </ul>
            </menu>
        </div>

        <div className='second'>
            <p>Site Information</p>
            <menu>
                <ul className="bot-links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Cookie Information</a></li>
                </ul>
            </menu>
        </div>

        <div className='third'>
            <p>Connect With Us</p>
            <menu>
                <ul className="bot-links">
                <li><a href="https://twitter.com/Zoolander"><FaXTwitter size={30} className='logoBot'/><span>Twitter</span></a></li>
                <li><a href="https://www.facebook.com/groups/236408523049610"><FaFacebook size={30} className='logoBot'/><span>Facebook</span></a></li>
                <li><a href="https://www.youtube.com/@zoolander"><FaYoutube size={30} className='logoBot'/><span>Youtube</span></a></li>
                <li>
                    <button onClick={handleMemberClick}>
                        MEMBERSHIP
                    </button>
                </li>

                </ul>
            </menu>
        </div>
    </div>
  )
}

export default Footer