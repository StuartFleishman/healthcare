import React from 'react';
import Navigation from '../Navigation/Navigation';
import Bookings from '../Bookings/Bookings';
import { useSelector } from 'react-redux';

const CoachHome = () => {
  const state = useSelector(state => state)
  let myBookings = state.login.myBookings;

  return (
    <>
      <Navigation/> 
      {myBookings.length > 0 ? 
      <Bookings myBookings={myBookings}/> :
      <div className = "container p-3 mt-5"
        style = {{"width": "25%", "textAlign": "center"}}>
        <img src = "assets\Images\Notepad_icon.svg.png"/><br/>
        <h1>No planned schedules yet</h1>
      </div>
      }
    </>
  );
}

export default CoachHome;