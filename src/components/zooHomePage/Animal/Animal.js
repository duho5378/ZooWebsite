import React from 'react'
import './Animal.css'

const Animal = () => {
  return (
    <div>
      <div className='ticketDisplay'>
        <img src='hill1.png' className='hill1'></img>
        <img src='hill2.png' className='hill2'></img>
        <img src='hill3.png' className='hill3'></img>
        <img src='hill4.png' className='hill4'></img>
        <img src='hill5.png' className='hill5'></img>
        <img src='tree.png' className='tree'></img>
        <h1 className='ticketH1'>SUPPORT US</h1>
        <img src='plant.png' className='plant'></img>
      </div>

      <div className='ticketDisplayTwo'>
        <h2>Fighting Extinction With Us</h2>
        <div className='oneSupport'>
          <img src='S1.jpg'></img>
          <p>In recent decades, illegal hunting of wild animals along with deforestation has caused many animal species to lose their original habitat. The result is the risk of extinction of many rare animal species.</p>
        </div>
        <div className='oneSupport'>
          <p>With your interest and help, we at Zoolander will be able to have enough facilities to build higher quality care facilities, and we will also deduct 20% of Donors to carry out plans to green the bare hills.</p>
          <img src='S2.jpg'></img>
        </div>
        <div className='oneSupport'>
          <img src='S3.jpg'></img>
          <p>In addition, every year we also organize many events to raise funds for animal protection, with the food you eat here or the souvenirs we sell for you to buy. You have all joined hands to help preserve rare animals that are on the verge of extinction.</p>
        </div>
      </div>
    </div>

  )
}

export default Animal