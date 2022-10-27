import React from 'react';
import { useSelector } from 'react-redux';

const Bookings = ({myBookings}) => {
  return (
    <>
    {myBookings.map((myBooking) => {
      return (
        <div className = "container p-3 mt-5 bg-dark text-white"
          style = {{"width": "20%", "borderRadius": "2.5%", "textAlign": "center"}}>
          <h1>Appointment Date</h1>
          <h2>{myBooking.appointmentDate}</h2>
          <h3>Slot: {myBooking.slot}</h3>
          <br/>
          <p>Booking Id: {myBooking.id}</p>
          <p>User Id: {myBooking.userId}</p>
        </div>
      )
    })}
    </>
)};



export default Bookings;