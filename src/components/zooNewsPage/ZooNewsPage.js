import React, { useState, useEffect } from 'react';
import './ZooNewsPage.css'

const ZooNewsPage = () => {
    const [events, setEvents] = useState([]);
    const daysOfWeek = [' ','Monday','','', 'Tuesday','','', 'Wednesday','','', 'Thursday','','', 'Friday','','', 'Saturday','', 'Sunday',''];
  
    useEffect(() => {
      // Gọi tới server để lấy thông tin từ database khi component được render
      fetchEventsFromServer();
    }, []);
  
    const fetchEventsFromServer = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/events'); // Thay đổi đường dẫn API tương ứng với server của bạn
        const data = await response.json();
        console.log(data)
        setEvents(data); // Cập nhật state events với dữ liệu lấy từ server
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    return (
        <div className='newsPage'>
          <div className='newSchedule'>
            <h1>Our Zoo Show Schedule</h1>
            <div className='newScheduleImg'>
              <img src='/zoo2.jpg' alt='sth3'></img>
              <img src='/zoo3.jpg' alt='sth3'></img>
              <img src='/zoo4.jpg' alt='sth3'></img>
            </div>
          </div>
          {events.map((event, index) => (
            <div key={index + 1} className='newsPageEventDetail'>
                <div className='events1'>
                    {index < daysOfWeek.length && <h2 className='newsEvent'>{daysOfWeek[index + 1]}</h2>}
                </div>
              <div className=' events2'>
                <div key={`etime-${index + 1}`} className='newstime'>            
                  <p>{event.ETIME}</p>
                </div>
                <div key={`edisc-${index + 1}`} className='newsdisc'>             
                  <p>{event.EDISC}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
};

export default ZooNewsPage