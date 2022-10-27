import React, { useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './UserLogin.module.css';
import {Form,Button,Col} from "react-bootstrap"
import {userLoginAction} from '../../actions/action'
import { useState } from 'react';
import { Navigate } from 'react-router';
import { useSelector,useDispatch } from 'react-redux';

const UserLogin = () => {
  const state = useSelector(state => state)
  console.log(state.login)
  const dispatch = useDispatch();
  useEffect(() => {
    
  },[])

  const [userCredentials,setUserCredentials] = useState({userId: "", userPassword: 0})
  const [userIdMsg,setUserIdMsg] = useState("")
  const [passwordMsg,setPasswordMsg] = useState("")
  const [invalidCredentials,setInvalidCredentails] = useState("")
  

  const userLoginChange = (event) => {
    let tempCredentials = Object.assign({},userCredentials,{[event.target.name]: event.target.value})
    setUserCredentials(tempCredentials);
    setErrorMsg()
  }

  const handleUserLogin = (event) => {
    event.preventDefault();
    if(!setErrorMsg()) {
      dispatch(userLoginAction(userCredentials))
      checkCredentials()
    }
  }

  const setErrorMsg = () => {
    let flag = false
    if (userCredentials.userId == "") {
      setUserIdMsg("Id Field is required")
      flag = true
    } else {
      setUserIdMsg("")
      flag = false
    }
    if (userCredentials.userPassword.length < 5 || userCredentials.userPassword.length > 10) {
      setPasswordMsg("Password should have 5 to 10 characters")
      flag = true
    } else {
      setPasswordMsg("")
      flag = false
    }
    return flag
  }

  const checkCredentials = () => {
    if (!state.login.isAuthenticated) {
      setInvalidCredentails("Invalid Credentails")
    }
  }

  

  return (
    <>
    {state.login.isAuthenticated ? 
      <Navigate to = "/userhome"/> :
        <>
          <Navigation/>
          <div className = "container p-5 mt-5 bg-dark text-white" style = {{"width": "30%", "borderRadius": "2.5%"}}>
            <img className = "ms-5" style = {styles.img} src = "assets\Images\UserLogIn.jpg"></img>
            <h1>Login As User</h1>
            <Form horizontal = "true" onSubmit = {handleUserLogin}>
                <Form.Group className="mb-2" onChange = {userLoginChange}>
                  <Col sm={12}>
                    <Form.Control size="lg" name = "userId" className="input-lg mt-4" type="number" placeholder="User Id" autoComplete='off' />
                    <p class="text-danger">{userIdMsg}</p>
                  </Col>
                </Form.Group>
                <Form.Group className="mb-1" onChange = {userLoginChange}>
                  <Col sm={12}>
                    <Form.Control size="lg" name="userPassword" className="input-lg mt-4" type="password" placeholder="Password" autoComplete='off' />
                    <p class="text-danger">{passwordMsg}</p>
                  </Col>
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


export default UserLogin;