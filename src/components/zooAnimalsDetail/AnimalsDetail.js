import React, { useState } from 'react';
import './AnimalsDetail.css';
import { useParams } from 'react-router-dom';
import AnimalData from './animalsData';
import Snowfall from 'react-snowfall';
import Footer from './Footer/Footer';
import Navbar from '../zooAnimalPage/Navbar/Navbar';

const AnimalsDetail = () => {
    const [snowFlakeActive, setSnowFlakeActive] = useState(false);

    const showSnowFlake = () => {
      setSnowFlakeActive(!snowFlakeActive);
    };


    const { id } = useParams(); // Lấy ID từ URL

    // Tìm kiếm dữ liệu cho đối tượng có id tương ứng
    const animal = AnimalData.find((animal) => animal.id === parseInt(id));
  
    // Kiểm tra nếu không tìm thấy đối tượng
    if (!animal) {
      return <div>Không tìm thấy đối tượng</div>;
    }


    // Nếu tìm thấy đối tượng, hiển thị thông tin
    return (
      <div className='allAnimalDetail'>
        {snowFlakeActive && <Snowfall color="white" snowflakeCount={500} style={{ zIndex: 1000 }} />}
        <div className="animal-detail" >
          
          <Navbar showSnowFlake={showSnowFlake}/>

          <div className='eachAnimalsDetail'>
            <div className='firstDetails'>
              <h2>The {animal.title}</h2>
              <p>{animal.intro}</p>
              <h4>Lets get down for more awsome information !!!</h4>
            </div>
            <div className='firstDetailsImage'>
              <img src={animal.url} alt={animal.title} />
            </div>
          </div>

          <div className='animalsAppearance'>
            <div className='animalsAppearanceImage'>
              <img src={animal.pic1} alt='sth1'></img>
            </div>
            <div className='animalsAppearanceTitle'>
              <h1>So what does this {animal.title} looks like ?</h1>
              <p>{animal.appear}</p>
              <p><span className='aats'>For the males:</span> {animal.HWM}</p>
              <p><span className='aats'>For the females:</span> {animal.HWF}</p>
            </div>
          </div>

          <div className='lifeStyle'>
            <h1>Do you know what do the {animal.title} eat and what is it behavior is like ?</h1>
            <p>{animal.food}</p>
            <p>{animal.lifeStyle}</p>
            <img src={animal.pic2} alt='sth2'></img>
          </div>

          <div className='funFact'>
            <h1>These are some fun facts about the {animal.title}</h1>
            <div className='detailFunFact'>
              <div className='fun1'>
                <h1>Fun fact 1:</h1>
                <p>{animal.fun1}</p>
              </div>
              <div className='fun2'>
                <h1>Fun fact 2:</h1>
                <p>{animal.fun2}</p>
              </div>
              <div className='fun3'>
                <h1>Fun fact 3:</h1>
                <p>{animal.fun3}</p>
              </div>  
            </div>
          </div>

          <div className='preserveAnimals'>
            <h1>And about the population of the {animal.title} right now ?</h1>
            <p>{animal.warn}</p>
            <p>{animal.preserve}</p>
            <p>Lets give us a hand to help build for these creature a safe home.</p>
          </div>
        </div>

        <Footer/>
      </div>
    );
}

export default AnimalsDetail;
