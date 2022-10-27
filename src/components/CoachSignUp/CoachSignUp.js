import React, { useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import {Form,Button,Col,Row} from "react-bootstrap"
import { Link } from 'react-router-dom';
import { coachRegisterAction } from '../../actions/action';
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

const CoachSignUp = () => { 
  const dispatch = useDispatch();
  const [coachCredentials,setCoachCredentials] = useState({coachName: '',
                                                           coachPassword: '',
                                                           coachDOB: new Date(),
                                                           coachGender: '',
                                                           coachPhoneNum: '',
                                                           coachSpec: ''
                                                          })

  const [coachDOBValid,setCoachDOBValid] = useState(true)
  const [msgName, setMsgName] = useState('')
  const [msgPassword, setPasswordMsg] = useState('')
  const [mobile, setMobile] = useState('')
  const [speciality, setSpecialityMsg] = useState('')
  const [isValid, setValid] = useState(false)
  const [coachId,setCoachId] = useState(0)
  const birthday = document.getElementById('coachDOB')
  
  const coachRegisterChange = (event) => {
    let tempCredentials = Object.assign({},coachCredentials,{[event.target.name]: event.target.value});
    setCoachCredentials(tempCredentials)
    validateAge()
    setErrorMessages()
  }

  const setErrorMessages = () => {
    if (coachCredentials.coachName.length < 3 || coachCredentials.coachName.length > 50) {
      setMsgName("Name should have 3 to 50 characters")
    }
    else {
      setMsgName("")
    }
    if (coachCredentials.coachPassword.length < 5 || coachCredentials.coachPassword.length > 10) {
      setPasswordMsg("Password should have 5 to 10 characters")
    }
    else {
      setPasswordMsg("")
    }
    if (coachCredentials.coachSpec.length < 10 || coachCredentials.coachSpec.length > 50) {
      setSpecialityMsg("Speciality should have 10 to 50 characters")
    }
    else {
      setSpecialityMsg("")
    }
  }

  const coachRegisterChangeNumber = (event) => {
    try {
      let number = parseInt(event.target.value);
      let tempCredentials = Object.assign({},coachCredentials,{[event.target.name]: number});
      if (event.target.value.length !== 10) {
        setMobile("Mobile Number should have 10 digits")
      }
      else {
        setMobile("")
      }
      setCoachCredentials(tempCredentials);
    }
    catch(err) {console.log(err)}
  }

  const handleCoachRegister = (event) => {
    event.preventDefault()
    if(msgName === "" && msgPassword === "" && mobile === "" && speciality === "" && coachDOBValid === true) {
      console.log("heynow")
      dispatch(coachRegisterAction(coachCredentials))
      setValid(true)
      getCoachId()
    }
  }

   function validateAge() {
    const dob = new Date(birthday.value).getFullYear();
    const now = new Date().getFullYear();
    const age = now - dob;
    console.log(age);
    if(age > 100 || age < 20) {
      setCoachDOBValid(false)
      return false;
    }
    else {
      setCoachDOBValid(true);
      return true
    }
      
  }

  const getCoachId = async () => {
    try {
      const coach = await axios.get("http://localhost:8080/coaches")
      const coachIdx = coach.data.length - 1
      const coachId = coach.data[coachIdx].id
      setCoachId(coachId)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
        <>
          <Navigation/>
          {
                isValid?
                    <center>
                        <img  class="resize" src="coach_avtar.png" alt="coach"/>
                        <h2 class = "title">You are a Coach now !</h2><br/>
                        <h3>Your Coach Id is {coachId}</h3><br/>
                        <Link to="/coachlogin">
                          <Button variant="primary" type="submit"> Login </Button>
                        </Link>
                    </center>
                :
          <div className = "container p-5 mt-5 bg-dark text-white" style = {{"width": "45%", "borderRadius": "2.5%"}}>
            <img src = "assets\Images\LifeCoachLogIn.jpg"></img>
            <h1>Life Coach Profile</h1>
            <Form horizontal="true" className = "mt-3" onSubmit = {handleCoachRegister}>
              <Row>
                <Col>
                  <Form.Group className="mb-3" value={coachCredentials.coachName} onChange = {coachRegisterChange}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name = "coachName"
                      type = "text"
                      required
                      minLength={3}
                      maxLength = {50}
                    />
                    <p class="text-danger">{msgName}</p>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className = "mb-3" onChange = {coachRegisterChange}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name = "coachPassword"
                      type = "password"
                      required
                      minLength={5}
                      maxLength = {10}
                    />
                     <p class="text-danger">{msgPassword}</p>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group required className = "mb-3" onChange = {coachRegisterChange} >
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      name = "coachDOB"
                      type="date"
                      required  
                      id = "coachDOB"
                      isInvalid = {!coachDOBValid}
                    />
                    <Form.Control.Feedback type = "invalid">Must be between ages 20-100</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group name = "coachGender" required className = "mb-3" onChange = {coachRegisterChange}>  
                    <Form.Label>Gender</Form.Label><br/>
                    <Form.Check
                      name = "coachGender"
                      value = "M"
                      inline
                      type="radio"
                      label="Male"
                      required
                    />
                    <Form.Check
                    name = "coachGender" 
                    value = "F" 
                    inline 
                    type="radio" 
                    label="Female"
                    required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className = "mb-3" onChange = {coachRegisterChangeNumber}>
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control 
                      name = "coachPhoneNum" 
                      type = "number"
                      required
                      pattern="[0-9]{10}"
                      minLength = {10}
                      maxLength = {10}
                    />
                    <p class="text-danger">{mobile}</p>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className = "mb-3" onChange = {coachRegisterChange}>
                    <Form.Label>Speciality</Form.Label>
                    <Form.Control 
                    name = "coachSpec" 
                    type = "text"
                    required
                    minLength = {10}
                    maxLength = {50}
                    />
                  </Form.Group>
                  <p class="text-danger">{speciality}</p>
                </Col>
              </Row>
              <Row>
                  <Form.Group className = "mb-3">
                    <Button type = "submit">Register</Button>
                  </Form.Group>
                </Row>
            </Form>
          </div>
          }
        </>
    </>
  );

}


export default CoachSignUp;


