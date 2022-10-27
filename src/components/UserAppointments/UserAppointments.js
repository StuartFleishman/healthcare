import React from 'react';
import Container from "react-bootstrap/Container";
import styles from './UserAppointments.module.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useEffect,useState} from 'react'
import Navigation from '../Navigation/Navigation';
import { Modal,Button } from 'react-bootstrap';
import axios from 'axios';
import { Form,Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { editAppointment, cancelAppointment } from '../../actions/action';
import { useNavigate } from "react-router-dom";

const UserAppointments = () => {
  let nav = useNavigate();
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const handleClickToHome = () => {
    nav("/userhome");
  }
 

  
  const [myBookings,setMyBookings] = useState([]);
  const [isLoading,setLoading] = useState(true);
  const [isRescheduling,setIsRescheduling] = useState(false);
  const [isCancelling,setIsCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appDateValid,setAppDateValid] = useState(true);
  const [appDate,setAppDate] = useState(new Date());
  const [appTime,setAppTime] = useState("");
  const [rescheduleId, setRescheduleId] = useState(0);
  const [editBooking,setEditBooking] = useState({});
  const [appDateMsg, setDateMsg] = useState("")
  const [selected, setSelected] = useState(true)
  const [stillRescheduling,setResheduling] = useState(false)
  const [myBookingId, setMyBookingId] = useState(0)

  useEffect(() => {
    axios.get('http://localhost:8080/bookings')
    .then((response) => {
      let result = response.data
      let userBookings = result.filter(booking => booking.userId == state.login.id)
      console.log("asdf", userBookings) 
      setMyBookings(userBookings)
    })
    
  },[state])

  useEffect(() => {
    checkBothSelected()
  },[appDate,appTime])

  const checkBothSelected = () => {
    if(appDate && appTime !== "") {
      setSelected(false)
    }
  }

  const handleCancelAppointment = (id) => {
    dispatch(cancelAppointment(id))
    setShowCancelModal(false)
  }
  


  const resetPage = () => {
    setIsCancelling(false);
    setIsRescheduling(false);
    setResheduling(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!validateAppointment()) {
      dispatch(editAppointment(editBooking.id,appDate,editBooking.coachId,editBooking.userId,appTime))
      console.log("appTime",appTime)                             
      setResheduling(true)
    }
  }

  const validateAppointment = () => {
    let flag = false
    const date = new Date();
    const sevenDays = date.setDate(date.getDate() + 7);
    const timeStamp = new Date().getTime();
    const yesterdayTime = timeStamp - 24*60*60*1000;
    
    const appointmentDate = new Date(appDate)
    if(appointmentDate > sevenDays || appointmentDate < yesterdayTime) {
      setDateMsg("Appointment Date should up any upcoming 7 days")
      flag = true
    } else {
      setDateMsg("")
    }

    return flag
  }



  if(isCancelling) {
    return (
      <>
      <Navigation/>
        <div className = "container bg-dark mt-5 pt-1 text-white"
          style = {{"width": "30%", "text-align": "center", "borderRadius": "3%"}}>
          <p className = " mt-5">Your appointment is cancelled successfully</p>
          <Button className = "my-3" onClick = {() => resetPage()}
            style = {{"width": "50%"}}>Go Back</Button>
        </div>
      </>
    )
  }
  else if(isRescheduling) {
    return (
      <>
      <Navigation/>
      {!stillRescheduling ? 
      
        <>
        <div className = "container bg-dark text-white mt-5 p-3"
          style = {{"width": "40%", "borderRadius": "2.5%"}}>
            <Image src = "assets\Images\Notepad_icon.svg.png"
              style = {{"maxWidth": "7.5%"}}
              className = "ms-5 mt-0"/>
          <h2 style = {{"display": "inline"}}
            className = "ms-5 mt-5">Reschedule your Appointment</h2>  
          <Form className = "mt-3" onSubmit = {handleSubmit}>
            <Form.Group onChange = {event => setAppDate(event.target.value)}>
              <Form.Label>Date of Appointment</Form.Label>
              <Form.Control
                name = "appointmentDate"
                required
                type = "date"
                id = "appointmentDate"
                isInvalid = {!appDateValid}
              />
              <Form.Control.Feedback type = "invalid">Must be a valid date within the next week</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className = "mt-3" onChange = {event => setAppTime(event.target.value)}>
              <Form.Label>Preferred time slot</Form.Label><br/>
              <Form.Check
                required
                inline
                type = "radio"
                label = "9 AM to 10 AM"
                value = "9 AM to 10 AM"
              />
              <Form.Check
                required
                inline
                type = "radio"
                label = "10 AM to 11 AM"
                value = "10 AM to 11 AM"
              />
              <Form.Check
                required
                inline
                type = "radio"
                label = "11 AM to 12 PM"
                value = "11 AM to 12 PM"
              />
              <Form.Check
                required
                inline
                type = "radio"
                label = "2 PM to 3 PM"
                value = "2 AM to 3 PM"
              />
              <Form.Check
                required
                inline
                type = "radio"
                label = "3 PM to 4 PM"
                value = "3 PM to 4 PM"
              />
              <Form.Check
                required
                inline
                type = "radio"
                label = "4 PM to 5 PM"
                value = "4 PM to 5 PM"
              />
            </Form.Group>
            <Button disabled={selected} className = "mt-3 mb-5" variant = "success" type = "submit">Confirm your Appointment</Button>
            <p class="text-danger">{appDateMsg}</p>
          </Form>
          </div>
          </>
          :
          <>
          <div className = "container bg-dark mt-5  pt-1 text-white"
            style = {{"width": "30%", "text-align": "center", "borderRadius": "3%"}}>
            <h5 className = "mt-5">Your appointment is rescheduled successfully</h5>
            <Link to="/userhomse" />
              <Button variant="info" className = "my-3"
                onClick = {handleClickToHome}
                style = {{"width": "50%"}} className = "mt-5 mb-3 text-white">
                <BsFillArrowLeftSquareFill style={{"margin":"10%"}}></BsFillArrowLeftSquareFill>
                  Go Back
              </Button>
            <Link/>
           
          </div>
        </>
      }
        
      </>
    )
  }
    return (
      <>
        <Navigation/>
        <Container style ={{"display":"flex","flex-wrap": "wrap"}}>
        {myBookings.length > 0 ? myBookings.map((myBooking) => {
          console.log("mybook")
          return (
            <>
              <div className = "p-3 mt-5 bg-dark text-white"
              style = {{"margin": "1%","width": "40%", "borderRadius": "2.5%"}}>
                <h1>Appointment Date:</h1>
                <h2>{myBooking.appointmentDate}</h2>
                <h3 className = "mb-5">Slot: {myBooking.slot}</h3>
                <h4>Booking id: {myBooking.id}</h4>
                <h4>User id: {myBooking.userId}</h4>
                <h4>Coach id: {myBooking.coachId}</h4>
                <Button 
                  variant = "info" 
                  className = "mt-5 mb-3 text-white"
                  onClick = {() => {
                    setEditBooking(myBooking);
                    setIsRescheduling(true);
                    }}>
                  Reschedule your Appointment
                </Button>
                <Button 
                  variant = "danger" 
                  className = "mb-3" 
                  data-toggle="modal" 
                  onClick = {() => {
                    setMyBookingId(myBooking.id)
                    setShowCancelModal(true)
                  }}>
                  Cancel your Appointment
                </Button>
              </div>
              <Modal centered show={showCancelModal} onHide={() => setShowCancelModal(false)}>
                <Modal.Body closeButton>Are you sure you need to cancel the appointment?</Modal.Body>
                <Modal.Footer>
                  <Button onClick = {() => handleCancelAppointment(myBookingId)} className = "mx-auto" style = {{"width": "40%"}} variant="success">
                    Yes
                  </Button>
                  <Button className = "mx-auto" style = {{"width": "40%"}} variant="danger" onClick={() => setShowCancelModal(false)}>
                    No
                  </Button>
                </Modal.Footer>
              </Modal>
            
            </>
          )
        }): 
        <div className = "container p-3 mt-5"
        style = {{"width": "25%", "textAlign": "center"}}>
        <img src = "assets\Images\Notepad_icon.svg.png"/><br/>
        <h1>No planned appointments yet</h1>
      </div>}
      </Container>
      <Container style={{"width":"90%", "textAlign": "center"}}>
      <Link to="/userhome">
      <Button variant = "info" style={{"width":"20%", "textAlign": "center"}} className = "mt-5 mb-3 text-white">
        <BsFillArrowLeftSquareFill style={{"margin":"10%"}}></BsFillArrowLeftSquareFill>
        Go back
        </Button>
      </Link>
      </Container>
      </>
    )
};



export default UserAppointments;