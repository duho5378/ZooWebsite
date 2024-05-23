import './Slider.css'
import imageSlide from '../data'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { MdBookmarkAdd } from "react-icons/md";

import { Autoplay,Pagination } from 'swiper/modules';

const Slider = () => {
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
        <div className='container-slide'>
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              autoplay={{
                delay: 10000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              className="mySwiper"
              speed={1000}
            >
              <SwiperSlide>
                <div style={{backgroundImage: `url(${imageSlide[0].url})` ,backgroundPosition: 'center',backgroundSize: 'cover',height: '100%'}}></div>
                <div className='description0'> 
                    <div>
                        <h1>{imageSlide[0].title}</h1>
                        <p>{imageSlide[0].body}</p>
                        <p>Location at: Đ. Bưởi, Thủ Lệ, Ba Đình, Hà Nội, Việt Nam</p>
                        <div className='buttonsHome'>
                          <button className='button1Home' onClick={handleTicketsClick}>
                            <MdBookmarkAdd size={35} color='white'/>
                            <p>Booking</p>
                          </button>
                          <button className='button2Home' onClick={handleMemberClick}>
                            <p>Membership</p>
                          </button>
                        </div>
                    </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div style={{backgroundImage: `url(${imageSlide[1].url})` ,backgroundPosition: 'center',backgroundSize: 'cover',height: '100%'}}></div>
                <div className='description'> 
                    <div>
                        <h1>Meet the <span>Alpacas</span></h1>
                        <p>{imageSlide[1].body}</p>
                        <a href='/animals/34' className='btn1'>See detail</a>
                    </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div style={{backgroundImage: `url(${imageSlide[2].url})` ,backgroundPosition: 'center',backgroundSize: 'cover',height: '100%'}}></div>
                <div className='description2'> 
                    <div>
                        <h1><span>Christmas</span> has come !! Welcome <span>New Year</span></h1>
                        <p>{imageSlide[2].body}</p>
                        <a href='/news' className='btn2'>Check out</a>
                    </div>
                </div>
              </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Slider