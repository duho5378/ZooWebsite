import React from 'react'
import './Tickets.css'

const Tickets = () => {
  return (
    <div className='ticketSection'>
        <div className='tickets'>
            <h1>Tickets</h1>
            <button>See More <span>{'>>>'}</span></button>
        </div>
        <div className='top'>
            <div className='top-left'>
                <h2>Daily Tickets</h2>
                <button className='btn'>Book Now</button>
            </div>
            <div className='top-mid'>
                <h2>Combo Family</h2>
                <button className='btn'>Special Combo</button>
            </div>
            <div className='top-right'>
                <h2>Yearly Tickets</h2>
                <button className='btn'>Membership</button>
            </div>
        </div>
        <p>We will provide you with special offers depending on your age, time, holidays or even unexpected discount codes. Loyal customers or members of the zoo will receive incentives and typical gifts of this place.</p>
    </div>
  )
}

export default Tickets