import React from 'react';
import Navigation from '../Navigation/Navigation';
import {Form,Button,Col,Row} from "react-bootstrap"
import { useState } from 'react';
import { useEffect } from 'react';
import {userRegisterAction} from '../../actions/action'
import { Navigate } from 'react-router';
import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserRegister = () => { 
  const dispatch = useDispatch()
  useEffect(() => {
  
  },[])
  
  const [userCredentials,setUserCredentials] = useState({userName: '',
                                                         userPassword: '',
                                                         userPhoneNum: '',
                                                         userEmail: '',
                                                         userDOB: new Date(),
                                                         userGender: '',
                                                         userPincode: 0,
                                                         userCity: '',
                                                         userState: '',
                                                         userCountry: ''
                                                        });

  const [userDOBValid,setUserDOBValid] = useState(true);
  const [msgName, setMsgName] = useState('')
  const [msgPassword, setPasswordMsg] = useState('')
  const [mobileMsg, setMobile] = useState('')
  const [emailMsg, setEmailMsg] = useState('')
  const [cityMsg, setCityMsg] = useState('')
  const [isValid, setValid] = useState(false)
  const [pinCodeMsg, setPinCodeMsg] = useState('')
  const [stateMsg, setStateMsg] = useState('')
  const [countryMsg, setCountryMsg] = useState('')
  const [userId,setUserId] = useState(0)

  const userRegisterChangeNumber = (event) => {
    try {
      let number = parseInt(event.target.value);
      let tempCredentials = Object.assign({},userCredentials,{[event.target.name]: number});
      setUserCredentials(tempCredentials);
      if (event.target.value.length !== 10) {
        setMobile("Mobile Number should have 10 digits")
      }
      else {
        setMobile("")
      }
    }
    catch(err) {console.log(err)}
  }

  const userRegisterChangePinCode = (event) => {
    try {
      let number = parseInt(event.target.value);
      let tempCredentials = Object.assign({},userCredentials,{[event.target.name]: number});
      setUserCredentials(tempCredentials);
      if (event.target.value.length !== 6) {
        setPinCodeMsg('Pincode should have 6 digits')
      }
      else {
        setPinCodeMsg('')
      }
    }
    catch(err) {console.log(err)}
  }
  
                                                        
  const birthday = document.getElementById('userDOB');

  const userRegisterChange = (event) => {
    let tempCredentials = Object.assign({},userCredentials,{[event.target.name]: event.target.value});
    setUserCredentials(tempCredentials);
    setErrorMessages()
  }

  const setErrorMessages = () => {
    let flag = false
    if(!validateAge()) {
      flag = true
    }
    if (userCredentials.userName.length < 3 || userCredentials.userName.length > 50) {
      setMsgName('Name should have 3 to 50 characters')
      flag = true
    } else {
      setMsgName('')
      flag = false
    }
    if (userCredentials.userPassword.length < 5 || userCredentials.userPassword.length > 10) {
      setPasswordMsg('Password should have 5 to 10 characters')
      flag = true
    } else {
      setPasswordMsg('')
      flag = false
    }

    if (userCredentials.userEmail.length < 1) {
      setEmailMsg('Email field is Required')
      flag = true
    } else {
      setEmailMsg('')
      flag = false
    }

    if (userCredentials.userCity.length < 6 || userCredentials.userCity.length > 20) {
      setCityMsg('City should have 6 to 20 characters')
      flag = true
    } else {
      setCityMsg('')
      flag = false
    }

    if (userCredentials.userState.length < 6 || userCredentials.userState.length > 20) {
      setStateMsg('State should have 6 to 20 characters')
      flag = true
    } else {
      setStateMsg('')
      flag = false
    }

    if (userCredentials.userCountry.length < 6 || userCredentials.userCountry.length > 20) {
      setCountryMsg('Country should have 6 to 20 characters')
      flag = true
    } else {
      setCountryMsg('')
      flag = false
    }

    return flag
  }
  
  const getUserId = async () => {
    try {
      const user = await axios.get("http://localhost:8080/users")
      const userIdx = user.data.length - 1
      const usersId = user.data[userIdx].id
      setUserId(usersId)
    } catch (err) {
      console.log(err.message)
    }
  }

 

  const handleUserRegister = (event) => {
    event.preventDefault();
    if(!setErrorMessages()) {
      dispatch(userRegisterAction(userCredentials))
      setValid(true)
      getUserId()
    }
  }

  function validateAge() {
    const dob = new Date(birthday.value).getFullYear();
    const now = new Date().getFullYear();
    const age = now - dob;
    console.log(age);
    if(age > 100 || age < 20) {
      setUserDOBValid(false)
      return false;
    }
      
    else {
      setUserDOBValid(true);
      return true;
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
                        <h2 class = "title">Account created successfully</h2><br/>
                        <h3>Your User Id is {userId}</h3><br/>
                        <Link to="/userlogin">
                          <Button variant="primary" type="submit"> Login Now </Button>
                        </Link>
                    </center>
                :
        
          <div className = "container p-5 mt-5 bg-dark text-white" style = {{"width": "45%", "borderRadius": "2.5%"}}>
              <img src = "assets\Images\UserLogIn.jpg"></img>
              <h1>User Profile</h1>
              <Form horizontal="true" className = "mt-3" onSubmit = {handleUserRegister}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" onChange = {userRegisterChange}>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        name = "userName"
                        required 
                        type = "text"
                        minLength = {2}
                        maxLength = {50}
                      />
                    </Form.Group>
                    <p class="text-danger">{msgName}</p>
                  </Col>
                  <Col>
                    <Form.Group className = "mb-3" onChange = {userRegisterChange}>
                      <Form.Label>Password</Form.Label>
                      <Form.Control 
                        name = "userPassword" 
                        required 
                        type = "password"
                        minLength = {5}
                        maxLength = {10}
                      />
                    </Form.Group>
                    <p class="text-danger">{msgPassword}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className = "mb-3" onChange = {userRegisterChangeNumber}>
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        name = "userPhoneNum"
                        type = "number"
                        required
                        pattern = "[0-9]{10}"
                      />
                    </Form.Group>
                    <p class="text-danger">{mobileMsg}</p>
                  </Col>
                  <Col>
                    <Form.Group className = "mb-3" onChange = {userRegisterChange}>
                      <Form.Label>Email</Form.Label>
                      <Form.Control 
                        name = "userEmail"
                        type = "email"
                        required
                      />
                    </Form.Group>
                    <p class="text-danger">{emailMsg}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className = "mb-3" onChange = {userRegisterChange}>
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        name = "userDOB"
                        type = "date"
                        id = "userDOB"
                        required
                        isInvalid = {!userDOBValid}
                      />
                      <Form.Control.Feedback type = "invalid">Must be between ages 20-100</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group name = "userGender" className = "mb-3" onChange = {userRegisterChange}>
                      <Form.Label>Gender</Form.Label><br/>
                      <Form.Check 
                        required
                        name = "userGender"
                        value = "M"
                        inline 
                        type="radio" 
                        label="Male"
                      />
                      <Form.Check 
                        required 
                        name = "userGender" 
                        value = "F" 
                        inline 
                        type="radio" 
                        label="Female"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className = "mb-3" onChange = {userRegisterChangePinCode}>
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        name = "userZip"
                        type = "text"
                        required
                        minLength = {6}
                        maxLength = {6}
                      />
                    </Form.Group>
                    <p class="text-danger">{pinCodeMsg}</p>
                  </Col>
                  <Col>
                    <Form.Group className = "mb-3" onChange = {userRegisterChange}>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        name = "userCity" 
                        type = "text"
                        required
                        minLength = {6}
                        maxLength = {20}
                      />
                    </Form.Group>
                    <p class="text-danger">{cityMsg}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className = "mb-3" onChange = {userRegisterChange}>
                      <Form.Label>State</Form.Label>
                      <Form.Control 
                        name = "userState"
                        type = "text"
                        minLength = {6}
                        maxLength = {20}
                      />
                    </Form.Group>
                    <p class="text-danger">{stateMsg}</p>
                  </Col>
                  <Col>
                    <Form.Group className = "mb-3" onChange = {userRegisterChange}>
                      <Form.Label>Country</Form.Label>
                      <Form.Control 
                        name = "userCountry"
                        type = "text"
                        minLength = {6}
                        maxLength = {20}
                      />
                    </Form.Group>
                    <p class="text-danger">{countryMsg}</p>
                  </Col>
                </Row>
                <Row>
                    <Form.Group className = "mb-3" onChange = {userRegisterChange}>
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



export default UserRegister;