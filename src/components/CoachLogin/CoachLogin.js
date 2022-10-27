import React, { useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './CoachLogin.module.css';
import {Form,Button,Col} from "react-bootstrap"
import { useState } from 'react';
import { connect } from 'react-redux/es/exports';
import { coachLoginAction } from '../../actions/action';
import { useSelector, useDispatch} from 'react-redux';
import { Navigate } from "react-router-dom";

const CoachLogin = () => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const [invalidCredentials,setInvalidCredentails] = useState("")
  
  useEffect(() => {
    setLogIn(state.login.isAuthenticated)
  },[state.login.isAuthenticated])

  const [coachCredentials,setCoachCredentials] = useState({coachId: "", coachPassword: ''})
  const [coachIdMsg,setCoachIdMsg] = useState("")
  const [passwordMsg,setPasswordMsg] = useState("")
  const [loggedIn, setLogIn] = useState(false)

  const coachLoginChange = (event) => {
    let tempCredentials = Object.assign({},coachCredentials,{[event.target.name]: event.target.value});
    setCoachCredentials(tempCredentials);
  }

  const handleCoachLogin = (event) => {
    event.preventDefault();
    if(!setErrorMsg()) {
      dispatch(coachLoginAction(coachCredentials))
      checkCredentials()
    }
  }

  const checkCredentials = () => {
    if (!state.login.isAuthenticated) {
      setInvalidCredentails("Invalid Credentails")
    }
  }

  const setErrorMsg = () => {
    let flag = false
    if (coachCredentials.coachId == "") {
      setCoachIdMsg("required")
      flag = true
    } else {
      setCoachIdMsg("")
      flag = false
    }
    if (coachCredentials.coachPassword.length < 5 || coachCredentials.coachPassword.length > 10) {
      setPasswordMsg("Password should have 5 to 10 characters")
      flag = true
    } else {
      setPasswordMsg("")
      flag = false
    }
    return flag
  }

 

  return (
    <>
      {!!loggedIn ? <Navigate to="/coachhome" /> :
      <>
          <Navigation/>
          <div className = "container p-3 mt-5 bg-dark text-white" style = {{"width": "30%", "borderRadius": "2.5%"}}>
            <img className = "ms-5" style = {styles.img} src = "assets\Images\LifeCoachLogIn.jpg"></img>
            <h1 style = {styles.h3}>Login As Life Coach</h1>
            <Form horizontal = "true" onSubmit = {handleCoachLogin}>
              <Form.Group className="mb-2" onChange = {coachLoginChange}>
                <Col sm={12}>
                  <Form.Control size="lg" name = "coachId" className="input-lg mt-4" type="text" placeholder="Coach Id" autoComplete='off' />
                </Col>
                    <p class="text-danger">{coachIdMsg}</p>
              </Form.Group>
              <Form.Group className="mb-1" onChange = {coachLoginChange}>
                <Col sm={12}>
                  <Form.Control size="lg" name="coachPassword" className="input-lg mt-4" type="password" placeholder="Password" autoComplete='off' />
                </Col>
                <p class="text-danger">{passwordMsg}</p>
              </Form.Group>
              <h4 className = "mt-4" style = {{'color': 'red','textAlign': 'center'}}>{invalidCredentials}</h4> 
              <Form.Group className = "mb-2"> 
                <Col sm = {12}>
                  <Button style = {styles.Button} size= "lg" className="mt-4" variant="primary" type="submit">Sign in</Button>
                </Col>
              </Form.Group>
            </Form>
          </div>
          </>
          }
          </>
  );

}



export default CoachLogin;