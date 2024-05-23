import React, { useState, useEffect } from 'react';
import './AdminEvent.css'

const AdminEvent = () => {
  const [events, setEvents] = useState([]);
  const daysOfWeek = [' ','Monday','Monday','Monday', 'Tuesday','Tuesday','Tuesday', 'Wednesday','Wednesday','Wednesday', 'Thursday','Thursday','Thursday', 'Friday','Friday','Friday', 'Saturday','Saturday', 'Sunday','Sunday'];

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
  
  const handleUpdateETime = async (eventId, value) => {
    try {
      console.log(eventId);
      console.log(value);
      if (value === null) {
        return;
      }
      await fetch(`http://localhost:3001/api/eventEtimes/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      });
      fetchEventsFromServer();
    } catch (error) {
      console.error('Error updating ETIME:', error);
    }
  };
  
  const handleUpdateEDisc = async (eventId, value) => {
    try {
      console.log(eventId);
      console.log(value);
      if (value === null) {
        return;
      }
      await fetch(`http://localhost:3001/api/eventEdisc/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      });
      fetchEventsFromServer();
    } catch (error) {
      console.error('Error updating EDISC:', error);
    }
  };
  
  return (
    <div className='adminEventPage'>
      <h1>Event List</h1>
      {events.map((event, index) => (
        <div key={index + 1} className='adminEventPageDetail'>
          {index < daysOfWeek.length && <h2 className='daysEvent'>{daysOfWeek[index + 1]}</h2>}
          <div>
            <div key={`etime-${index + 1}`} className='etime'>            
              <button className='eventUpdate' onClick={() => handleUpdateETime(index + 1, prompt('Enter new ETIME value'))}>
                Update ETIME
              </button>
              <p><span>ETIME: </span> {event.ETIME}</p>
            </div>
            <div key={`edisc-${index + 1}`} className='edisc'>             
              <button className='eventUpdate' onClick={() => handleUpdateEDisc(index + 1, prompt('Enter new EDISC value'))}>
                Update EDISC
              </button>
              <p><span>EDISC: </span> {event.EDISC}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default AdminEvent;
