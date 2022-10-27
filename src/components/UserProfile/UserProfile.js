import React from 'react';
import Navigation from '../Navigation/Navigation';
import {Image,Row,Col} from 'react-bootstrap'
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const state = useSelector(state => state)
  
  return (
    <>
    <Navigation/>
    <div className = "container p-5 mt-5 bg-dark text-white" style = {{"width": "25%", "borderRadius": "2.5%"}}>
      <Row>
        <Col>
          {state.login.gender === "M" ? 
            <Image roundedCircle src = "assets\Images\male.png"/> :
            <Image roundedCircle src = "assets/Images/female.png"/>
          }
        </Col>
        <Col>
          <h1>{state.login.username}</h1>
          <h6 className = "mt-3">Date of Birth: {state.login.dateOfBirth}</h6>
          <h6>Email: {state.login.email}</h6>
          <h6>Mobile No: {state.login.mobileNumber}</h6>
          <h6>Address: {state.login.city}, {state.login.state}, {state.login.country}</h6>
          <h6>Zipcode: {state.login.pinCode}</h6>
        </Col>
      </Row>
    </div>
  </>
)};

export default UserProfile;