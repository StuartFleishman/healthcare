import React from 'react';
import {Image,Row,Col} from "react-bootstrap"
import { useSelector} from 'react-redux';
import Navigation from '../Navigation/Navigation';
const CoachProfile = () => {
  const state = useSelector(state => state)
  return (
    <>
       <Navigation/>
      <div className = "container p-5 mt-5 bg-dark text-white" style = {{"width": "30%", "borderRadius": "2.5%"}}>
        <Row>
          <Col>
          {state.login.gender === "M" ? 
            <Image roundedCircle src = "assets\Images\male.png" /> :
            <Image roundedCircle src = "assets\Images\female.png" />
          }
          </Col>
          <Col>
            <h4>Coach Id: {state.login.id}</h4>
            <h6>Date of Birth: {state.login.dateOfBirth}</h6>
            <h6>Mobile No: {state.login.mobileNumber}</h6>
            <h6>Speciality: {state.login.speciality}</h6>
          </Col>
        </Row>
      </div>
    </>
  )
};



export default CoachProfile;